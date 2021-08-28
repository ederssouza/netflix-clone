import { IoMdPlay, IoMdInformationCircleOutline } from 'react-icons/io'
import { Button } from '../Button'

import styles from './styles.module.scss'

export function FeaturedMovie () {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: 'url("http://4.bp.blogspot.com/-5tiOMxe6rSs/UkofuptCcVI/AAAAAAAAHXk/TkY1r2cYM6M/s1600/breaking-bad.jpg")'
      }}
    >
      <div className={styles.info}>
        <div className={styles.infoText}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aliquam quos deleniti fugit fuga neque quisquam accusamus dignissimos.</p>
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
