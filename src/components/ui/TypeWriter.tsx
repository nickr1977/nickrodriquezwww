'use client'

import { useState, useEffect } from 'react'

interface Props {
  text: string
  speed?: number
  startDelay?: number
}

export default function TypeWriter({ text, speed = 40, startDelay = 600 }: Props) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      setDone(true)
      return
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [started, displayed, text, speed])

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-0.5 h-7 bg-indigo-600 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  )
}
