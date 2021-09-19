import { act, render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Latest from '../../pages/latest'
import { tmdbService } from '../../services/tmdb'
import { mediaList } from '../mocks/tmdb'
import { intersectionObserverMock } from '../utils/intersectionObserverMock'

jest.mock('../../services/tmdb')

beforeAll(() => {
  intersectionObserverMock([{ isIntersecting: false }])
})

describe('Latest page component', () => {
  it('should render with success', async () => {
    jest.useFakeTimers()

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
    intersectionObserverMock([{ isIntersecting: true }])

    const getTrendingsMocked = mocked(tmdbService.getTrendings)

    getTrendingsMocked.mockReturnValueOnce({
      data: {
        results: mediaList.slice(0, 2),
        total_pages: 10
      }
    } as any)

    render(<Latest />)

    await waitFor(() => {
      expect(getTrendingsMocked).toHaveReturnedWith({
        data: {
          results: mediaList.slice(0, 2),
          total_pages: 10
        }
      })
    }, { timeout: 1000 })
  })
})
