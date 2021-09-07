import { GetServerSideProps } from 'next'

interface IGenresProps {
  id: number
  name: string
}

interface IMovie {
  title: string
  releaseDate: string
  genres: IGenresProps[]
  runtime: number
}

interface IDetailsProps {
  movie: IMovie
}

export default function DetailsById ({ movie }: IDetailsProps) {
  return (
    <div data-testid="details">
      <header>
        <h1>{movie.title}</h1>
        <div>{movie.releaseDate}</div>
        <ul data-testid="details-genres">
          {movie.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <div>{movie.runtime}</div>
      </header>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params

  // TODO: make request
  const movie = {
    id: String(id),
    title: 'Matrix',
    releaseDate: '2010-10-31',
    genres: [
      { id: 28, name: 'Ação' },
      { id: 53, name: 'Thriller' }
    ],
    runtime: 42
  }

  return {
    props: {
      movie
    }
  }
}
