export function timeConvert (num: number) {
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  const hoursStr = hours ? `${hours}h ` : ''
  const minutesStr = minutes ? `${minutes}m ` : ''
  return hoursStr + minutesStr
}

export function isValidArray (value: any) {
  return Array.isArray(value) && value.length
}

export function formatMoviePayload (data: any) {
  const score = data.vote_average ? data.vote_average * 10 : null
  const date = data.first_air_date || data.release_date
  const year = new Date(date).getFullYear()
  const originCountry = isValidArray(data.origin_country)
    ? data.origin_country[0]
    : null
  const productionCountries = isValidArray(data.production_countries)
    ? data.production_countries[0]?.iso_3166_1
    : null
  const country = originCountry || productionCountries
  const genres = data.genres.map(genre => genre.name)
  const runtime = data.episode_run_time || data.runtime

  return {
    background: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
    score,
    title: data.name || data.title,
    originalName: data.original_name || data.original_title,
    year,
    country,
    genres,
    runtime: timeConvert(runtime),
    overview: data.overview
  }
}
