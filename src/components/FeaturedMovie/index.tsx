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
      className={styles.container}
      style={{ backgroundImage: `url("${image}")` }}
      data-testid="featured-movie"
    >
      <div className={styles.info}>
        {category && <h1 className={styles.containerTitle}>{category}</h1>}

        <div className={styles.infoText}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.text}>{description}</p>
        </div>

        <div className={styles.infoActions}>
          <Button color="primary" icon={<IoMdPlay />}>
            Assistir
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
