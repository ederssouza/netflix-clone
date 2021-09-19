import { useEffect, useState } from 'react'
import type { MutableRefObject } from 'react'

export function useOnScreen (ref: MutableRefObject<Element>, timeout = 0) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      setTimeout(() => {
        setIsIntersecting(entries.some(entry => entry.isIntersecting))
      }, timeout)
    })

    ref?.current && intersectionObserver.observe(ref.current)
    return () => intersectionObserver.disconnect()
  })

  return { isIntersecting }
}
