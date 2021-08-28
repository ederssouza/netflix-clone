import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import styles from './styles.module.scss'

interface IArrowProps {
  orientation: 'left' | 'right'
  visible?: boolean
  handleClick: () => void
}

export function MoviesCarouselArrow ({ orientation, visible = true, handleClick }: IArrowProps) {
  return (
    <button
      className={`${orientation === 'left' ? styles.prevButton : styles.nextButton}`}
      data-testid={`${orientation === 'left' ? 'button-prev-movies' : 'button-next-movies'}`}
      style={{ display: visible ? 'flex' : 'none' }}
      onClick={handleClick}
    >
      {orientation === 'left' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
    </button>
  )
}
