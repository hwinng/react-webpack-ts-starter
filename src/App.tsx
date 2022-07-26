import React from "react"
import "./styles/index.scss"
const App = ({ title = '' }) => {
  return (
    <h1>My React and TypeScript App!! {new Date().toLocaleDateString()}</h1>
  )
}

export default App
