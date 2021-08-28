import { useState, useEffect, useRef } from 'react'
import { MoviesCarouselArrow } from './MoviesCarouselArrow'
import { MoviesCarouselCard } from './MoviesCarouselCard'

import styles from './styles.module.scss'

interface IMoviesCarousel {
  title: string
  movies: any[]
}

interface IHandleScrollParams {
  orientation: 'left' | 'right'
}

export function MoviesCarousel ({ title, movies }: IMoviesCarousel) {
  const refContainer = useRef(null)
  const [movieListWidth, setMovieListWidth] = useState(0)
  const [imageWidth, setImageWidth] = useState(0)

  function getMaxWidthScrollByClick () {
    return movieListWidth && imageWidth
      ? Math.floor(movieListWidth / imageWidth)
      : 0
  }

  function handleScroll ({ orientation }: IHandleScrollParams): void {
    const $movieList = refContainer?.current?.querySelector(`.${styles.list}`)
    const scrollLeft = getMaxWidthScrollByClick() * imageWidth

    if ($movieList && orientation === 'left') {
      $movieList.scrollLeft -= scrollLeft
    }

    if ($movieList && orientation === 'right') {
      $movieList.scrollLeft += scrollLeft
    }
  }

  useEffect(() => {
    function handleResize () {
      const container = refContainer.current
      const movieList = container.querySelector(`.${styles.list}`)
      const imageWidth = container.querySelector(`.${styles.list} > div`).offsetWidth

      setMovieListWidth(movieList.offsetWidth)
      setImageWidth(imageWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div
        className={styles.listContainer}
        ref={refContainer}
      >
        <MoviesCarouselArrow
          orientation="left"
          handleClick={() => handleScroll({ orientation: 'left' })}
        />

        <div className={styles.list} data-testid="movie-list">
          {movies.map(movie => <MoviesCarouselCard key={movie.id} movie={movie} />)}
        </div>

        <MoviesCarouselArrow
          orientation="right"
          handleClick={() => handleScroll({ orientation: 'right' })}
        />
      </div>
    </div>
  )
}
