import { render, screen } from '@testing-library/react'
import Details, { getServerSideProps } from '../../pages/details/[id]'

const movie = {
  id: '10',
  title: 'Matrix',
  releaseDate: '2010-10-31',
  genres: [
    { id: 28, name: 'Ação' },
    { id: 53, name: 'Thriller' }
  ],
  runtime: 42
}

describe('DetailsById page component', () => {
  it('should render with success', () => {
    render(<Details movie={movie} />)

    const $title = screen.getByText(movie.title)
    const $releaseDate = screen.getByText(movie.releaseDate)
    const $genres = screen.getByTestId('details-genres')
    const $genreName = screen.getByText(movie.genres[1].name)
    const $runtime = screen.getByText(movie.runtime)

    expect($title).toBeInTheDocument()
    expect($releaseDate).toBeInTheDocument()
    expect($genres.querySelectorAll('li').length).toEqual(movie.genres.length)
    expect($genreName).toBeInTheDocument()
    expect($runtime).toBeInTheDocument()
  })

  it('should render movie data when receive `id` URL param', async () => {
    const response = await getServerSideProps({
      params: { id: 10 }
    } as any)

    render(<Details movie={movie} />)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          movie: expect.objectContaining({
            ...movie
          })
        })
      })
    )
  })
})
