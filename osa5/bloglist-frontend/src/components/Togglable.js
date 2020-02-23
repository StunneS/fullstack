import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggle = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      toggle
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggle} id='toggle'>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggle}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable