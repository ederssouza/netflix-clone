import { ReactNode, ReactElement, forwardRef, ForwardRefRenderFunction } from 'react'
import styles from './styles.module.scss'

interface IButton {
  color?: 'primary' | 'secondary'
  icon?: ReactElement
  children: ReactNode
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, IButton> = ({
  color = 'primary',
  icon,
  children,
  ...rest
}: IButton) => {
  function renderButtonColorStyle (color: string) {
    const colors = {
      primary: 'btnPrimary',
      secondary: 'btnSecondary'
    }

    const CSSClass = colors[color]
    return styles[CSSClass]
  }

  return (
    <button className={`${styles.btn} ${renderButtonColorStyle(color)}`} {...rest}>
      {icon}
      {children}
    </button>
  )
}

export const Button = forwardRef(ButtonBase)
