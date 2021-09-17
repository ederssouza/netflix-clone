import { render, screen } from '@testing-library/react'

import { FeaturedMedia } from '.'
import { mediaList } from '../../tests/mocks/tmdb'

const mediaMock = mediaList[0]

describe('FeaturedMedia component', () => {
  it('should render with success', async () => {
    render(<FeaturedMedia genre="Drama" media={mediaMock} />)

    const $featuredMedia = screen.getByTestId('featured-media')

    expect(screen.getByText(mediaMock.title)).toBeInTheDocument()
    expect(screen.getByText('Drama')).toBeInTheDocument()
    expect($featuredMedia).toHaveAttribute('style', `background-image: url(${mediaMock.backdrop_path.original});`)
  })

  it('should have a href valid attribute', () => {
    render(<FeaturedMedia media={mediaMock} />)

    const $moreDetailsButton = screen.getByTestId('more-details-button')

    expect($moreDetailsButton).toHaveAttribute('href', `/details/${mediaMock.media_type}/${mediaMock.id}`)
  })
})
