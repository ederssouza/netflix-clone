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
  const [scrollPosition, setScrollPosition] = useState('start')

  function getMaxWidthScrollByClick () {
    // ~~ (double-tilde) => force convert NaN to 0
    return ~~(movieListWidth / imageWidth)
  }

  function handleScroll ({ orientation }: IHandleScrollParams) {
    const $movieList = refContainer?.current?.querySelector(`.${styles.list}`)
    const scrollLeft = getMaxWidthScrollByClick() * imageWidth

    if ($movieList && orientation === 'left') {
      $movieList.scrollLeft -= scrollLeft
    }

    if ($movieList && orientation === 'right') {
      $movieList.scrollLeft += scrollLeft
    }
  }

  function getScrollPosition (e) {
    const scrollLeft = e.target.scrollLeft
    const listWidth = e.target.scrollWidth - movieListWidth

    if (scrollLeft === 0) {
      setScrollPosition('start')
      return
    }

    if (scrollLeft >= listWidth) {
      setScrollPosition('end')
      return
    }

    setScrollPosition('middle')
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
          visible={scrollPosition !== 'start'}
          handleClick={() => handleScroll({ orientation: 'left' })}
        />

        <div
          className={styles.list}
          data-testid="movie-list"
          onScroll={getScrollPosition}
        >
          {movies.map(movie => <MoviesCarouselCard key={movie.id} movie={movie} />)}
        </div>

        <MoviesCarouselArrow
          orientation="right"
          visible={scrollPosition !== 'end'}
          handleClick={() => handleScroll({ orientation: 'right' })}
        />
      </div>
    </div>
  )
}
