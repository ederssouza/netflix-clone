import { render, screen } from '@testing-library/react'

import { FeaturedMedia } from '.'
import { movies } from '../../tests/mocks/tmdb'

const movieMock = movies[0]

describe('FeaturedMedia component', () => {
  it('should render with success', async () => {
    render(<FeaturedMedia genre="Drama" movie={movieMock} />)

    const $featuredMedia = screen.getByTestId('featured-movie')

    expect(screen.getByText(movieMock.title)).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
    expect($featuredMedia).toHaveAttribute('style', `background-image: url(${movieMock.backdrop_path.original});`)
  })

  it('should have a href valid attribute', () => {
    render(<FeaturedMedia movie={movieMock} />)

    const $moreDetailsButton = screen.getByTestId('more-details-button')

    expect($moreDetailsButton).toHaveAttribute('href', `/details/${movieMock.media_type}/${movieMock.id}`)
  })
})
