import { render, screen, waitFor } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Search, { getServerSideProps } from '../../pages/search'
import { api } from '../../services/api'
import { movies } from '../mocks/tmdb'

jest.mock('../../services/api')

beforeEach(() => {
  const intersectionObserverMock = jest.fn()

  intersectionObserverMock.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })

  window.IntersectionObserver = intersectionObserverMock
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Search page component', () => {
  it('should render with success', async () => {
    const searchTerm = 'Movie 1'
    const response = await getServerSideProps({
      query: { q: searchTerm }
    } as any)

    const getDetailsByIdMocked = mocked(api.search)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: {
        results: [...movies.slice(0, 2)]
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
    }, { timeout: 2000 })

    expect(getDetailsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: {
        results: [...movies.slice(0, 2)]
      }
    })
  })

  it('should render error message when occured an error on request', async () => {
    const searchTerm = 'Movie 1'
    await getServerSideProps({
      query: { q: searchTerm }
    } as any)

    const getDetailsByIdMocked = mocked(api.search)

    getDetailsByIdMocked.mockRejectedValueOnce({
      response: { status: 404 }
    })

    render(<Search q={searchTerm} />)

    await waitFor(() => {
      expect(screen.getByText('Ocorreu um erro')).toBeInTheDocument()
    }, { timeout: 2000 })
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

  it.todo('should load next page when the footer element is showing')
})
