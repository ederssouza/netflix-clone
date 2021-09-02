import { ArrowProps } from 'react-multi-carousel'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

interface IMoviesCarouselArrowProps extends ArrowProps {
  direction: 'left' | 'right'
}

export function MoviesCarouselArrow ({ direction, onClick, ...rest }: IMoviesCarouselArrowProps) {
  if (direction === 'left') {
    return (
      <div
        className="react-multi-carousel-arrow react-multi-carousel-arrow-left"
        onClick={onClick}
      >
        <MdKeyboardArrowLeft />
      </div>
    )
  }

  return (
    <div
      className="react-multi-carousel-arrow react-multi-carousel-arrow-right"
      onClick={onClick}
    >
      <MdKeyboardArrowRight />
    </div>
  )
}
