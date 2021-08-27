import { render, screen, fireEvent } from '@testing-library/react'
import { MoviesCarousel } from '.'

const movies = Array.from({ length: 20 }).map((_, index) => {
  return {
    id: index + 1,
    title: 'Movie title',
    image: 'https://occ-0-626-1123.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQ1n7nMsHQU4eAT8s7OtRNBTkRt8KcVP9M0q5ZnZRppX0WwulOFBD6wHx0U4pOga86psNHvwzBvJah7ey3BpIgbMOeE.webp?r=252'
  }
})

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight'
)

const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth'
)

describe('MoviesCarousel component', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 200
    })

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 200
    })
  })

  it('should render with success', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)
    expect(screen.getByText('Adventure')).toBeInTheDocument()
  })

  it('should render a movie list', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)
    const $moviesImageList = screen.getAllByTestId('movie-img')
    expect($moviesImageList.length).toBe(20)
  })

  it('should move the scroll movie list to X, when click next button', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $containerList = screen.getByTestId('movie-list')
    const $buttonNextMovies = screen.getByTestId('button-next-movies')

    fireEvent.click($buttonNextMovies)
    expect($containerList.scrollLeft).toEqual(200)
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
  })

  it('should move the scroll movie list to X, when click prev button', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $containerList = screen.getByTestId('movie-list')
    const $buttonNextMovies = screen.getByTestId('button-next-movies')
    const $buttonPrevMovies = screen.getByTestId('button-prev-movies')

    fireEvent.click($buttonNextMovies)
    fireEvent.click($buttonPrevMovies)

    expect($containerList.scrollLeft).toEqual(0)
  })
})
