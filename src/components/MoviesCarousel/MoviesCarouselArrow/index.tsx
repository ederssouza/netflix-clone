import { ArrowProps } from 'react-multi-carousel'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

interface IMoviesCarouselArrowProps extends ArrowProps {
  direction: 'left' | 'right'
  firstLoad?: boolean
}

export function MoviesCarouselArrow ({ direction, firstLoad = false, onClick, ...rest }: IMoviesCarouselArrowProps) {
  if (direction === 'left') {
    return (
      <div
        className={`react-multi-carousel-arrow react-multi-carousel-arrow-left ${firstLoad ? 'react-multi-carousel-arrow-hidden' : ''}`}
        data-testid="movies-carousel-arrow"
        onClick={() => !firstLoad && onClick()}
      >
        {!firstLoad && <MdKeyboardArrowLeft />}
      </div>
    )
  }

  return (
    <div
      className="react-multi-carousel-arrow react-multi-carousel-arrow-right"
      data-testid="movies-carousel-arrow"
      onClick={() => onClick()}
    >
      <MdKeyboardArrowRight />
    </div>
  )
}
