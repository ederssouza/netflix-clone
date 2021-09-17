import Link from 'next/link'
import { IoMdPlay, IoMdInformationCircleOutline } from 'react-icons/io'

import { IFeaturedMedia } from '../../@types'
import { Button } from '../Button'
import styles from './styles.module.scss'

interface IFeaturedMediaProps {
  genre?: string
  movie: IFeaturedMedia
}

export function FeaturedMedia ({ genre, movie }: IFeaturedMediaProps) {
  return (
    <div
      className={styles.featuredMedia}
      style={{ backgroundImage: `url("${movie?.backdrop_path?.original}")` }}
      data-testid="featured-movie"
    >
      <div className={styles.featuredMediaInfo}>
        {genre && <h1 className={styles.featuredMediaGenre}>{genre}</h1>}

        <div className={styles.featuredMediaInfoText}>
          <h1 className={styles.featuredMediaTitle}>{movie.title}</h1>
          <p className={styles.featuredMediaText}>{movie.overview}</p>
        </div>

        <div className={styles.featuredMediaInfoActions}>
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
