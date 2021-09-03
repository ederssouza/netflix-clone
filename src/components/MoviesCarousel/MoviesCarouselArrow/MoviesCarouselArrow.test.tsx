import { render, screen } from '@testing-library/react'
import { MoviesCarouselArrow } from '.'

describe('MoviesCarouselArrow component', () => {
  it('should render with success', () => {
    render(<MoviesCarouselArrow direction="left" />)
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument()
  })
})
