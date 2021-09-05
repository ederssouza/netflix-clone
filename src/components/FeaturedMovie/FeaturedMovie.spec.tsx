import { render, screen } from '@testing-library/react'
import { FeaturedMovie } from '.'
import { movies } from '../../tests/mocks/movies'

describe('FeaturedMovie component', () => {
  it('should render with success', () => {
    render(<FeaturedMovie movie={movies[0]} />)

    const $featuredMovie = screen.getByTestId('featured-movie')

    expect(screen.getByText(movies[0].title)).toBeInTheDocument()
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument()
    expect($featuredMovie).toHaveAttribute('style', `background-image: url(${movies[0].image});`)
  })
})
