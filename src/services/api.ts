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
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/tmdb`
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
  },

  getGenres ({ type }: IGenres) {},

  getTopRated ({ type, page = 1 }: ITopRated) {},

  getTrendings () {},

  getGenreById ({ type, id, page = 1 }: IGenreById) {
    return axiosInstance.get(`/genre/${type}/${id}`, {
      params: {
        page: Number(page)
      }
    })
  },

  getNetflixList ({ page = 1 }: INetflixList) {}
}
