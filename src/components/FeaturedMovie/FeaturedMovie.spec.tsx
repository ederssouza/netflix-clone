import { render, screen } from '@testing-library/react'
import { FeaturedMovie } from '.'

describe('FeaturedMovie component', () => {
  it('should render with success', () => {
    render(<FeaturedMovie />)
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument()
  })
})
