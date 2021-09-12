import { TMDB_BASE_URL_IMAGE } from '../services/tmdb'

export function timeConvert (num: number) {
  if (!num) return

  const hours = Math.floor(num / 60)
  const minutes = num % 60
  const hoursStr = hours ? `${hours}h` : ''
  const minutesStr = minutes ? ` ${minutes}m` : ''
  return hoursStr + minutesStr
}

export function isValidArray (value: any) {
  return Array.isArray(value) && value.length
}

export function normalizeMoviePayload (data: any) {
  if (!data) return {}

  const renderURIImage = (size = 'original') => data?.backdrop_path
    ? `${TMDB_BASE_URL_IMAGE}/${size}${data.backdrop_path}`
    : '/assets/img/banner.jpeg'

  const release_date = data?.release_date || data?.first_air_date
  const original_language = data?.original_language || (data?.episode_run_time?.length ? data?.episode_run_time[0] : null)
  const runtime = data?.runtime || (data?.episode_run_time?.length ? data?.episode_run_time[0] : null)

  return {
    id: data?.id,
    media_type: data?.media_type,
    title: data?.title || data?.name,
    overview: data?.overview || 'Nenhum resumo disponível',
    backdrop_path: {
      w300: renderURIImage('w300'),
      w780: renderURIImage('w780'),
      w1280: renderURIImage('w1280'),
      original: renderURIImage('original')
    },
    vote_average: data?.vote_average,
    release_date: release_date ? new Date(release_date).getFullYear() : null,
    original_language: original_language?.toUpperCase(),
    runtime: timeConvert(runtime),
    genres: data?.genres
  }
}
