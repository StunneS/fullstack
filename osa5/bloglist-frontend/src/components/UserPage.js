import React from 'react'
import {
  useParams
} from 'react-router-dom'

const UserPage = ({ users }) => {
  const id = useParams().id
  const user = users.find(a => a.id === id)
  if(!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(a =>
          <li key={a.id}>{a.title}</li>
        )}
      </ul>
    </div>
  )
}


export default UserPage

