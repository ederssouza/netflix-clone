import { render, screen } from '@testing-library/react'
import { MoviesCarousel } from '.'
import { movies } from '../../tests/mocks/movies'

describe('MoviesCarousel component', () => {
  it('should render with success', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $moviesCarousel = screen.getByTestId('movies-carousel')

    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect($moviesCarousel.querySelectorAll('.react-multi-carousel-item').length).toBeGreaterThanOrEqual(movies.length)
  })
})
