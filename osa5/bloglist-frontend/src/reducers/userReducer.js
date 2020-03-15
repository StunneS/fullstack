const userReducer = (state = null, action ) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}
export const logInUser = (name) => {
  return {
    type: 'LOGIN',
    data: name
  }
}
export const logOutUser = () => {
  return {
    type: 'LOGOUT'
  }
}
export default userReducer