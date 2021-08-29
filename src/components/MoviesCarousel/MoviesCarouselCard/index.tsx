import { memo } from 'react'

import styles from './styles.module.scss'

interface IMoviesCarouselCardProps {
  movie: {
    id: string | number
    title: string
    image: string
  }
}

function MoviesCarouselCardComponent ({ movie }: IMoviesCarouselCardProps) {
  return (
    <div className={styles.listItem} data-testid="movie-card">
      <a href="#" title={movie.title}>
        <div>
          <img src={movie.image} alt={movie.title} />
        </div>
      </a>
    </div>
  )
}

export const MoviesCarouselCard = memo(MoviesCarouselCardComponent, (oldProps, newProps) => {
  return Object.is(oldProps.movie, newProps.movie)
})
