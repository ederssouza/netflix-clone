import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Details, { getServerSideProps } from '../../pages/details/[type]/[id]'
import { tmdbService } from '../../services/tmdb'

jest.mock('../../services/tmdb')

const movieMock = {
  title: 'Matrix',
  overview: 'Lorem ipsum dolor.',
  backdrop_path: '/8s4h9friP6Ci3adRGahHARVd76E.jpg',
  vote_average: 7.4,
  release_date: '2021-07-08',
  original_language: 'en',
  runtime: 115,
  genres: [
    { id: 1, name: 'thriller' },
    { id: 2, name: 'Adventure' }
  ]
}

const providersMock = [
  {
    provider_id: 4,
    provider_name: 'NOW',
    logo_path: '/dNAz0MMIPiqCD2axGIktXSFWmkz.jpg'
  }
]

const providersResponseMock = {
  results: {
    BR: {
      flatrate: [...providersMock]
    }
  }
}

const castMock = [
  { id: 1, name: 'Keanu Reeves' },
  { id: 2, name: 'Carrie-Anne Moss' }
]

afterEach(() => {
  jest.clearAllMocks()
})

describe('DetailsById page component', () => {
  it('should render with success', () => {
    render(<Details movie={movieMock} providers={providersMock} cast={castMock} />)
    expect(screen.getByText(/Matrix/)).toBeInTheDocument()
  })

  it('should render movie data when receive `id` URL param', async () => {
    const getDetailsByIdMocked = mocked(tmdbService.getDetailsById)
    const getWatchProvidersByIdMocked = mocked(tmdbService.getWatchProvidersById)
    const getCreditsByIdMocked = mocked(tmdbService.getCreditsById)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: { ...movieMock }
    } as any)

    getWatchProvidersByIdMocked.mockReturnValueOnce({
      data: { ...providersResponseMock }
    } as any)

    getCreditsByIdMocked.mockReturnValueOnce({
      data: { cast: [...castMock] }
    } as any)

    await getServerSideProps({
      params: { type: 'movie', id: 10 }
    } as any)

    expect(getDetailsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: { ...movieMock }
    })

    expect(getWatchProvidersByIdMocked).toHaveBeenCalledTimes(1)
    expect(getWatchProvidersByIdMocked).toHaveReturnedWith({
      data: { ...providersResponseMock }
    })

    expect(getCreditsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getCreditsByIdMocked).toHaveReturnedWith({
      data: { cast: [...castMock] }
    })
  })

  it('should not render providers when not receiving data ', async () => {
    const getDetailsByIdMocked = mocked(tmdbService.getDetailsById)
    const getWatchProvidersByIdMocked = mocked(tmdbService.getWatchProvidersById)
    const getCreditsByIdMocked = mocked(tmdbService.getCreditsById)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: { ...movieMock }
    } as any)

    getWatchProvidersByIdMocked.mockReturnValueOnce({} as any)

    getCreditsByIdMocked.mockReturnValueOnce({
      data: { cast: [...castMock] }
    } as any)

    await getServerSideProps({
      params: { type: 'movie', id: 10 }
    } as any)

    const { container } = render(<Details movie={movieMock} providers={[]} cast={castMock} />)

    expect(getDetailsByIdMocked).toBeCalled()
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: { ...movieMock }
    })

    expect(getWatchProvidersByIdMocked).toBeCalledTimes(1)
    expect(getWatchProvidersByIdMocked).toHaveReturnedWith({})
    expect(container.querySelector('.providers')).not.toBeInTheDocument()
    expect(screen.getByText('Não está disponível em nenhuma plataforma')).toBeInTheDocument()

    expect(getCreditsByIdMocked).toBeCalledTimes(1)
    expect(getCreditsByIdMocked).toHaveReturnedWith({
      data: { cast: [...castMock] }
    })
  })

  it('should not render cast when not receiving data', async () => {
    const getDetailsByIdMocked = mocked(tmdbService.getDetailsById)
    const getWatchProvidersByIdMocked = mocked(tmdbService.getWatchProvidersById)
    const getCreditsByIdMocked = mocked(tmdbService.getCreditsById)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: { ...movieMock }
    } as any)

    getWatchProvidersByIdMocked.mockReturnValueOnce({
      data: { ...providersResponseMock }
    } as any)

    getCreditsByIdMocked.mockReturnValueOnce({} as any)

    await getServerSideProps({
      params: { type: 'movie', id: 10 }
    } as any)

    const { container } = render(<Details movie={movieMock} providers={providersMock} cast={[]} />)

    expect(getDetailsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: { ...movieMock }
    })

    expect(getWatchProvidersByIdMocked).toHaveBeenCalledTimes(1)
    expect(getWatchProvidersByIdMocked).toHaveReturnedWith({
      data: { ...providersResponseMock }
    })

    expect(getCreditsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getCreditsByIdMocked).toHaveReturnedWith({})
    expect(container.querySelector('.sidebarCast')).not.toBeInTheDocument()
  })

  it('should redirect to NotFound page when movie not exists', async () => {
    const getDetailsByIdMocked = mocked(tmdbService.getDetailsById)

    getDetailsByIdMocked.mockRejectedValueOnce({
      response: { status: 404 }
    })

    const response = await getServerSideProps({
      params: { type: 'movie', id: 0 }
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
    const getDetailsByIdMocked = mocked(tmdbService.getDetailsById)

    getDetailsByIdMocked.mockRejectedValueOnce({
      response: { status: 500 }
    })

    const response = await getServerSideProps({
      params: { type: 'movie', id: 0 }
    } as any)

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
