import { TMDB_BASE_URL_IMAGE } from '../services/tmdb'

const renderURIImage = (backdrop_path: string, size = 'original') => backdrop_path
  ? `${TMDB_BASE_URL_IMAGE}/${size}${backdrop_path}`
  : '/assets/img/banner.jpeg'

export function timeConvert (num: number) {
  if (!num) return null

  const hours = Math.floor(num / 60)
  const minutes = num % 60
  const hoursStr = hours ? `${hours}h` : ''
  const minutesStr = minutes ? ` ${minutes}m` : ''

  return hoursStr + minutesStr
}

export function isValidArray (value: any) {
  return Array.isArray(value) && value.length
}

export function normalizeMediaDetailsPayload (data: any) {
  if (!data) return {}

  const release_date = data?.release_date || data?.first_air_date
  const original_language = data?.original_language || (data?.episode_run_time?.length ? data?.episode_run_time[0] : null)
  const runtime = data?.runtime || (data?.episode_run_time?.length ? data?.episode_run_time[0] : null)

  return {
    id: data?.id,
    media_type: data?.media_type,
    title: data?.title || data?.name,
    overview: data?.overview || null,
    backdrop_path: {
      w300: renderURIImage(data.backdrop_path, 'w300'),
      w780: renderURIImage(data.backdrop_path, 'w780'),
      w1280: renderURIImage(data.backdrop_path, 'w1280'),
      original: renderURIImage(data.backdrop_path, 'original')
    },
    vote_average: data?.vote_average,
    release_date: release_date ? new Date(release_date).getFullYear() : null,
    original_language: original_language?.toUpperCase(),
    runtime: timeConvert(runtime),
    genres: data?.genres || []
  }
}

export function normalizeMediaPayload (data: any) {
  if (!data) return {}

  return {
    id: data?.id,
    title: data?.title || data?.name,
    overview: data?.overview || null,
    backdrop_path: {
      w300: renderURIImage(data.backdrop_path, 'w300'),
      w780: renderURIImage(data.backdrop_path, 'w780'),
      w1280: renderURIImage(data.backdrop_path, 'w1280'),
      original: renderURIImage(data.backdrop_path, 'original')
    },
    media_type: data?.media_type,
    vote_average: data?.vote_average
  }
}

export function normalizeMediaSectionList (arr = [], media_type: 'movie' | 'tv') {
  return isValidArray(arr)
    ? arr.map(item => normalizeMediaPayload({ ...item, media_type: item.media_type || media_type }))
    : []
}
