import Image from 'next/image'

import styles from './styles.module.scss'

interface IMoviesCarouselCardProps {
  movie: {
    id: string | number
    title: string
    image: string
  }
}

export function MoviesCarouselCard ({ movie }: IMoviesCarouselCardProps) {
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
