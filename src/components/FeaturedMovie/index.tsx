import Link from 'next/link'
import { IoMdPlay, IoMdInformationCircleOutline } from 'react-icons/io'

import { IFeaturedMedia } from '../../@types'
import { Button } from '../Button'
import styles from './styles.module.scss'

interface IFeaturedMovieProps {
  genre?: string
  movie: IFeaturedMedia
}

export function FeaturedMovie ({ genre, movie }: IFeaturedMovieProps) {
  return (
    <div
      className={styles.featuredMovie}
      style={{ backgroundImage: `url("${movie?.backdrop_path?.original}")` }}
      data-testid="featured-movie"
    >
      <div className={styles.featuredMovieInfo}>
        {genre && <h1 className={styles.featuredMovieGenre}>{genre}</h1>}

        <div className={styles.featuredMovieInfoText}>
          <h1 className={styles.featuredMovieTitle}>{movie.title}</h1>
          <p className={styles.featuredMovieText}>{movie.overview}</p>
        </div>

        <div className={styles.featuredMovieInfoActions}>
          <Button color="primary" icon={<IoMdPlay />}>
            Trailer
          </Button>

          <Link href={`/details/${movie.media_type}/${movie.id}`} passHref>
            <Button
              color="secondary"
              icon={<IoMdInformationCircleOutline />}
              data-testid="more-details-button"
            >
              Mais informações
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
