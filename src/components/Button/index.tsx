import { ReactNode, ReactElement, forwardRef, ForwardRefRenderFunction } from 'react'
import styles from './styles.module.scss'

interface IButtonProps {
  color?: 'primary' | 'secondary'
  icon?: ReactElement
  children: ReactNode
}

const ButtonBase: ForwardRefRenderFunction<HTMLInputElement, IButtonProps> = ({ color = 'primary', icon, children, ...rest }: IButtonProps, ref) => {
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
