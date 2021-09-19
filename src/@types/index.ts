export interface IFeaturedMedia {
  id: number
  media_type: string
  title: string
  overview?: string
  backdrop_path: {
    w300: string
    w780: string
    w1280: string
    original: string
  }
}

export interface IGenres {
  id: number
  name: string
}

export interface IMedia {
  id: number
  media_type: string
  title: string
  overview?: string
  backdrop_path: {
    w300: string
    w780: string
    w1280: string
    original: string
  }
  vote_average: number
  release_date: string
  original_language: string
  runtime?: number | null
  genres: IGenres[]
}

export interface IProvider {
  provider_id?: number,
  provider_name?: string
  logo_path?: string
}

export interface ICast {
  id: number
  name: string
}
