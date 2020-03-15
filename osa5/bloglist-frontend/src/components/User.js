import React from 'react'
import {
  Link,
} from 'react-router-dom'

const User = ({ user }) => {
  return(
    <div>
      <Link to={`/users/${user.id}`}>{user.name}</Link>, {user.blogs.length} blogs created
    </div>
  )
}

export default User