import { render, screen } from '@testing-library/react'
import { FeaturedMovie } from '.'

const movie = {
  id: 1,
  background: 'http://4.bp.blogspot.com/-5tiOMxe6rSs/UkofuptCcVI/AAAAAAAAHXk/TkY1r2cYM6M/s1600/breaking-bad.jpg',
  title: 'Movie title',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aliquam quos deleniti fugit fuga neque quisquam accusamus dignissimos.'
}

describe('FeaturedMovie component', () => {
  it('should render with success', () => {
    render(<FeaturedMovie movie={movie} />)

    const $featuredMovie = screen.getByTestId('featured-movie')

    expect(screen.getByText(movie.title)).toBeInTheDocument()
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument()
    expect($featuredMovie).toHaveAttribute('style', `background-image: url(${movie.background});`)
  })
})
