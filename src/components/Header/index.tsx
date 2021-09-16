import { useState, useEffect } from 'react'

import { Logo } from './Logo'
import { Menu } from './Menu'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'
import styles from './styles.module.scss'

export function Header () {
  const [className, setClassName] = useState(styles.header)
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
    }
  ]

  useEffect(() => {
    function handleHeaderBackground () {
      const pageYOffset = window.pageYOffset
      const classNameValue = pageYOffset > 0
        ? `${styles.header} ${styles.headerFillBackground}`
        : styles.header

      setClassName(classNameValue)
    }

    window.addEventListener('scroll', handleHeaderBackground)

    return () => window.removeEventListener('scroll', handleHeaderBackground)
  }, [])

  return (
    <header className={className} data-testid="main-header">
      <Logo />
      <Menu items={menuItems} />
      <SearchBox />
      <Profile />
    </header>
  )
}
