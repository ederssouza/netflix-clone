import styles from './styles.module.scss'

export function FooterCopyright () {
  const currentYear = new Date().getFullYear()

  return (
    <span className={styles.footerCopyright}>
      &copy; 1997-{currentYear} Netflix, Inc.
    </span>
  )
}
