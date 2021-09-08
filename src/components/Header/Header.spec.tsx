import { render, screen, fireEvent } from '@testing-library/react'

import { Header } from '.'

describe('Header component', () => {
  afterEach(() => {
    Object.defineProperty(window, 'pageYOffset', { value: 0 })
  })

  it('should render with success', () => {
    render(<Header />)
    expect(screen.getByAltText('Netflix logo')).toBeInTheDocument()
  })

  it('should add `headerFillBackground` CSS class when pageYOffset is greater than zero', () => {
    render(<Header />)

    const $header = screen.getByTestId('main-header')
    Object.defineProperty(window, 'pageYOffset', { value: 100 })
    fireEvent.scroll(window)

    expect($header).toHaveClass('headerFillBackground')
  })

  it('should remove `headerFillBackground` CSS class when pageYOffset equals zero', () => {
    render(<Header />)

    const $header = screen.getByTestId('main-header')

    Object.defineProperty(window, 'pageYOffset', { value: 100 })
    fireEvent.scroll(window)

    Object.defineProperty(window, 'pageYOffset', { value: 0 })
    fireEvent.scroll(window)

    expect($header).not.toHaveClass('headerFillBackground')
  })
})
