import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import DetailsById, { getServerSideProps } from '../../pages/details/[type]/[id]'
import { tmdbService } from '../../services/tmdb'
import { castMock, mediaList, providersMock, providersResponseMock } from '../mocks/tmdb'

jest.mock('../../services/tmdb')

const mediaMock = mediaList[0]

afterEach(() => {
  jest.clearAllMocks()
})

describe('DetailsById page component', () => {
  it('should render with success', () => {
    render(<DetailsById media={mediaMock} providers={providersMock} cast={castMock} />)
    expect(screen.getByText(new RegExp(mediaMock.title))).toBeInTheDocument()
  })

  it('should render movie data when receive `id` URL param', async () => {
    const getDetailsByIdMocked = mocked(tmdbService.getDetailsById)
    const getWatchProvidersByIdMocked = mocked(tmdbService.getWatchProvidersById)
    const getCreditsByIdMocked = mocked(tmdbService.getCreditsById)

    getDetailsByIdMocked.mockReturnValueOnce({
      data: { ...mediaMock }
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
      data: { ...mediaMock }
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
      data: { ...mediaMock }
    } as any)

    getWatchProvidersByIdMocked.mockReturnValueOnce({} as any)

    getCreditsByIdMocked.mockReturnValueOnce({
      data: { cast: [...castMock] }
    } as any)

    await getServerSideProps({
      params: { type: 'movie', id: 10 }
    } as any)

    const { container } = render(<DetailsById media={mediaMock} providers={[]} cast={castMock} />)

    expect(getDetailsByIdMocked).toBeCalled()
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: { ...mediaMock }
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
      data: { ...mediaMock }
    } as any)

    getWatchProvidersByIdMocked.mockReturnValueOnce({
      data: { ...providersResponseMock }
    } as any)

    getCreditsByIdMocked.mockReturnValueOnce({} as any)

    await getServerSideProps({
      params: { type: 'movie', id: 10 }
    } as any)

    const { container } = render(<DetailsById media={mediaMock} providers={providersMock} cast={[]} />)

    expect(getDetailsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getDetailsByIdMocked).toHaveReturnedWith({
      data: { ...mediaMock }
    })

    expect(getWatchProvidersByIdMocked).toHaveBeenCalledTimes(1)
    expect(getWatchProvidersByIdMocked).toHaveReturnedWith({
      data: { ...providersResponseMock }
    })

    expect(getCreditsByIdMocked).toHaveBeenCalledTimes(1)
    expect(getCreditsByIdMocked).toHaveReturnedWith({})
    expect(container.querySelector('[data-testid="sidebar-cast"]')).not.toBeInTheDocument()
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
          destination: '/internal-error?code=500'
        })
      })
    )
  })

  it('should render generic text error when not receive status code', async () => {
    const getGenresMocked = mocked(tmdbService.getDetailsById)

    getGenresMocked.mockRejectedValueOnce({
      response: {}
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
