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
  id: number
  page?: number
}

interface INetflixList {
  page?: number
}

export const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'pt-BR'
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
        api_key: process.env.TMDB_API_KEY,
        language: 'pt-BR',
        query,
        include_adult: false,
        page: Number(page)
      }
    })
  },

  getGenres ({ type }: IGenres) {
    return axiosInstance.get(`/${type}/top_rated`)
  },

  getTopRated ({ type, page = 1 }: ITopRated) {
    return axiosInstance.get(`/${type}/top_rated`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'pt-BR',
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
        api_key: process.env.TMDB_API_KEY,
        with_genres: id,
        language: 'pt-BR',
        page: Number(page)
      }
    })
  },

  getNetflixList ({ page = 1 }: INetflixList) {
    return axiosInstance.get('/discover/tv', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        with_network: 213,
        language: 'pt-BR',
        page: Number(page)
      }
    })
  }
}
