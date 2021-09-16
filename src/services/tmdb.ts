import axios from 'axios'

interface IGetById {
  type: string
  id: string
}

interface ISearch {
  query: string
  page?: number
}

interface IGenres {
  type: string
}

interface ITopRated {
  type: string
  page?: number
}

interface IGenreById {
  type: string
  id: string
  page?: number
}

interface INetflixList {
  page?: number
}

const defaultParams = {
  api_key: process.env.TMDB_API_KEY,
  language: 'pt-BR'
}

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    ...defaultParams
  }
})

export const TMDB_BASE_URL_IMAGE = 'https://image.tmdb.org/t/p'

export const tmdbService = {
  getDetailsById ({ type, id }: IGetById) {
    return axiosInstance.get(`/${type}/${id}`)
  },

  getCreditsById ({ type, id }: IGetById) {
    return axiosInstance.get(`/${type}/${id}/credits`)
  },

  getWatchProvidersById ({ type, id }: IGetById) {
    return axiosInstance.get(`/${type}/${id}/watch/providers`)
  },

  search ({ query, page = 1 }: ISearch) {
    return axiosInstance.get('/search/multi', {
      params: {
        ...defaultParams,
        query,
        include_adult: false,
        page: Number(page)
      }
    })
  },

  getGenres ({ type }: IGenres) {
    return axiosInstance.get(`/genre/${type}/list`)
  },

  getTopRated ({ type, page = 1 }: ITopRated) {
    return axiosInstance.get(`/${type}/top_rated`, {
      params: {
        ...defaultParams,
        page: Number(page)
      }
    })
  },

  getTrendings () {
    return axiosInstance.get('/trending/all/week')
  },

  getGenreById ({ type, id, page = 1 }: IGenreById) {
    return axiosInstance.get(`/discover/${type}`, {
      params: {
        ...defaultParams,
        with_genres: id,
        page: Number(page)
      }
    })
  },

  getNetflixList ({ page = 1 }: INetflixList) {
    return axiosInstance.get('/discover/tv', {
      params: {
        ...defaultParams,
        with_network: 213,
        page: Number(page)
      }
    })
  }
}
