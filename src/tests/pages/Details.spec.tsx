import { render } from '@testing-library/react'

import Details, { getServerSideProps } from '../../pages/details'

describe('Details page component', () => {
  it('should redirect to home when URL does not have `id` param', async () => {
    const response = await getServerSideProps({} as any)

    render(<Details />)

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
