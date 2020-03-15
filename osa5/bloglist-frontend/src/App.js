import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Togglable from './components/Togglable'
import './App.css'
import { addNewBlog, addAll, likeABlog, deleteABlog } from './reducers/blogReducer'
import { setNotification, zero } from './reducers/notificationReducer'
import { logInUser, logOutUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { setUsers } from './reducers/usersReducer'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(logInUser(user))
    }
    blogService.getAll().then(blogs =>
      dispatch(addAll(blogs))
    )
    userService.getAll().then(usrs =>
      dispatch(setUsers(usrs))
    )
  }, [])

  const notifyWith = (message, type='SUCCESS') => {
    dispatch(setNotification(message,type))
    setTimeout(() => {
      dispatch(zero())
    }, 5000)
  }

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      dispatch(logInUser(user))
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (exception) {
      console.log('Wrong credentials')

      notifyWith('wrong username/password', 'ERROR')
    }
  }

  const logOut = async (event) => {
    event.preventDefault()
    dispatch(logOutUser())
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async (blogObject) => {
    console.log(blogObject)
    const response = await blogService.create(blogObject)
    blogFormRef.current.toggle()
    console.log(response)



    notifyWith(`a new blog '${blogObject.title}' by ${blogObject.author} added!`)
    dispatch(addNewBlog(response))
  }

  const updateLikesOf = async (blog) => {
    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const response = await blogService.update(blog.id, changedBlog)
    response.user = blog.user
    dispatch(likeABlog(blog.id))
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteOne(blog.id)
      dispatch(deleteABlog(blog.id))
    }
  }
  const commentAdd = async (id, text) => {
    const blog = await blogService.findOne(id)
    const comment = { id: blog.comments.id+1, comment: text }
    await blogService.addComment(id, comment)
  }

  const addingForm = () => {
    return(
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            addBlog={addBlog}
          />
        </Togglable>
        <p></p>
      </div>
    )
  }
  const loginForm = () => {
    return(
      <div>
        {notification}
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
        />
      </div>
    )
  }
  const blogList = () => {
    return (
      <div id='bloglist'>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id}
            blog={blog}
            addLike={() => updateLikesOf(blog)}
            deleteBlog={() => deleteBlog(blog)}
            loggedInUser= {user.username}/>
        )}
      </div>
    )
  }
  const padding = {
    padding: 5
  }
  const userList = () => {
    return (
      <div>
        <h2>Users</h2>
        {users.map(u =>
          <User key={u.id} user={u} />)}
      </div>
    )
  }

  return (
    <Router>
      {user === null ? null :
        <div>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} to="/">blogs</Link>
        </div>
      }
      <div>
        <h2>Blogs</h2>
        {user === null ? null : <div>{user.name} logged in.<button onClick={logOut} id='logout'>logout</button></div>}

        <p></p>
        {notification}
      </div>
      <Switch>
        <Route path="/users/:id">
          <UserPage users={users} />
        </Route>
        <Route path="/blogs/:id">
          <BlogPage blogs= {blogs} addComment= {commentAdd}/>
        </Route>
        <Route path="/users">
          {user !== null && userList()}
        </Route>
        <Route path="/">
          <div>
            {user !== null && addingForm()}
            {user !== null && blogList()}
          </div>
        </Route>
      </Switch>
      {user === null && loginForm()}
    </Router>
  )
}

export default App