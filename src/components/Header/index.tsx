import Image from 'next/image'

import styles from './styles.module.scss'

export function Header () {
  return (
    <header className={styles.container}>
      <Image
        src="/assets/img/netflix.png"
        width="92.5px"
        height="31px"
        alt="Netflix logo"
      />
    </header>
  )
}
