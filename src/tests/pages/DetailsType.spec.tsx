import { render } from '@testing-library/react'

import DetailsType, { getServerSideProps } from '../../pages/details/[type]'

describe('DetailsType page component', () => {
  it('should redirect to home when URL does not have `id` param', async () => {
    const response = await getServerSideProps({} as any)

    render(<DetailsType />)

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
