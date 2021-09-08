import styles from './styles.module.scss'

interface IFooterMenuProps {
  items: string[]
}

export function FooterMenu ({ items }: IFooterMenuProps) {
  return (
    <ul className={styles.footerMenu}>
      {items.map((item, index) => (
        <li key={`item-${index + 1}`}>
          <a href="#" title={item}>{item}</a>
        </li>
      ))}
    </ul>
  )
}
