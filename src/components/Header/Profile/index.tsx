import Image from 'next/image'

import styles from './styles.module.scss'

export function Profile () {
  return (
    <div className={styles.profile}>
      <Image src="/assets/img/avatar.png" alt="Avatar" width="32" height="32" />
    </div>
  )
}
