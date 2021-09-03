import { render, screen } from '@testing-library/react'
import { Footer } from '.'

describe('Footer component', () => {
  it('should render with success all social media links', () => {
    render(<Footer />)

    const $facebook = screen.getByTitle('Facebook')
    const $istagram = screen.getByTitle('Instagram')
    const $twitter = screen.getByTitle('Twitter')
    const $youTube = screen.getByTitle('YouTube')

    expect($facebook).toBeInTheDocument()
    expect($facebook).toHaveAttribute('href', 'https://www.facebook.com/netflixbrasil')
    expect($facebook.querySelector('svg')).toBeInTheDocument()

    expect($istagram).toBeInTheDocument()
    expect($istagram).toHaveAttribute('href', 'https://www.instagram.com/NetflixBrasil')
    expect($istagram.querySelector('svg')).toBeInTheDocument()

    expect($twitter).toBeInTheDocument()
    expect($twitter).toHaveAttribute('href', 'https://twitter.com/NetflixBrasil')
    expect($twitter.querySelector('svg')).toBeInTheDocument()

    expect($youTube).toBeInTheDocument()
    expect($youTube).toHaveAttribute('href', 'https://www.youtube.com/user/NetflixBRA')
    expect($youTube.querySelector('svg')).toBeInTheDocument()
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

    expect(screen.getByText(/1997-\d{4}\s+Netflix,\s+Inc/)).toBeInTheDocument()
  })
})
