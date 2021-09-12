import { render } from '@testing-library/react'

import Genre, { getServerSideProps } from '../../pages/genre'

describe('Genre page component', () => {
  it('should redirect to home when URL does not have `id` param', async () => {
    const response = await getServerSideProps({} as any)

    render(<Genre />)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
          permanent: true
        })
      })
    )
  })
})
