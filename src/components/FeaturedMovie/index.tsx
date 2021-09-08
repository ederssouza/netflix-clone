import Link from 'next/link'
import { IoMdPlay, IoMdInformationCircleOutline } from 'react-icons/io'

import { Button } from '../Button'
import styles from './styles.module.scss'

interface IMovie {
  id: number
  image: string
  title: string
  description: string
}

interface IFeaturedMovieProps {
  category?: string
  movie: IMovie
}

export function FeaturedMovie ({ category, movie }: IFeaturedMovieProps) {
  const { id, image, title, description } = movie

  return (
    <div
      className={styles.featuredMovie}
      style={{ backgroundImage: `url("${image}")` }}
      data-testid="featured-movie"
    >
      <div className={styles.featuredMovieInfo}>
        {category && <h1 className={styles.featuredMovieCategory}>{category}</h1>}

        <div className={styles.featuredMovieInfoText}>
          <h1 className={styles.featuredMovieTitle}>{title}</h1>
          <p className={styles.featuredMovieText}>{description}</p>
        </div>

        <div className={styles.featuredMovieInfoActions}>
          <Button color="primary" icon={<IoMdPlay />}>
            Trailer
          </Button>

          <Link href={`/details/${id}`} passHref>
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
