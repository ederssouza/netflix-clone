import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { Menu } from './Menu'

import styles from './styles.module.scss'

export function Header () {
  const [className, setClassName] = useState(styles.container)
  const menuItems = [
    {
      href: '/',
      title: 'Início'
    },
    {
      href: '/genre/1',
      title: 'Séries'
    },
    {
      href: '/genre/2',
      title: 'Filmes'
    },
    {
      href: '/genre/3',
      title: 'Bombando'
    },
    {
      href: '/genre/4',
      title: 'Minha lista'
    },
    {
      href: '/genre/5',
      title: 'Assista de novo'
    }
  ]

  useEffect(() => {
    function handleScroll () {
      const pageYOffset = window.pageYOffset
      const classNameValue = pageYOffset > 0
        ? `${styles.container} ${styles.containerFillBackground}`
        : styles.container

      setClassName(classNameValue)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={className} data-testid="main-header">
      <Logo />
      <Menu items={menuItems} />
    </header>
  )
}
