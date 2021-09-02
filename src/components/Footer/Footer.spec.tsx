import { render, screen } from '@testing-library/react'
import { Footer } from '.'

describe('Footer component', () => {
  it('should render with success the social media links', () => {
    render(<Footer />)

    const $footer = screen.getByTestId('footer')

    expect($footer.querySelector('.socialMedia svg')).toBeInTheDocument()
  })

  it('should render with success the links', () => {
    render(<Footer />)

    expect(screen.getByText('Idioma e legendas')).toBeInTheDocument()
    expect(screen.getByText('Audiodescrição')).toBeInTheDocument()
    expect(screen.getByText('Centro de ajuda')).toBeInTheDocument()
    expect(screen.getByText('Cartão pré-pago')).toBeInTheDocument()
  })

  it('should render copyright', () => {
    render(<Footer />)

    expect(screen.getByText(/1997-2021/)).toBeInTheDocument()
  })
})
