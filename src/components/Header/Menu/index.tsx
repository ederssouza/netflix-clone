import { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

import { MenuItems, IMenuProps } from './MenuItems'

import styles from './styles.module.scss'

export function Menu ({ items }: IMenuProps) {
  const [mobileMenuClassName, setMobileMenuClassName] = useState(styles.mobileNavbar)

  function handleOpenMobileMenu (e) {
    const elemClalist = e?.target?.classList
    const isMobileNavbar = elemClalist?.contains(styles.mobileNavbar)
    const isOpenMobileNavbar = elemClalist?.contains(styles.mobileNavbarOpen)
    const className = isOpenMobileNavbar || !isMobileNavbar
      ? styles.mobileNavbar
      : `${styles.mobileNavbar} ${styles.mobileNavbarOpen}`

    setMobileMenuClassName(className)
  }

  useEffect(() => {
    document.addEventListener('click', handleOpenMobileMenu)
    return () => document.removeEventListener('click', handleOpenMobileMenu)
  }, [])

  return (
    <nav className={styles.navbar} data-testid="menu">
      <button className={mobileMenuClassName} title="Navegar">
        Navegar <IoMdArrowDropdown />
        <MenuItems items={items} />
      </button>

      <MenuItems items={items} />
    </nav>
  )
}
