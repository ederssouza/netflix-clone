import Link from 'next/link'
import { IoMdPlay, IoMdInformationCircleOutline } from 'react-icons/io'

import { IMovie } from '../../@types'
import { Button } from '../Button'
import styles from './styles.module.scss'

interface IFeaturedMovieProps {
  category?: string
  movie: IMovie
}

export function FeaturedMovie ({ category, movie }: IFeaturedMovieProps) {
  const { id, media_type, backdrop_path, title, overview } = movie

  return (
    <div
      className={styles.featuredMovie}
      style={{ backgroundImage: `url("${backdrop_path.original}")` }}
      data-testid="featured-movie"
    >
      <div className={styles.featuredMovieInfo}>
        {category && <h1 className={styles.featuredMovieCategory}>{category}</h1>}

        <div className={styles.featuredMovieInfoText}>
          <h1 className={styles.featuredMovieTitle}>{title}</h1>
          <p className={styles.featuredMovieText}>{overview}</p>
        </div>

        <div className={styles.featuredMovieInfoActions}>
          <Button color="primary" icon={<IoMdPlay />}>
            Trailer
          </Button>

          <Link href={`/details/${media_type}/${id}`} passHref>
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
