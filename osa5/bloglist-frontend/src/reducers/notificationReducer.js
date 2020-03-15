import React from 'react'
const notificationReducer = (state = null, action ) => {
  const styleR = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: 'red',
    background: 'lightgrey'
  }
  const styleG = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: 'green',
    background: 'lightgrey'
  }
  switch (action.type) {
  case 'ERROR':
    return <div style={styleR}>
      {action.data}
    </div>
  case 'SUCCESS':
    return <div style={styleG}>
      {action.data}
    </div>
  case 'ZERO':
    return null
  default:
    return state
  }
}
export const zero = () => {
  return {
    type: 'ZERO'
  }
}
export const setNotification = (message, type) => {
  return {
    type: type,
    data: message
  }
}

export default notificationReducer