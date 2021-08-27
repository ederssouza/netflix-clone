import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home page component', () => {
  it('should render with success', () => {
    render(<Home />)
    expect(screen.getByAltText('Netflix logo')).toBeInTheDocument()
  })
})
