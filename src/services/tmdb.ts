import axios from 'axios'

export const tmdbService = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.TMDB_API_KEY,
    language: 'pt-BR'
  }
})
