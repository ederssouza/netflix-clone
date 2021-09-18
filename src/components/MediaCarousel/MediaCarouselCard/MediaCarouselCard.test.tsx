import { fireEvent, render, screen } from '@testing-library/react'

import { MediaCarouselCard } from '.'
import { mediaList } from '../../../tests/mocks/tmdb'
import { MediaCarousel } from '../index'

const mediaMock = mediaList[0]

describe('MediaCarouselCard component', () => {
  it('should render with success', () => {
    render(<MediaCarouselCard media={mediaMock} />)

    const $mediaCarouselCard = screen.getByTestId('carousel-card')
    const $mediaCarouselCardMoreDetails = screen.getByTestId('carousel-more-details')

    expect($mediaCarouselCard.querySelector('img')).toHaveAttribute('alt', mediaMock.title)
    expect($mediaCarouselCard.querySelector('img')).toHaveAttribute('src', mediaMock.backdrop_path.w300)
    expect($mediaCarouselCardMoreDetails.querySelector('a')).toHaveAttribute('href', `/details/${mediaMock.media_type}/${mediaMock.id}`)
  })

  it('should render 0% when vote_average has value 0', () => {
    render(<MediaCarouselCard media={{ ...mediaMock, vote_average: 0 }} />)
    expect(screen.getByText(/0%/)).toBeInTheDocument()
  })

  it('should render first card with `mediaCarouselFirstActiveCard` CSS class on onMouseEnter event', () => {
    const { container } = render(
      <>
        <MediaCarousel title="Adventure" mediaList={mediaList} />
        <MediaCarouselCard media={{ ...mediaMock, vote_average: 0 }} />
      </>
    )

    const $mediaCarouselCard = container.querySelectorAll('[data-testid="carousel-card"]')[0]
    expect($mediaCarouselCard).not.toHaveClass('mediaCarouselFirstActiveCard')
    expect($mediaCarouselCard).not.toHaveClass('mediaCarouselLastActiveCard')

    const $firstCarouselActiveCard = container.querySelectorAll('[data-testid="carousel-card"]')[8]
    fireEvent.mouseEnter($firstCarouselActiveCard)
    expect($firstCarouselActiveCard).toHaveClass('mediaCarouselFirstActiveCard')
  })

  it('should render last card with `mediaCarouselFirstActiveCard` CSS class on onMouseEnter event', () => {
    const { container } = render(
      <>
        <MediaCarousel title="Adventure" mediaList={mediaList} />
        <MediaCarouselCard media={{ ...mediaMock, vote_average: 0 }} />
      </>
    )

    const $mediaCarouselCard = container.querySelectorAll('[data-testid="carousel-card"]')[0]
    expect($mediaCarouselCard).not.toHaveClass('mediaCarouselFirstActiveCard')
    expect($mediaCarouselCard).not.toHaveClass('mediaCarouselLastActiveCard')

    const $lastCarouselActiveCard = container.querySelectorAll('[data-testid="carousel-card"]')[11]
    fireEvent.mouseEnter($lastCarouselActiveCard)
    expect($lastCarouselActiveCard).toHaveClass('mediaCarouselLastActiveCard')
  })
})
