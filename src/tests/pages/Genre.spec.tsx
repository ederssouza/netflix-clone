import { render, screen } from '@testing-library/react'
import Genre, { getServerSideProps } from '../../pages/genre/[id]'

describe('Genre page component', () => {
  it('should render with success', () => {
    render(<Genre id={'10'} />)
    expect(screen.getByText('Genre 10')).toBeInTheDocument()
  })

  it('should get URL ID param', async () => {
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
