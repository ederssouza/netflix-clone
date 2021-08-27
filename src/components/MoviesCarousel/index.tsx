import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

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
    const container = refContainer.current
    const movieList = container.querySelector(`.${styles.list}`)
    const imageWidth = container.querySelector(`.${styles.listItem}`).offsetWidth

    setMovieListWidth(movieList.offsetWidth)
    setImageWidth(imageWidth)
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div
        className={styles.listContainer}
        ref={refContainer}
      >
        <button
          className={styles.prevButton}
          data-testid="button-prev-movies"
          onClick={() => handleScroll({ orientation: 'left' })}
        >
          <IoIosArrowBack />
        </button>

        <div
          className={styles.list}
          data-testid="movie-list"
        >
          {movies.map(movie => (
            <div key={movie.id} className={styles.listItem}>
              <a href="#" title={movie.title}>
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width="251"
                  height="141.31"
                  data-testid="movie-img"
                />
              </a>
            </div>
          ))}
        </div>

        <button
          className={styles.nextButton}
          data-testid="button-next-movies"
          onClick={() => handleScroll({ orientation: 'right' })}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  )
}
