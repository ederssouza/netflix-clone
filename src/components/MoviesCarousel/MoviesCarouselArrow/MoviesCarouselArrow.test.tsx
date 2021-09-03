import { render, screen } from '@testing-library/react'
import { MoviesCarouselArrow } from '.'

describe('MoviesCarouselArrow component', () => {
  it('should render left arrow with success', () => {
    render(<MoviesCarouselArrow direction="left" />)

    expect(screen.getByTestId('movies-carousel-arrow')).toHaveClass('react-multi-carousel-arrow-left')
  })

  it('should render right arrow with success', () => {
    render(<MoviesCarouselArrow direction="right" />)

    expect(screen.getByTestId('movies-carousel-arrow')).toHaveClass('react-multi-carousel-arrow-right')
  })
})
