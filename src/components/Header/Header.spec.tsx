import { render, screen } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  it('should render with success', () => {
    render(<Header />)
    expect(screen.getByAltText('Netflix logo')).toBeInTheDocument()
  })

  // TODO: should add `containerFillBackground` CSS class when pageYOffset is greater than zero
  it('should add `containerFillBackground` CSS class when pageYOffset is greater than zero', () => {
    const { container } = render(<Header />)

    Object.defineProperty(window, 'pageYOffset', { value: 0 })

    const $header = screen.getByTestId('main-header')

    console.log(container.innerHTML)
    console.log(window.pageYOffset)

    Object.defineProperty(window, 'pageYOffset', { value: 100 })

    console.log(container.innerHTML)
    console.log(window.pageYOffset)
  })

  // TODO: should remove `containerFillBackground` CSS class when pageYOffset equals zero
  it('should remove `containerFillBackground` CSS class when pageYOffset equals zero', () => {

  })
})
