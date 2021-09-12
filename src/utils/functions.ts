export function timeConvert (num: number) {
  if (!num) return

  const hours = Math.floor(num / 60)
  const minutes = num % 60
  const hoursStr = hours ? `${hours}h ` : ''
  const minutesStr = minutes ? `${minutes}m ` : ''
  return hoursStr + minutesStr
}

export function isValidArray (value: any) {
  return Array.isArray(value) && value.length
}

export function normalizeMoviePayload (data: any) {
  if (!data) return

  const release_date = data?.release_date || data?.first_air_date
  const original_language = data?.original_language || (data?.episode_run_time?.length ? data?.episode_run_time[0] : null)
  const runtime = data?.runtime || (data?.episode_run_time?.length ? data?.episode_run_time[0] : null)

  return {
    title: data?.title || data?.name,
    overview: data?.overview,
    backdrop_path: data?.backdrop_path,
    vote_average: data?.vote_average,
    release_date: release_date ? new Date(release_date).getFullYear() : null,
    original_language: original_language?.toUpperCase(),
    runtime: timeConvert(runtime),
    genres: data?.genres
  }
}
