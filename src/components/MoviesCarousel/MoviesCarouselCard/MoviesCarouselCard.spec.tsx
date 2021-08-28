import { render, screen } from '@testing-library/react'
import { MoviesCarouselCard } from '.'
import { movies } from '../../../tests/mocks/movies'

describe('MoviesCarouselCard component', () => {
  it('should render with success', () => {
    const movie = movies[0]
    const { container } = render(<MoviesCarouselCard movie={movie} />)
    const $movieCardImage = screen.getByAltText(movie.title)

    expect(container.querySelector('a')).toHaveAttribute('title', movie.title)
    expect($movieCardImage).toHaveAttribute('src', movie.image)
  })
})
