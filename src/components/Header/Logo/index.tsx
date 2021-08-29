import Link from 'next/link'
import Image from 'next/image'

import styles from './styles.module.scss'

export function Logo () {
  return (
    <Link href="/">
      <a className={styles.logo} title="Início" data-testid="logo">
        <Image
          src="/assets/img/netflix.png"
          width="92.5"
          height="25"
          alt="Netflix logo"
        />
      </a>
    </Link>
  )
}
