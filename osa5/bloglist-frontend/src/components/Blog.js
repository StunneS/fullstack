import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Link,
} from 'react-router-dom'

const Blog = ({ blog, addLike, deleteBlog, loggedInUser }) => {
  const [show, setShow] = useState(false)

  Blog.propTypes = {
    loggedInUser: PropTypes.string.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired
  }
  const toggle = () => {
    setShow(!show)
  }
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 4
  }
  if(show) {
    return(
      <div style={blogStyle} className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author} </Link> <button onClick={toggle}>hide</button><br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={addLike} >like</button> <br/>
        {blog.user.name} <br/>
        {loggedInUser === blog.user.username && <button onClick={deleteBlog}>remove</button>}
      </div>
    )
  }
  return(
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author} </Link>
      <button onClick={toggle}>view</button>
    </div>
  )
}

export default Blog