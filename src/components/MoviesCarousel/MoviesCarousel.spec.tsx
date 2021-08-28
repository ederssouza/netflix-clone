import { render, screen, fireEvent } from '@testing-library/react'
import { MoviesCarousel } from '.'
import { movies } from '../../tests/mocks/movies'
import { offsetAfterAll, offsetBeforeAll } from '../../tests/utils/scrollAttributes'

describe('MoviesCarousel component', () => {
  beforeAll(() => offsetBeforeAll())

  it('should render with success', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)
    expect(screen.getByText('Adventure')).toBeInTheDocument()
  })

  it('should render a movie list', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)
    const $moviesImageList = screen.getAllByTestId('movie-card')
    expect($moviesImageList.length).toBe(20)
  })

  it('should move the scroll movie list when click next button', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $containerList = screen.getByTestId('movie-list')
    const $buttonNextMovies = screen.getByTestId('button-next-movies')

    fireEvent.click($buttonNextMovies)

    expect($containerList.scrollLeft).toEqual(200)
  })

  it('should move the scroll movie list when click pre button', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $containerList = screen.getByTestId('movie-list')
    const $buttonPrevMovies = screen.getByTestId('button-prev-movies')
    const $buttonNextMovies = screen.getByTestId('button-next-movies')

    fireEvent.click($buttonNextMovies)
    fireEvent.click($buttonPrevMovies)

    expect($containerList.scrollLeft).toEqual(0)
  })

  it('should move the scroll movie list when clicking prev and next buttons', () => {
    render(<MoviesCarousel title="Adventure" movies={movies} />)

    const $containerList = screen.getByTestId('movie-list')
    const $buttonPrevMovies = screen.getByTestId('button-prev-movies')
    const $buttonNextMovies = screen.getByTestId('button-next-movies')

    // start scroll position
    fireEvent.scroll($containerList)
    fireEvent.click($buttonNextMovies) // 200
    fireEvent.click($buttonNextMovies) // 400
    fireEvent.click($buttonNextMovies) // 600

    // middle scroll position
    fireEvent.scroll($containerList)
    fireEvent.click($buttonNextMovies) // 800

    // end scroll position
    fireEvent.scroll($containerList)
    fireEvent.click($buttonPrevMovies) // 600

    expect($containerList.scrollLeft).toEqual(600)
  })

  afterAll(() => offsetAfterAll())
})
