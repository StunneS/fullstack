import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')


  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (exception) {
      console.log('Wrong credentials')
      setError('wrong username or password')
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const logOut = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const addBlog = async (blogObject) => {
    const response = await blogService.create(blogObject)
    blogFormRef.current.toggle()
    console.log(response)
    setSuccess(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setSuccess('')
    }, 5000)
    setBlogs(blogs.concat(response))
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
    setBlogs(blogs.map(bl => bl.id !== blog.id ? bl : response))
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteOne(blog.id)
      setBlogs(blogs.filter(bl => bl.id !== blog.id))
    }
  }
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const Error = ({ message }) => {
    if (message === '') {
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  const Success = ({ message }) => {
    if (message === '') {
      return null
    }
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  const addingForm = () => {
    return(
      <div>
        <h2>Blogs</h2>
        {user.name} logged in.<button onClick={logOut} id='logout'>logout</button>
        <p></p>
        <Success message={success} />
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
        <Error message ={error} />
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

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && addingForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App