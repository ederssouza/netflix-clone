import { render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import Home, { getStaticProps } from '../../pages/index'
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
const movieListNormalizedMock = mediaListMock.map(item => normalizeMediaPayload({ ...item, media_type: 'movie' }))

beforeEach(() => {
  const randomMock = jest.spyOn(global.Math, 'random')
  randomMock.mockReturnValue(0)
})

describe('Home page component', () => {
  it('should render with success', async () => {
    const medisList1 = mocked(tmdbService.getNetflixList)
    const medisList2 = mocked(tmdbService.getTrendings)
    const medisList3 = mocked(tmdbService.getGenreById)
    const medisList4 = mocked(tmdbService.getGenreById)
    const medisList5 = mocked(tmdbService.getGenreById)
    const medisList6 = mocked(tmdbService.getGenreById)
    const defaultResponse = {
      data: {
        page: 1,
        results: [...mediaListMock],
        total_pages: 1,
        total_results: 2
      }
    }

    medisList1.mockReturnValueOnce({ ...defaultResponse } as any)
    medisList2.mockReturnValueOnce({ ...defaultResponse } as any)
    medisList3.mockReturnValueOnce({ ...defaultResponse } as any)
    medisList4.mockReturnValueOnce({ ...defaultResponse } as any)
    medisList5.mockReturnValueOnce({ ...defaultResponse } as any)
    medisList6.mockReturnValueOnce({ ...defaultResponse } as any)

    const response = await getStaticProps({} as any)
    const sections = [
      { title: 'Populares Netflix', mediaList: [...tvListNormalizedMock] },
      { title: 'Em alta', mediaList: [...tvListNormalizedMock] },
      { title: 'Ação', mediaList: [...movieListNormalizedMock] },
      { title: 'Aventura', mediaList: [...movieListNormalizedMock] },
      { title: 'Comédia', mediaList: [...movieListNormalizedMock] },
      { title: 'Documentário', mediaList: [...tvListNormalizedMock] }
    ]

    const sectionIndexAleatory = Math.floor(Math.random() * sections.length)
    const mediaIndexAleatory = Math.floor(Math.random() * sections[0].mediaList.length)
    const featured = sections[sectionIndexAleatory].mediaList[mediaIndexAleatory]

    render(<Home featured={featured} sections={sections} />)

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
    const getNetflixListMocked = mocked(tmdbService.getNetflixList)

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
    const getNetflixListMocked = mocked(tmdbService.getNetflixList)

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
    const getNetflixListMocked = mocked(tmdbService.getNetflixList)

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
