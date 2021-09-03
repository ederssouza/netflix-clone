import { render, screen } from '@testing-library/react'
import { MoviesCarouselCard } from '.'

describe('MoviesCarouselCard component', () => {
  it('should render with success', () => {
    render(<MoviesCarouselCard movie={{ id: 1, title: '', image: '' }} />)
    expect(screen.getByText('')).toBeInTheDocument()
  })
})
