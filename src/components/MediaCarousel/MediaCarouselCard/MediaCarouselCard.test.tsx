import { render, screen } from '@testing-library/react'

import { MediaCarouselCard } from '.'
import { movies } from '../../../tests/mocks/tmdb'

const movieMock = movies[0]

describe('MediaCarouselCard component', () => {
  it('should render with success', () => {
    render(<MediaCarouselCard movie={movieMock} />)

    const $mediaCarouselCard = screen.getByTestId('carousel-card')
    const $mediaCarouselCardMoreDetails = screen.getByTestId('carousel-more-details')

    expect($mediaCarouselCard.querySelector('img')).toHaveAttribute('alt', movieMock.title)
    expect($mediaCarouselCard.querySelector('img')).toHaveAttribute('src', movieMock.backdrop_path.w300)
    expect($mediaCarouselCardMoreDetails.querySelector('a')).toHaveAttribute('href', `/details/${movieMock.media_type}/${movieMock.id}`)
  })

  it('should render 0% when vote_average has value 0', () => {
    render(<MediaCarouselCard movie={{ ...movieMock, vote_average: 0 }} />)
    expect(screen.getByText(/0%/)).toBeInTheDocument()
  })
})
