import { IoMdPlay } from 'react-icons/io'

import { IMedia } from '../../@types'
import { Button } from '../Button'
import { ProgressChart } from '../ProgressChart'
import styles from './styles.module.scss'

interface IBannerProps {
  media: Omit<IMedia, 'overview'>
}

export function Banner ({ media }: IBannerProps) {
  return (
    <section
      className={styles.banner}
      style={{ backgroundImage: `url(${media.backdrop_path.original})` }}
    >
      <div className={styles.bannerInfo}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerInfoLeft}>
            <ProgressChart value={media.vote_average * 10} />
          </div>

          <div className={styles.bannerInfoRight}>
            <div>
              <h1 className={styles.bannerTitle}>
                {media.title} ({media.release_date})
              </h1>

              <span>
                {media?.original_language && `(${media.original_language}) • `}
                {media?.genres?.length > 0 && `${media?.genres?.map(genre => genre.name).join(', ')} • `}
                {media?.runtime && media.runtime}
              </span>
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
