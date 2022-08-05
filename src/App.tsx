import React from "react"
import "./styles/index.scss"
import { Timer } from "./components/Timer"

const App = () => {
  return (
    <div>
      Dockerized webpack app at!! <Timer />{" "}
    </div>
  )
}

export default App
