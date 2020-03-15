import React from 'react'
import {
  useParams
} from 'react-router-dom'

const UserPage = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(a => a.id === id)
  if(!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}, {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a> <br/>
      {blog.likes} likes <br/>
      added by {blog.user.name} <br/>

      <h3>Comments:</h3>
      <ul>
        {blog.comments.map(c =>
          <li key={c.id}>{c.comment}</li>
        )}
      </ul>
    </div>
  )
}


export default UserPage