import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { TiInfoLarge } from 'react-icons/ti'

import { IMovie } from '../../../@types'
import styles from './styles.module.scss'

interface IMovieProps {
  movie: IMovie
}

export function MoviesCarouselCard ({ movie }: IMovieProps) {
  return (
    <div
      className={styles.moviesCarouselCard}
      data-testid="movies-carousel-card"
    >
      <img src={movie.backdrop_path.w300} alt={movie.title} />

      <div className={styles.moviesCarouselCardDetails}>
        <h2 className={styles.moviesCarouselCardTitle}>{movie.title}</h2>

        <ul className={styles.moviesCarouselCardActions}>
          <li className={styles.moviesCarouselCardActionActiveItem}>
            <a href="#" title=""><IoMdPlay /></a>
          </li>
          <li
            className={styles.moviesCarouselCardActionItem}
            data-testid="movies-carousel-more-details"
          >
            <Link href={`/details/${movie.media_type}/${movie.id}`} passHref>
              <a title="Ver mais detalhes"><TiInfoLarge /></a>
            </Link>
          </li>
        </ul>

        <span className={`${styles.moviesCarouselCardRelevant} ${styles.moviesCarouselCardRelevantGreen}`}>
          {movie?.vote_average ? (movie.vote_average * 10) : 0}% relevante
        </span>
      </div>
    </div>
  )
}
