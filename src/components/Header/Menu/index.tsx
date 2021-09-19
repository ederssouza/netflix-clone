import { useEffect, useState } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

import { MenuItems, IMenuProps } from './MenuItems'
import styles from './styles.module.scss'

export function Menu ({ items }: IMenuProps) {
  const [menuMobileClassName, setMenuMobileClassName] = useState(styles.menuMobile)

  function handleOpenMobileMenu (e: Event & { target: HTMLElement}) {
    const elemClasslist = e?.target?.classList
    const isMenuMobile = elemClasslist?.contains(styles.menuMobile)
    const isOpenMenuMobile = elemClasslist?.contains(styles.menuMobileOpen)
    const className = isOpenMenuMobile || !isMenuMobile
      ? styles.menuMobile
      : `${styles.menuMobile} ${styles.menuMobileOpen}`

    setMenuMobileClassName(className)
  }

  useEffect(() => {
    document.addEventListener('click', handleOpenMobileMenu)
    return () => document.removeEventListener('click', handleOpenMobileMenu)
  }, [])

  return (
    <nav className={styles.menu} data-testid="menu">
      <button className={menuMobileClassName} title="Navegar">
        Navegar <IoMdArrowDropdown />
        <MenuItems items={items} />
      </button>

      <MenuItems items={items} />
    </nav>
  )
}
