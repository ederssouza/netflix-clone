import { render, screen } from '@testing-library/react'

import { MoviesCarouselCard } from '.'
import { movies } from '../../../tests/mocks/movies'

describe('MoviesCarouselCard component', () => {
  it('should render with success', () => {
    const movie = movies[0]

    render(<MoviesCarouselCard movie={movie} />)

    const $moviesCarouselCard = screen.getByTestId('movies-carousel-card')
    const $moviesCarouselCardMoreDetails = screen.getByTestId('movies-carousel-more-details')

    expect($moviesCarouselCard.querySelector('img')).toHaveAttribute('alt', movie.title)
    expect($moviesCarouselCard.querySelector('img')).toHaveAttribute('src', movie.image)
    expect($moviesCarouselCardMoreDetails.querySelector('a')).toHaveAttribute('href', `/details/${movie.id}`)
  })
})
