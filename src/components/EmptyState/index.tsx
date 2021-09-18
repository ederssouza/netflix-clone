import { ReactNode } from 'react'

import styles from './styles.module.scss'

interface IEmptyStateProps {
  title: string
  text?: string
  children?: ReactNode
}

export function EmptyState ({ title, text, children }: IEmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <h1 className={styles.emptyStateTitle}>{title}</h1>
      {text && <p className={styles.emptyStateText}>{text}</p>}
      {children && <div>{children}</div>}
    </div>
  )
}
