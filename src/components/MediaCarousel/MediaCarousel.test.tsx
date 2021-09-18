import { fireEvent, render, screen } from '@testing-library/react'

import { MediaCarousel } from '.'
import { mediaList } from '../../tests/mocks/tmdb'

describe('MediaCarousel component', () => {
  it('should render with success', () => {
    render(<MediaCarousel title="Adventure" mediaList={mediaList} />)

    const $mediaCarousel = screen.getByTestId('carousel')
    const $mediaCarouselItems = $mediaCarousel.querySelectorAll('.react-multi-carousel-item')

    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect($mediaCarouselItems.length).toBeGreaterThanOrEqual(mediaList.length)
  })

  it('should render with `carousel-firstload` CSS class on first load', () => {
    render(<MediaCarousel title="Adventure" mediaList={mediaList} />)

    const $mediaCarousel = screen.getByTestId('carousel')

    expect($mediaCarousel).toHaveClass('carousel-firstload')
  })

  it('should render without `carousel-firstload` CSS class on click right arrow', () => {
    render(<MediaCarousel title="Adventure" mediaList={mediaList} />)

    const $mediaCarousel = screen.getByTestId('carousel')
    const $arrowRight = $mediaCarousel.querySelector('.carouselArrowRight')

    fireEvent.click($arrowRight)

    expect($mediaCarousel).not.toHaveClass('carousel-firstload')
  })
})
