import { ReactNode, useEffect, useRef, useState } from 'react'

interface IMediaContainerProps {
  children: ReactNode
}

export function MediaContainer ({ children }: IMediaContainerProps) {
  const refMediaCarousel = useRef(null)
  const [containerMarginTop, setContainerMarginTop] = useState('0px')

  function handleContainerMarginTop () {
    setTimeout(() => {
      const $elem = refMediaCarousel?.current?.querySelector('[data-testid="carousel"]') || refMediaCarousel?.current?.querySelector('[data-testid="carousel-card"]')
      const containerheight = $elem?.clientHeight || 0
      setContainerMarginTop(`-${containerheight}px`)
    }, 800)
  }

  useEffect(() => {
    handleContainerMarginTop()
    window.addEventListener('resize', handleContainerMarginTop)
    return () => window.removeEventListener('resize', handleContainerMarginTop)
  }, [])

  return (
    <div
      style={{ marginTop: containerMarginTop }}
      ref={refMediaCarousel}
      data-testid="container"
    >
      {children}
    </div>
  )
}
