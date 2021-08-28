import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  it('should render with success', () => {
    render(<Header />)
    expect(screen.getByAltText('Netflix logo')).toBeInTheDocument()
  })

  // TODO: should add `containerFillBackground` CSS class when pageYOffset is greater than zero

  // TODO: should remove `containerFillBackground` CSS class when pageYOffset equals zero
})
