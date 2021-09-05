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
      className={styles.container}
      data-testid="movies-carousel-card"
    >
      <img src={movie.image} alt={movie.title} />

      <div className={styles.containerDetails}>
        <ul className={styles.actions}>
          <li className={styles.actionItemActive}><a href="#" title=""><IoMdPlay /></a></li>
          <li className={styles.actionItem}><a href="#" title=""><TiInfoLarge /></a></li>
        </ul>

        <span className={`${styles.relevant} ${styles.relevantGreen}`}>
          87% relevante
        </span>

        <ul className={styles.genres}>
          <li>Drama</li>
          <li>Terror</li>
          <li>Suspense</li>
        </ul>
      </div>
    </div>
  )
}
