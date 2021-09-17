import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { TiInfoLarge } from 'react-icons/ti'

import { IMovie } from '../../../@types'
import styles from './styles.module.scss'

interface IMovieProps {
  movie: IMovie
}

export function MediaCarouselCard ({ movie }: IMovieProps) {
  return (
    <div
      className={styles.mediaCarouselCard}
      data-testid="carousel-card"
    >
      <img src={movie.backdrop_path.w300} alt={movie.title} />

      <div className={styles.mediaCarouselCardDetails}>
        <h2 className={styles.mediaCarouselCardTitle}>{movie.title}</h2>

        <ul className={styles.mediaCarouselCardActions}>
          <li className={styles.mediaCarouselCardActionActiveItem}>
            <a href="#" title=""><IoMdPlay /></a>
          </li>
          <li
            className={styles.mediaCarouselCardActionItem}
            data-testid="carousel-more-details"
          >
            <Link href={`/details/${movie.media_type}/${movie.id}`} passHref>
              <a title="Ver mais detalhes"><TiInfoLarge /></a>
            </Link>
          </li>
        </ul>

        <span className={`${styles.mediaCarouselCardRelevant} ${styles.mediaCarouselCardRelevantGreen}`}>
          {movie?.vote_average ? (movie.vote_average * 10) : 0}% relevante
        </span>
      </div>
    </div>
  )
}
