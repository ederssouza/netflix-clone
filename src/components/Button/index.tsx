import { ReactNode, ReactElement } from 'react'
import styles from './styles.module.scss'

interface IButton {
  color: 'primary' | 'secondary'
  icon?: ReactElement
  children: ReactNode
}

export function Button ({ color, icon, children }: IButton) {
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
      {icon}
      {children}
    </button>
  )
}
