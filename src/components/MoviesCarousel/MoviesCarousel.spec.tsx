import { render, screen } from '@testing-library/react'
import { MoviesCarousel } from '.'

const movies = Array.from({ length: 20 }).map((_, index) => {
  return {
    id: index + 1,
    title: 'Movie title',
    image: 'https://occ-0-626-1123.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQ1n7nMsHQU4eAT8s7OtRNBTkRt8KcVP9M0q5ZnZRppX0WwulOFBD6wHx0U4pOga86psNHvwzBvJah7ey3BpIgbMOeE.webp?r=252'
  }
})

describe('MoviesCarousel component', () => {
  it('should render with success', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)
    expect(screen.getByText('Adventure')).toBeInTheDocument()
  })

  it('should render a list movie', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)
    const moviesImageList = screen.getAllByTestId('movie-img')
    expect(moviesImageList.length).toBe(20)
  })
})
