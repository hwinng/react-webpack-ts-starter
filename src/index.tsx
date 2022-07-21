/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

// to fix react-refresh/babel problem
;(self as any).$RefreshReg$ = () => {}
;(self as any).$RefreshSig$ = () => () => {}

const container = document.getElementById("root")
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<App />)
