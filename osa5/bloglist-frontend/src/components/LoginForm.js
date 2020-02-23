import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }
  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input type="text"
            id='username'
            value={username}
            name="Username"
            onChange={handleUsernameChange} />
        </div>
        <div>
          Password:
          <input type="password"
            id='password'
            value={password}
            name="Password"
            onChange={handlePasswordChange} />
        </div>
        <button type="submit" id='login'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm