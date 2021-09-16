import { api } from '.'
import { normalizeMoviePayload } from '../../utils/functions'

export async function getHomeLists () {
  try {
    const [netflix, trendings, action, adventure, comedy, documentaries] = await Promise.all([
      api.getNetflixList({ page: 1 }),
      api.getTrendings({ page: 1 }),
      api.getGenreById({ type: 'movie', id: '28', page: 2 }),
      api.getGenreById({ type: 'movie', id: '12', page: 2 }),
      api.getGenreById({ type: 'movie', id: '35', page: 2 }),
      api.getGenreById({ type: 'tv', id: '99', page: 2 })
    ])

    const netflixMovieData = netflix?.data?.results || []
    const trendingsData = trendings?.data?.results || []
    const actionData = action?.data?.results || []
    const adventureData = adventure?.data?.results || []
    const comedyData = comedy?.data?.results || []
    const documentariesData = documentaries?.data?.results || []

    const netflixList = netflixMovieData.map(movie => normalizeMoviePayload({
      ...movie,
      media_type: 'tv',
      genres: []
    }))

    const trendingsList = trendingsData.map(movie => normalizeMoviePayload({
      ...movie,
      genres: []
    }))

    const actionList = actionData.map(movie => normalizeMoviePayload({
      ...movie,
      media_type: 'movie',
      genres: []
    }))

    const adventureList = adventureData.map(movie => normalizeMoviePayload({
      ...movie,
      media_type: 'movie',
      genres: []
    }))

    const comedyList = comedyData.map(movie => normalizeMoviePayload({
      ...movie,
      media_type: 'movie',
      genres: []
    }))

    const documentariesList = documentariesData.map(movie => normalizeMoviePayload({
      ...movie,
      media_type: 'tv',
      genres: []
    }))

    return {
      netflix: [...netflixList],
      trendings: [...trendingsList],
      action: [...actionList],
      adventure: [...adventureList],
      comedy: [...comedyList],
      documentaries: [...documentariesList]
    }
  } catch (error) {
    throw new Error(error)
  }
}
