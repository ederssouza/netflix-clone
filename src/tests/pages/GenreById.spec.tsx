import { render, screen } from '@testing-library/react'
import Genre, { getServerSideProps } from '../../pages/genre/[id]'

describe('GenreById page component', () => {
  it('should render with success', () => {
    render(<Genre id={'10'} />)
    expect(screen.getByText('Gênero 10')).toBeInTheDocument()
  })

  it('should get URL ID param', async () => {
    render(<Genre id={'8'} />)

    const response = await getServerSideProps({
      params: { id: '8' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          id: '8'
        })
      })
    )
  })
})
