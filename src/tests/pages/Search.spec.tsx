import { render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Search, { getServerSideProps } from '../../pages/search'
import { tmdbService } from '../../services/tmdb'
import { mediaList } from '../mocks/tmdb'
import { intersectionObserverMock } from '../utils/intersectionObserverMock'

jest.mock('../../services/tmdb')

beforeAll(() => {
  intersectionObserverMock([{ isIntersecting: false }])
})

describe('Search page component', () => {
  it('should render with success', async () => {
    const searchTerm = 'Movie 1'
    const response = await getServerSideProps({
      query: { q: searchTerm }
    } as any)

    const getDetailsByIdMocked = mocked(tmdbService.search)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: {
        results: [...mediaList.slice(0, 2)],
        total_pages: 10
      }
    } as any)

    render(<Search q={searchTerm} />)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          q: searchTerm
        })
      })
    )

    await waitFor(() => {
      expect(screen.getByText(searchTerm)).toBeInTheDocument()
    }, { timeout: 1000 })

    expect(getDetailsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: {
        results: [...mediaList.slice(0, 2)],
        total_pages: 10
      }
    })
  })

  it('should render empty state when search does not return results', async () => {
    const searchTerm = 'Movie 1'

    await getServerSideProps({
      query: { q: searchTerm }
    } as any)

    const getDetailsByIdMocked = mocked(tmdbService.search)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: {
        results: [],
        total_pages: 0
      }
    } as any)

    render(<Search q={searchTerm} />)

    await waitFor(() => {
      expect(screen.getByText(new RegExp(`Não encontramos resultados para "${searchTerm}"`))).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('should render error message when occured an error on request', async () => {
    const searchTerm = 'Movie 1'
    await getServerSideProps({
      query: { q: searchTerm }
    } as any)

    const getDetailsByIdMocked = mocked(tmdbService.search)

    getDetailsByIdMocked.mockRejectedValueOnce({
      response: { status: 404 }
    })

    render(<Search q={searchTerm} />)

    await waitFor(() => {
      expect(screen.getByText(/Ops... Ocorreu um erro/)).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('should redirect whe dont receive `q` query param', async () => {
    const response = await getServerSideProps({
      query: {}
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )
  })

  it('should load next page when the footer element is showing', async () => {
    intersectionObserverMock([{ isIntersecting: true }])

    const searchTerm = 'Movie 1'
    const response = await getServerSideProps({
      query: { q: searchTerm }
    } as any)

    const getDetailsByIdMocked = mocked(tmdbService.search)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: {
        results: [...mediaList.slice(0, 2)],
        total_pages: 10
      }
    } as any)

    render(<Search q={searchTerm} />)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          q: searchTerm
        })
      })
    )

    await waitFor(() => {
      expect(getDetailsByIdMocked).toHaveReturnedWith({
        data: {
          results: [...mediaList.slice(0, 2)],
          total_pages: 10
        }
      })
    }, { timeout: 1000 })
  })
})
