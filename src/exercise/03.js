// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://react.dev/reference/react/createContext

const ToggleContext = React.createContext()
function ToggleProvider(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(val => !val)
  const value = {on, toggle}
  return <ToggleContext.Provider value={value} {...props} />
}
function UseToggle() {
  return React.useContext(ToggleContext)
}

function Toggle({children}) {
  // allow people to render the compound components wherever they like in the render tree
  // don't forget to wrap your component with the context provider
  return <ToggleProvider>{children}</ToggleProvider>
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// 💰 `const context = React.useContext(ToggleContext)`
// 📜 https://react.dev/reference/react/useContext
function ToggleOn({children}) {
  const {on} = UseToggle()
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const {on} = UseToggle()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton(props) {
  const {on, toggle} = UseToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
