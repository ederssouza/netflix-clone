import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { ArrowProps } from 'react-multi-carousel'

interface IMediaCarouselArrowProps extends ArrowProps {
  direction: 'left' | 'right'
  firstLoad?: boolean
}

export function MediaCarouselArrow ({
  direction,
  firstLoad = false,
  onClick,
  ...rest
}: IMediaCarouselArrowProps) {
  if (direction === 'left') {
    return (
      <div
        className={`carouselArrow carouselArrowLeft ${firstLoad ? 'carouselArrow-hidden' : ''}`}
        data-testid="carousel-arrow"
        onClick={() => !firstLoad && onClick()}
      >
        {!firstLoad && <MdKeyboardArrowLeft />}
      </div>
    )
  }

  return (
    <div
      className="carouselArrow carouselArrowRight"
      data-testid="carousel-arrow"
      onClick={() => onClick()}
    >
      <MdKeyboardArrowRight />
    </div>
  )
}
