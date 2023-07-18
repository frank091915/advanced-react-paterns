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
  // add custom hook validation
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw Error('ToggleButton must be used within Toggle')
  }
  return context
}

function Toggle({children}) {
  return <ToggleProvider>{children}</ToggleProvider>
}

function ToggleOn({children}) {
  const {on} = UseToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = UseToggle()
  return on ? null : children
}

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
