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
  const router = useRouter()
  const asPath = router?.asPath || null

  return (
    <nav className={styles.navbar} data-testid="menu">
      <ul className={styles.navbarMenu}>
        {items.map(link => {
          const className = asPath === link.href
            ? styles.navbarMenuItemActive
            : undefined

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
    </nav>
  )
}
