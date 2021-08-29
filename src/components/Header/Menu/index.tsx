import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'

interface IMenuItemProps {
  href: string
  title: string
}

interface IMenuProps {
  items: IMenuItemProps[]
}

export function Menu ({ items }: IMenuProps) {
  const { asPath } = useRouter()

  return (
    <nav className={styles.navbar} data-testid="menu">
      <ul className={styles.navbarMenu}>
        {items.map(link => (
          <li
            key={link.title}
            className={link.href === asPath ? styles.navbarMenuItemActive : null}
          >
            <Link href={link.href}>
              <a title={link.title}>{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
