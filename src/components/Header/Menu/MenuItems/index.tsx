import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles.module.scss'

interface IMenuItemProps {
  href: string
  title: string
}

export interface IMenuProps {
  items: IMenuItemProps[]
}

export function MenuItems ({ items }: IMenuProps) {
  const router = useRouter()
  const asPath = router?.asPath || null

  return (
    <ul className={styles.menuItems}>
      {items.map(link => {
        const className = asPath === link.href
          ? styles.menuItemsActiveItem
          : null

        return (
          <li
            key={link.title}
            className={link.href === asPath ? className : null}
          >
            <Link href={link.href}>
              <a title={link.title}>{link.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
