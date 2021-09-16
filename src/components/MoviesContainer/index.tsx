import { ReactNode, useEffect, useRef, useState } from 'react'

import common from '../../styles/common.module.scss'

interface IMoviesContainerProps {
  children: ReactNode
}

export function MoviesContainer ({ children }: IMoviesContainerProps) {
  const refMoviesCarousel = useRef(null)
  const [containerMarginTop, setContainerMarginTop] = useState('0px')

  function handleContainerMarginTop () {
    setTimeout(() => {
      const $elem = refMoviesCarousel.current.querySelector('[data-testid="movies-carousel"]') || refMoviesCarousel.current.querySelector('[data-testid="movies-carousel-card"]')
      const containerheight = $elem?.clientHeight
      setContainerMarginTop(`-${containerheight}px`)
    }, 500)
  }

  useEffect(() => {
    handleContainerMarginTop()
    window.addEventListener('resize', handleContainerMarginTop)
    return () => window.removeEventListener('resize', handleContainerMarginTop)
  }, [])

  return (
    <div
      className={common.moviesContainer}
      style={{ marginTop: containerMarginTop }}
      data-testid="movies-container"
      ref={refMoviesCarousel}
    >
      {children}
    </div>
  )
}
