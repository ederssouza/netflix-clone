import { render, screen } from '@testing-library/react'
import { MoviesCarousel } from '.'

describe('MoviesCarousel component', () => {
  it('should render with success', () => {
    render(<MoviesCarousel />)
    expect(screen.getByText('MoviesCarousel component')).toBeInTheDocument()
  })
})
