import { render } from '@testing-library/react'

import GenreType, { getServerSideProps } from '../../pages/genre/[type]'

describe('GenreType page component', () => {
  it('should redirect to home when URL does not have `id` param', async () => {
    const response = await getServerSideProps({} as any)

    render(<GenreType />)

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
