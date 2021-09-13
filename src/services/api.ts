import axios from 'axios'

interface IGetById {
  type: string
  id: string
}

interface ISearch {
  query: string
  page?: number
}

export const axiosInstance = axios.create({
  baseURL: '/api/tmdb'
})

export const api = {
  getDetailsById ({ type, id }: IGetById) {
    return axiosInstance.get(`/details/${type}/${id}`)
  },

  getCreditsById ({ type, id }: IGetById) {
    return axiosInstance.get(`/credits/${type}/${id}`)
  },

  getWatchProvidersById ({ type, id }: IGetById) {
    return axiosInstance.get(`/providers/${type}/${id}`)
  },

  search ({ query, page = 1 }: ISearch) {
    return axiosInstance.get('/search', {
      params: { query, page }
    })
  }
}
