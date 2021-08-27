import { render, screen, fireEvent } from '@testing-library/react'
import { MoviesCarousel } from '.'
import { movies } from '../../tests/mocks/movies'
import { offsetAfterAll, offsetBeforeAll } from '../../tests/utils/offset'

describe('MoviesCarousel component', () => {
  beforeAll(() => offsetBeforeAll())

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

  it('should move the scroll movie list to X, when click prev button', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $containerList = screen.getByTestId('movie-list')
    const $buttonNextMovies = screen.getByTestId('button-next-movies')
    const $buttonPrevMovies = screen.getByTestId('button-prev-movies')

    fireEvent.click($buttonNextMovies)
    fireEvent.click($buttonPrevMovies)

    expect($containerList.scrollLeft).toEqual(0)
  })

  afterAll(() => offsetAfterAll())
})
