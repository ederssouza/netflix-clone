import { render, screen } from '@testing-library/react'

import Details, { getServerSideProps } from '../../pages/details/[type]/[id]'

jest.mock('../../services/tmdb.ts')

const movie = {
  background: 'https://image.tmdb.org/t/p/original/8s4h9friP6Ci3adRGahHARVd76E.jpg',
  score: 10,
  title: 'Space Jam: Um Novo Legado',
  originalName: 'Space Jam: Um Novo Legado',
  year: '2021',
  country: 'US',
  genres: ['Adventure'],
  runtime: '1h 20m',
  overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non doloremque tempora obcaecati animi asperiores suscipit a! Adipisci sit a, facilis reiciendis illo magnam, officia doloremque debitis delectus hic amet porro.',
  type: 'movie'
}

describe('DetailsById page component', () => {
  it('should render with success', () => {
    render(<Details movie={movie} cast={[]} providers={[]} />)

    const $title = screen.getByText(new RegExp(movie.title))

    expect($title).toBeInTheDocument()
  })

  it('should render movie data when receive `id` URL param', async () => {
    const response = await getServerSideProps({
      params: { type: 'movie', id: 10 }
    } as any)

    render(<Details movie={movie} cast={[]} providers={[]} />)

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
