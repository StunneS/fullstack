var timeout
export const setNotification = (notification, secs) => {
  return async dispatch => {
    clearTimeout(timeout)
    dispatch({
      type: 'NOTIFY',
      data: notification
    })
    timeout = setTimeout(() => {
      dispatch({
        type:'CLEAR'
      })
    }, secs*1000)
  }
}
const notificationReducer = (state = '', action) => {
    switch(action.type) {
      case 'NOTIFY':
        return action.data
      case 'CLEAR':
        return ''
      default:
      return state
    }
  }
  
export default notificationReducer