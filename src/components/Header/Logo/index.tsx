import Link from 'next/link'

import styles from './styles.module.scss'

export function Logo () {
  return (
    <Link href="/" passHref>
      <a
        className={styles.logo}
        title="Início"
        data-testid="logo"
      >
        <img src="/assets/img/netflix.png" alt="Netflix logo" />
      </a>
    </Link>
  )
}
