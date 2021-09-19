import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Movies, { getStaticProps } from '../../pages/movies'
import { tmdbService } from '../../services/tmdb'
import { mediaRequestPayloadMock, movieListNormalizedMock } from '../mocks/tmdb'

jest.mock('../../services/tmdb')

beforeEach(() => {
  const randomMock = jest.spyOn(global.Math, 'random')
  randomMock.mockReturnValue(0)
})

describe('Movies page component', () => {
  it('should render with success', async () => {
    const mediaList1Mock = mocked(tmdbService.getGenreById)
    const mediaList2Mock = mocked(tmdbService.getGenreById)
    const mediaList3Mock = mocked(tmdbService.getGenreById)
    const mediaList4Mock = mocked(tmdbService.getGenreById)
    const mediaList5Mock = mocked(tmdbService.getGenreById)
    const mediaList6Mock = mocked(tmdbService.getGenreById)
    const defaultResponse = {
      data: {
        page: 1,
        results: [...mediaRequestPayloadMock],
        total_pages: 1,
        total_results: 2
      }
    }

    mediaList1Mock.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList2Mock.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList3Mock.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList4Mock.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList5Mock.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList6Mock.mockReturnValueOnce({ ...defaultResponse } as any)

    const response = await getStaticProps({} as any)
    const sections = [
      { title: 'Ação', mediaList: [...movieListNormalizedMock] },
      { title: 'Animação', mediaList: [...movieListNormalizedMock] },
      { title: 'Drama', mediaList: [...movieListNormalizedMock] },
      { title: 'Terror', mediaList: [...movieListNormalizedMock] },
      { title: 'Guerra', mediaList: [...movieListNormalizedMock] },
      { title: 'Faroeste', mediaList: [...movieListNormalizedMock] }
    ]

    const sectionIndexAleatory = Math.floor(Math.random() * sections.length)
    const mediaIndexAleatory = Math.floor(Math.random() * sections[0].mediaList.length)
    const featured = sections[sectionIndexAleatory].mediaList[mediaIndexAleatory]

    render(<Movies featured={featured} sections={sections} />)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          featured,
          sections
        }
      })
    )
  })

  it('should redirect to NotFound page when movie not exists', async () => {
    const mediaList1Mock = mocked(tmdbService.getGenreById)

    mediaList1Mock.mockRejectedValueOnce({
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
    const mediaList1Mock = mocked(tmdbService.getGenreById)

    mediaList1Mock.mockRejectedValueOnce({
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
    const mediaList1Mock = mocked(tmdbService.getGenreById)

    mediaList1Mock.mockRejectedValueOnce({
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
