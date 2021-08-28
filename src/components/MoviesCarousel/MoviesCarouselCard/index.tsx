import Image from 'next/image'
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
        <Image
          src={movie.image}
          alt={movie.title}
          width="251"
          height="141.31"
        />
      </a>
    </div>
  )
}

export const MoviesCarouselCard = memo(MoviesCarouselCardComponent, (oldProps, newProps) => {
  return Object.is(oldProps.movie, newProps.movie)
})
