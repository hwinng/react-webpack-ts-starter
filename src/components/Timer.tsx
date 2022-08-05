import React from "react"

export const Timer = () => {
  const [localeTime, setLocaleTime] = React.useState(
    new Date().toLocaleTimeString()
  )

  React.useEffect(() => {
    const timer = setInterval(() => {
      tick()
    }, 1000)

    return () => clearInterval(timer)
  })

  const tick = () => {
    setLocaleTime(new Date().toLocaleTimeString())
  }

  return <span>{localeTime}</span>
}
