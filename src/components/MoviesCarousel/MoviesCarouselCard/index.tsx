export interface IMovie {
  id: number
  title: string
  image: string
}

interface IMovieProps {
  movie: IMovie
}

export function MoviesCarouselCard ({ movie }: IMovieProps) {
  return (
    <div style={{ margin: '0 2px', borderRadius: 4, overflow: 'hidden' }}>
      <img src={movie.image} alt={movie.title} />
    </div>
  )
}
