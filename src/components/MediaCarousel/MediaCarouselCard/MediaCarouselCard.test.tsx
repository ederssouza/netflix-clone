import { render, screen } from '@testing-library/react'

import { MediaCarouselCard } from '.'
import { mediaList } from '../../../tests/mocks/tmdb'

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
})
