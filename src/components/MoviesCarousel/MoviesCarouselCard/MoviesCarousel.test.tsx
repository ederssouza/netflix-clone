import { render, screen } from '@testing-library/react'

import { MoviesCarouselCard } from '.'
import { movies } from '../../../tests/mocks/tmdb'

const movieMock = movies[0]

describe('MoviesCarouselCard component', () => {
  it('should render with success', () => {
    render(<MoviesCarouselCard movie={movieMock} />)

    const $moviesCarouselCard = screen.getByTestId('movies-carousel-card')
    const $moviesCarouselCardMoreDetails = screen.getByTestId('movies-carousel-more-details')

    expect($moviesCarouselCard.querySelector('img')).toHaveAttribute('alt', movieMock.title)
    expect($moviesCarouselCard.querySelector('img')).toHaveAttribute('src', movieMock.backdrop_path.w300)
    expect($moviesCarouselCardMoreDetails.querySelector('a')).toHaveAttribute('href', `/details/${movieMock.media_type}/${movieMock.id}`)
  })

  it('should render 0% when vote_average has value 0', () => {
    render(<MoviesCarouselCard movie={{ ...movieMock, vote_average: 0 }} />)
    expect(screen.getByText(/0%/)).toBeInTheDocument()
  })
})
