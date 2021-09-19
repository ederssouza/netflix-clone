import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from '../styles.module.scss'

interface IMenuItemProps {
  href: string
  title: string
}

export interface IMenuProps {
  items: IMenuItemProps[]
}

export function MenuItems ({ items }: IMenuProps) {
  const [currentAsPath, setCurrentAsPath] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setCurrentAsPath(router?.asPath)
  }, [router])

  return (
    <ul className={styles.menuItems}>
      {items.map(link => {
        const className = currentAsPath === link.href
          ? styles.menuItemsActiveItem
          : null

        return (
          <li
            key={link.title}
            className={link.href === currentAsPath ? className : null}
          >
            <Link href={link.href} passHref>
              <a title={link.title}>{link.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
