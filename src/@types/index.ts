export interface IGenres {
  id: number
  name: string
}

export interface IMovie {
  title: string
  overview: string
  backdrop_path: string
  vote_average: number
  release_date: string
  original_language: string
  runtime: number
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
