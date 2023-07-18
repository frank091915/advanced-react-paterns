// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {Switch} from '../switch'
function callAll(...fns) {
  return (...args) => fns.map(fn => fn?.(...args))
}
function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const getTogglerProps = ({onClick, ...props}) => ({
    'aria-pressed': on,
    onClick: callAll(toggle, onClick),
    ...props,
  })
  // provide props to support common use cases for consumers
  return {on, toggle, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch on={on} {...getTogglerProps()} />
      <hr />
      <button
        {...getTogglerProps({onClick: () => console.info('onButtonClick')})}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
