import { act, render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Genre, { getServerSideProps } from '../../pages/genre/[type]/[id]'
import { api } from '../../services/api'
import { movies, genresMock } from '../mocks/tmdb'
import { intersectionObserverMock } from '../utils/intersectionObserverMock'

jest.mock('../../services/api')

beforeAll(() => {
  intersectionObserverMock([{ isIntersecting: false }])
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Search page component', () => {
  it('should render with success', async () => {
    jest.useFakeTimers()

    const getGenresMocked = mocked(api.getGenres)

    getGenresMocked.mockReturnValueOnce({
      data: {
        genres: [...genresMock]
      }
    } as any)

    const response = await getServerSideProps({
      params: { type: 'movie', id: '18' }
    } as any)

    const getDetailsByIdMocked = mocked(api.getGenreById)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: {
        results: [...movies.slice(0, 2)],
        total_pages: 10
      }
    } as any)

    render(<Genre genre="Drama" type="movie" id="18" />)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          genre: 'Drama',
          type: 'movie',
          id: '18'
        })
      })
    )

    await waitFor(() => {
      expect(screen.getByText(/Drama/)).toBeInTheDocument()
    }, { timeout: 1000 })

    act(() => jest.advanceTimersByTime(500))

    expect(getDetailsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: {
        results: [...movies.slice(0, 2)],
        total_pages: 10
      }
    })
  })

  it('should render error message when occured an error on request', async () => {
    const getGenresMocked = mocked(api.getGenres)

    getGenresMocked.mockReturnValueOnce({
      data: {
        genres: [...genresMock]
      }
    } as any)

    await getServerSideProps({
      params: { type: 'movie', id: '18' }
    } as any)

    const getDetailsByIdMocked = mocked(api.getGenreById)

    getDetailsByIdMocked.mockRejectedValueOnce({
      response: { status: 404 }
    })

    render(<Genre genre="Drama" type="movie" id="18" />)

    await waitFor(() => {
      expect(screen.getByText('Ocorreu um erro')).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('should load next page when the footer element is showing', async () => {
    intersectionObserverMock([{ isIntersecting: true }])

    const getGenresMocked = mocked(api.getGenres)

    getGenresMocked.mockReturnValueOnce({
      data: {
        genres: [...genresMock]
      }
    } as any)

    const response = await getServerSideProps({
      params: { type: 'movie', id: '18' }
    } as any)

    const getDetailsByIdMocked = mocked(api.getGenreById)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: {
        results: [...movies.slice(0, 2)],
        total_pages: 10
      }
    } as any)

    render(<Genre genre="Drama" type="movie" id="18" />)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          genre: 'Drama',
          type: 'movie',
          id: '18'
        })
      })
    )

    await waitFor(() => {
      expect(getDetailsByIdMocked).toHaveReturnedWith({
        data: {
          results: [...movies.slice(0, 2)],
          total_pages: 10
        }
      })
    }, { timeout: 1000 })
  })

  it('should redirect home whe dont receive genres list', async () => {
    const getGenresMocked = mocked(api.getGenres)

    getGenresMocked.mockReturnValueOnce({
      data: {
        genres: []
      }
    } as any)

    const response = await getServerSideProps({
      params: { type: 'movie', id: '18' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
          permanent: true
        })
      })
    )
  })

  it('should redirect to NotFound page when movie not exists', async () => {
    const getGenresMocked = mocked(api.getGenres)

    getGenresMocked.mockRejectedValueOnce({
      response: { status: 404 }
    })

    const response = await getServerSideProps({
      params: { type: 'movie', id: '18' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          permanent: false,
          destination: '/NotFound'
        })
      })
    )
  })

  it('should render generic error page when status code error is different of 404', async () => {
    const getGenresMocked = mocked(api.getGenres)

    getGenresMocked.mockRejectedValueOnce({
      response: { status: 500 }
    })

    const response = await getServerSideProps({
      params: { type: 'movie', id: '18' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          permanent: false,
          destination: '/internal-error?code=500'
        })
      })
    )
  })
})
