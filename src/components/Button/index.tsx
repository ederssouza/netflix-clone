import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface IButton {
  color: 'primary' | 'secondary'
  children: ReactNode
}

export function Button ({ color, children }: IButton) {
  function renderButtonColorStyle (color: string) {
    const colors = {
      primary: 'btnPrimary',
      secondary: 'btnSecondary'
    }

    const CSSClass = colors[color]
    return styles[CSSClass]
  }

  return (
    <button className={`${styles.btn} ${renderButtonColorStyle(color)}`}>
      {children}
    </button>
  )
}
