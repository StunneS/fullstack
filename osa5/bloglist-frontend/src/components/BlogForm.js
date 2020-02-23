import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
  }
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const changeAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const changeTitle = (event) => {
    setTitle(event.target.value)
  }
  const changeUrl = (event) => {
    setUrl(event.target.value)
  }

  const makeNewBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div className="formDiv">
      <h2>create a new blog:</h2>
      <form onSubmit={makeNewBlog}>
        <div>
          Title:
          <input type="text"
            id='title'
            value={title}
            name="Title"
            onChange={changeTitle} />
        </div>
        <div>
          Author:
          <input type="text"
            id='author'
            value={author}
            name="Author"
            onChange={changeAuthor} />
        </div>
        <div>
          Url:
          <input type="text"
            id='url'
            value={url}
            name="Url"
            onChange={changeUrl} />
        </div>
        <button type="submit" id='subblog'>Create</button>
      </form>
    </div>
  )
}
export default BlogForm