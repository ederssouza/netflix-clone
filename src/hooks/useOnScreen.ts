import { useEffect, useState } from 'react'
import type { MutableRefObject } from 'react'

export function useOnScreen (ref: MutableRefObject<Element>) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      setIsIntersecting(entries.some(entry => entry.isIntersecting))
    })

    ref?.current && intersectionObserver.observe(ref.current)
    return () => intersectionObserver.disconnect()
  })

  return { isIntersecting }
}
