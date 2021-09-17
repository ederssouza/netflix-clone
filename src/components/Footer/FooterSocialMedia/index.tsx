import { ReactElement } from 'react'

import styles from './styles.module.scss'

interface ISocialMedia {
  title: string
  href: string
  icon: ReactElement
}

interface IFooterSocialMediaProps {
  items: ISocialMedia[]
}

export function FooterSocialMedia ({ items }: IFooterSocialMediaProps) {
  return (
    <ul className={styles.footerSocialMedia}>
      {items.map(item => (
        <li key={item.href}>
          <a
            href={item.href}
            title={item.title}
            target="_blank"
            rel="noreferrer"
          >
            {item.icon}
          </a>
        </li>
      ))}
    </ul>
  )
}
