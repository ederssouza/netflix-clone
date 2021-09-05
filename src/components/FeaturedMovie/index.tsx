import { IoMdPlay, IoMdInformationCircleOutline } from 'react-icons/io'
import { Button } from '../Button'

import styles from './styles.module.scss'

interface IMovie {
  id: number
  background: string
  title: string
  description: string
}

interface IFeaturedMovieProps {
  movie: IMovie
}

export function FeaturedMovie ({ movie }: IFeaturedMovieProps) {
  const { background, title, description } = movie

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url("${background}")` }}
      data-testid="featured-movie"
    >
      <div className={styles.info}>
        <div className={styles.infoText}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.text}>{description}</p>
        </div>

        <div className={styles.infoActions}>
          <Button color="primary" icon={<IoMdPlay />}>
            Assistir
          </Button>

          <Button color="secondary" icon={<IoMdInformationCircleOutline />}>
            Mais informações
          </Button>
        </div>
      </div>
    </div>
  )
}
