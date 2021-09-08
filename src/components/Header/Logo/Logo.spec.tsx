import { render, screen } from '@testing-library/react'

import { Logo } from '.'

describe('Logo component', () => {
  it('should render with success', () => {
    render(<Logo />)

    expect(screen.getByTitle('Início')).toBeInTheDocument()
    expect(screen.getByAltText('Netflix logo')).toBeInTheDocument()
  })

  it('should render with valid href attribute', () => {
    render(<Logo />)

    const $logo = screen.getByTestId('logo')

    expect($logo).toHaveAttribute('href', '/')
  })
})
