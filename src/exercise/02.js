// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  // To transform the children JSX that your component receives as the children prop
  return React.Children.map(children, child => {
    // React dosen't allow developers to modify chilren's props directly
    // it is advisable to create a new copy and set its props
    // React.cloneElement(child, {on, toggle}),

    // React doesn't want developers to pass any props to non-functions components
    return typeof child.type === 'string'
      ? child
      : React.cloneElement(child, {on, toggle})
  })
}

// 🐨 Flesh out each of these components

// Warning: Normally a function component just take an argument called Props
// be careful to destructure it correctly
const ToggleOn = ({on, children}) => (on ? children : null)
const ToggleOff = ({on, children}) => (on ? null : children)
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />
// add DOM Component into our toggle component
function App() {
  return (
    <div>
      <Toggle>
        <span>Hello</span>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
