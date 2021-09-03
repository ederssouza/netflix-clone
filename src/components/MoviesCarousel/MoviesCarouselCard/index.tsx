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
    </div>
  )
}
