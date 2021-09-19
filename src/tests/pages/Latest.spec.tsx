import { act, render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Latest, { getStaticProps } from '../../pages/latest'
import { tmdbService } from '../../services/tmdb'
import { mediaList } from '../mocks/tmdb'
import { intersectionObserverMock } from '../utils/intersectionObserverMock'

jest.mock('../../services/tmdb')

afterEach(() => {
  jest.clearAllMocks()
})

describe('Latest page component', () => {
  it('should render with success', async () => {
    jest.useFakeTimers()

    intersectionObserverMock([{ isIntersecting: false }])

    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockReturnValueOnce({
      data: {
        results: mediaList.slice(0, 2),
        total_pages: 10
      }
    } as any)

    render(<Latest />)

    await waitFor(() => {
      expect(screen.getByText(/Movie 1/)).toBeInTheDocument()
    }, { timeout: 1000 })

    act(() => jest.advanceTimersByTime(500))

    expect(getTrendingsMocked).toHaveBeenCalledTimes(1)
    expect(getTrendingsMocked).toHaveReturnedWith({
      data: {
        results: mediaList.slice(0, 2),
        total_pages: 10
      }
    })
  })

  it('should load next page when the footer element is showing', async () => {
    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockReturnValueOnce({
      data: {
        results: mediaList.slice(0, 2),
        total_pages: 10
      }
    } as any)

    jest.useFakeTimers()

    intersectionObserverMock([{ isIntersecting: true }])

    act(() => jest.advanceTimersByTime(500))

    render(<Latest />)

    await waitFor(() => {
      expect(screen.getByText(/Movie 1/)).toBeInTheDocument()
      expect(getTrendingsMocked).toHaveReturnedWith({
        data: {
          results: mediaList.slice(0, 2),
          total_pages: 10
        }
      })
    }, { timeout: 1000 })
  })

  it('should return an initial list on first page load', async () => {
    intersectionObserverMock([{ isIntersecting: false }])

    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockReturnValueOnce({
      data: {
        results: mediaList.slice(0, 2),
        total_pages: 10
      }
    } as any)

    await getStaticProps({} as any)

    expect(getTrendingsMocked).toHaveBeenCalledTimes(1)
    expect(getTrendingsMocked).toHaveReturnedWith({
      data: {
        results: mediaList.slice(0, 2),
        total_pages: 10
      }
    })
  })

  it('should return an empty initial list on first page load', async () => {
    intersectionObserverMock([{ isIntersecting: false }])

    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockReturnValueOnce({} as any)

    const response = await getStaticProps({
      mediaFirstList: []
    } as any)

    expect(getTrendingsMocked).toHaveBeenCalledTimes(1)
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          mediaFirstList: []
        }
      })
    )
  })

  it('should redirect to NotFound page when movie not exists', async () => {
    intersectionObserverMock([{ isIntersecting: false }])

    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockRejectedValueOnce({
      response: { status: 404 }
    })

    const response = await getStaticProps({} as any)

    expect(response).toEqual(
      expect.objectContaining({
        notFound: true
      })
    )
  })

  it('should render generic error page when status code error is different of 404', async () => {
    intersectionObserverMock([{ isIntersecting: false }])

    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockRejectedValueOnce({
      response: { status: 500 }
    })

    const response = await getStaticProps({} as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          permanent: false,
          destination: '/internal-error?code=500'
        })
      })
    )
  })

  it('should render generic text error when not receive status code', async () => {
    intersectionObserverMock([{ isIntersecting: false }])

    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockRejectedValueOnce({
      response: {}
    })

    const response = await getStaticProps({} as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          permanent: false,
          destination: '/internal-error'
        })
      })
    )
  })
})
