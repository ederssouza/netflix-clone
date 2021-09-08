import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { TiInfoLarge } from 'react-icons/ti'

import styles from './styles.module.scss'

export interface IMovie {
  id: number
  title: string
  image: string
}

interface IMovieProps {
  movie: IMovie
}

export function MoviesCarouselCard ({ movie }: IMovieProps) {
  return (
    <div
      className={styles.moviesCarouselCard}
      data-testid="movies-carousel-card"
    >
      <img src={movie.image} alt={movie.title} />

      <div className={styles.moviesCarouselCardDetails}>
        <ul className={styles.moviesCarouselCardActions}>
          <li className={styles.moviesCarouselCardActionActiveItem}>
            <a href="#" title=""><IoMdPlay /></a>
          </li>
          {/* moviesCarouselCardRelevant */}
          <li
            className={styles.moviesCarouselCardActionItem}
            data-testid="movies-carousel-more-details"
          >
            <Link href={`/details/${movie.id}`} passHref>
              <a title="Ver mais detalhes"><TiInfoLarge /></a>
            </Link>
          </li>
        </ul>

        <span className={`${styles.moviesCarouselCardRelevant} ${styles.moviesCarouselCardRelevantGreen}`}>
          87% relevante
        </span>

        <ul className={styles.moviesCarouselCardGenres}>
          <li>Drama</li>
          <li>Terror</li>
          <li>Suspense</li>
        </ul>
      </div>
    </div>
  )
}
