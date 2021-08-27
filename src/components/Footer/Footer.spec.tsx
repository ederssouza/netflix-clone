import { render, screen } from '@testing-library/react'
import { Footer } from '.'

describe('Footer component', () => {
  it('should render with success', () => {
    render(<Footer />)
    expect(screen.getByText('Footer component')).toBeInTheDocument()
  })
})
