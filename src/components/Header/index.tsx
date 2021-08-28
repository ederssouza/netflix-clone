import Image from 'next/image'
import { useState, useEffect } from 'react'

import styles from './styles.module.scss'

export function Header () {
  const [fixedClass, setFixedClass] = useState(styles.container)

  useEffect(() => {
    function handleScroll () {
      const pageYOffset = window.pageYOffset
      const fixedClassValue = pageYOffset > 0 ? `${styles.container} ${styles.containerFillBackground}` : styles.container
      setFixedClass(fixedClassValue)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={fixedClass}>
      <Image
        src="/assets/img/netflix.png"
        width="92.5px"
        height="31px"
        alt="Netflix logo"
      />
    </header>
  )
}
