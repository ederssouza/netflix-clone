import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  it('should render with success', () => {
    render(<Header />)
    expect(screen.getByAltText('Netflix logo')).toBeInTheDocument()
  })
})
