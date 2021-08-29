import Image from 'next/image'
import { useState, useEffect } from 'react'

import styles from './styles.module.scss'

export function Header () {
  const [className, setClassName] = useState(styles.container)

  useEffect(() => {
    function handleScroll () {
      const pageYOffset = window.pageYOffset
      const fixedClassValue = pageYOffset > 0 ? `${styles.container} ${styles.containerFillBackground}` : styles.container
      setClassName(fixedClassValue)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={className} data-testid="main-header">
      <Image
        src="/assets/img/netflix.png"
        width="92.5"
        height="25"
        alt="Netflix logo"
      />
    </header>
  )
}
