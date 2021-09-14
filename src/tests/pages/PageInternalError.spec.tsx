import { render, screen } from '@testing-library/react'

import PageInternalError, { getServerSideProps } from '../../pages/internal-error'

describe('PageInternalError page component', () => {
  it('should render with success', () => {
    render(<PageInternalError statusCode={'400'} />)

    expect(screen.getByText('Erro 400')).toBeInTheDocument()
  })

  it('should render status code when receive `code` URL query param', async () => {
    const response = await getServerSideProps({
      query: { code: 500 }
    } as any)

    render(<PageInternalError statusCode={'500'} />)

    expect(screen.getByText('Erro 500')).toBeInTheDocument()
    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          statusCode: 500
        })
      })
    )
  })
})
