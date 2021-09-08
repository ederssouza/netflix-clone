import { fireEvent, render, screen } from '@testing-library/react'
import { MoviesCarousel } from '.'
import { movies } from '../../tests/mocks/movies'

describe('MoviesCarousel component', () => {
  it('should render with success', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $moviesCarousel = screen.getByTestId('movies-carousel')

    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect($moviesCarousel.querySelectorAll('.react-multi-carousel-item').length).toBeGreaterThanOrEqual(movies.length)
  })

  it('should render with `carousel-firstload` CSS class on first load', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)
    const $moviesCarousel = screen.getByTestId('movies-carousel')
    expect($moviesCarousel).toHaveClass('carousel-firstload')
  })

  it('should render with out `carousel-firstload` CSS class on click right arrow', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $moviesCarousel = screen.getByTestId('movies-carousel')
    const $arrowRight = $moviesCarousel.querySelector('.carouselArrowRight')

    fireEvent.click($arrowRight)

    expect($moviesCarousel).not.toHaveClass('carousel-firstload')
  })
})
