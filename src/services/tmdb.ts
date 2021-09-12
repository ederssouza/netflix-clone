import axios from 'axios'

interface IGetById {
  type: string
  id: string
}

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'pt-BR'
  }
})

export const TMDB_BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original'

export const tmdbService = {
  getDetailsById ({ type, id }: IGetById) {
    return axiosInstance.get(`/${type}/${id}`)
  },

  getCreditsById ({ type, id }: IGetById) {
    return axiosInstance.get(`/${type}/${id}/credits`)
  },

  getWatchProvidersById ({ type, id }: IGetById) {
    return axiosInstance.get(`/${type}/${id}/watch/providers`)
  }
}
