import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import styles from './styles.module.scss'

interface IArrowProps {
  orientation: 'left' | 'right'
  handleClick: () => void
}

export function MoviesCarouselArrow ({ orientation, handleClick }: IArrowProps) {
  return (
    <button
      className={`${orientation === 'left' ? styles.prevButton : styles.nextButton}`}
      data-testid={`${orientation === 'left' ? 'button-prev-movies' : 'button-next-movies'}`}
      onClick={handleClick}
    >
      {orientation === 'left' ? <IoIosArrowBack /> : <IoIosArrowForward />}
    </button>
  )
}
