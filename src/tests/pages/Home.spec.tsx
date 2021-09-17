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
    const netflixResponseMocked = mocked(tmdbService.getNetflixList)
    const trendingsResponseMocked = mocked(tmdbService.getTrendings)
    const actionResponseMocked = mocked(tmdbService.getGenreById)
    const adventureResponseMocked = mocked(tmdbService.getGenreById)
    const comedyResponseMocked = mocked(tmdbService.getGenreById)
    const documentariesResponseMocked = mocked(tmdbService.getGenreById)
    const defaultResponse = {
      data: {
        page: 1,
        results: [...mediaListMock],
        total_pages: 1,
        total_results: 2
      }
    }

    netflixResponseMocked.mockReturnValueOnce({ ...defaultResponse } as any)
    trendingsResponseMocked.mockReturnValueOnce({ ...defaultResponse } as any)
    actionResponseMocked.mockReturnValueOnce({ ...defaultResponse } as any)
    adventureResponseMocked.mockReturnValueOnce({ ...defaultResponse } as any)
    comedyResponseMocked.mockReturnValueOnce({ ...defaultResponse } as any)
    documentariesResponseMocked.mockReturnValueOnce({ ...defaultResponse } as any)

    const response = await getStaticProps({} as any)
    const sections = [
      { title: 'Populares Netflix', movies: [...tvListNormalizedMock] },
      { title: 'Em alta', movies: [...tvListNormalizedMock] },
      { title: 'Ação', movies: [...movieListNormalizedMock] },
      { title: 'Aventura', movies: [...movieListNormalizedMock] },
      { title: 'Comédia', movies: [...movieListNormalizedMock] },
      { title: 'Documentário', movies: [...tvListNormalizedMock] }
    ]

    const sectionIndexAleatory = Math.floor(Math.random() * sections.length)
    const movieIndexAleatory = Math.floor(Math.random() * sections[0].movies.length)
    const featured = sections[sectionIndexAleatory].movies[movieIndexAleatory]

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
        redirect: expect.objectContaining({
          permanent: false,
          destination: '/NotFound'
        })
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
