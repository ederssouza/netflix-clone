import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { ArrowProps } from 'react-multi-carousel'

interface IMoviesCarouselArrowProps extends ArrowProps {
  direction: 'left' | 'right'
  firstLoad?: boolean
}

export function MoviesCarouselArrow ({ direction, firstLoad = false, onClick, ...rest }: IMoviesCarouselArrowProps) {
  if (direction === 'left') {
    return (
      <div
        className={`carouselArrow carouselArrowLeft ${firstLoad ? 'carouselArrow-hidden' : ''}`}
        data-testid="movies-carousel-arrow"
        onClick={() => !firstLoad && onClick()}
      >
        {!firstLoad && <MdKeyboardArrowLeft />}
      </div>
    )
  }

  return (
    <div
      className="carouselArrow carouselArrowRight"
      data-testid="movies-carousel-arrow"
      onClick={() => onClick()}
    >
      <MdKeyboardArrowRight />
    </div>
  )
}
