import { render, screen } from '@testing-library/react'

import { FeaturedMovie } from '.'
import { movies } from '../../tests/mocks/tmdb'

const movieMock = movies[0]

describe('FeaturedMovie component', () => {
  it('should render with success', () => {
    render(<FeaturedMovie movie={movieMock} />)

    const $featuredMovie = screen.getByTestId('featured-movie')

    expect(screen.getByText(movieMock.title)).toBeInTheDocument()
    expect(screen.getByText(movieMock.title)).toBeInTheDocument()
    expect($featuredMovie).toHaveAttribute('style', `background-image: url(${movieMock.backdrop_path.original});`)
  })

  it('should have a href valid attribute', () => {
    render(<FeaturedMovie movie={movieMock} />)

    const $moreDetailsButton = screen.getByTestId('more-details-button')

    expect($moreDetailsButton).toHaveAttribute('href', `/details/${movieMock.media_type}/${movieMock.id}`)
  })
})
