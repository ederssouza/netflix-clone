import { IoMdPlay } from 'react-icons/io'

import { IMovie } from '../../@types'
import { Button } from '../Button'
import { ProgressChart } from '../ProgressChart'
import styles from './styles.module.scss'

interface IBannerProps {
  movie: Omit<IMovie, 'overview'>
}

export function Banner ({ movie }: IBannerProps) {
  return (
    <section
      className={styles.banner}
      style={{ backgroundImage: `url("${movie.backdrop_path.original}")` }}
    >
      <div className={styles.bannerInfo}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerInfoLeft}>
            <ProgressChart value={movie.vote_average * 10} />
          </div>

          <div className={styles.bannerInfoRight}>
            <div>
              <h1 className={styles.bannerTitle}>
                {movie.title} ({movie.release_date})
              </h1>
              <span>({movie.original_language}) &#8226; {movie?.genres?.map(genre => genre.name).join(', ')} &#8226; {movie.runtime}</span>
            </div>

            <Button color="primary" icon={<IoMdPlay />}>
              Trailer
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
