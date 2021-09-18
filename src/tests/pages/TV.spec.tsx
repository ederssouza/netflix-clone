import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import TV, { getStaticProps } from '../../pages/tv'
import { tmdbService } from '../../services/tmdb'
import { normalizeMediaPayload } from '../../utils/functions'

jest.mock('../../services/tmdb')

const mediaListMock = [
  {
    backdrop_path: '/4N6zEMfZ57zNEQcM8gWeERFupMv.jpg',
    first_air_date: '2021-08-11',
    genre_ids: [16, 10759, 10765],
    id: 91363,
    name: 'What If...?',
    origin_country: ['US'],
    original_language: 'en',
    overview: 'Baseada nos populares quadrinhos homônimos, a produção explorará histórias hipotéticas que poderiam ter mudado completamente o rumo do universo cinematográfico da editora.',
    vote_average: 8.6
  },
  {
    backdrop_path: '/4N6zEMfZ57zNEQcM8gWeERFupMv.jpg',
    first_air_date: '2021-08-11',
    genre_ids: [16, 10759, 10765],
    id: 91364,
    name: 'What If...?',
    origin_country: ['US'],
    original_language: 'en',
    overview: 'Baseada nos populares quadrinhos homônimos, a produção explorará histórias hipotéticas que poderiam ter mudado completamente o rumo do universo cinematográfico da editora.',
    vote_average: 8.6
  }
]

const tvListNormalizedMock = mediaListMock.map(item => normalizeMediaPayload({ ...item, media_type: 'tv' }))

beforeEach(() => {
  const randomMock = jest.spyOn(global.Math, 'random')
  randomMock.mockReturnValue(0)
})

describe('TV page component', () => {
  it('should render with success', async () => {
    const medisList1 = mocked(tmdbService.getGenreById)
    const mediaList2 = mocked(tmdbService.getGenreById)
    const mediaList3 = mocked(tmdbService.getGenreById)
    const mediaList4 = mocked(tmdbService.getGenreById)
    const mediaList5 = mocked(tmdbService.getGenreById)
    const mediaList6 = mocked(tmdbService.getGenreById)
    const defaultResponse = {
      data: {
        page: 1,
        results: [...mediaListMock],
        total_pages: 1,
        total_results: 2
      }
    }

    medisList1.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList2.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList3.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList4.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList5.mockReturnValueOnce({ ...defaultResponse } as any)
    mediaList6.mockReturnValueOnce({ ...defaultResponse } as any)

    const response = await getStaticProps({} as any)
    const sections = [
      { title: 'Ação e Aventura', mediaList: [...tvListNormalizedMock] },
      { title: 'Crime', mediaList: [...tvListNormalizedMock] },
      { title: 'Drama', mediaList: [...tvListNormalizedMock] },
      { title: 'Família', mediaList: [...tvListNormalizedMock] },
      { title: 'Mistério', mediaList: [...tvListNormalizedMock] },
      { title: 'Faroeste', mediaList: [...tvListNormalizedMock] }
    ]

    const sectionIndexAleatory = Math.floor(Math.random() * sections.length)
    const mediaIndexAleatory = Math.floor(Math.random() * sections[0].mediaList.length)
    const featured = sections[sectionIndexAleatory].mediaList[mediaIndexAleatory]

    render(<TV featured={featured} sections={sections} />)

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
    const getNetflixListMocked = mocked(tmdbService.getGenreById)

    getNetflixListMocked.mockRejectedValueOnce({
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
    const getNetflixListMocked = mocked(tmdbService.getGenreById)

    getNetflixListMocked.mockRejectedValueOnce({
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
    const getNetflixListMocked = mocked(tmdbService.getGenreById)

    getNetflixListMocked.mockRejectedValueOnce({
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
