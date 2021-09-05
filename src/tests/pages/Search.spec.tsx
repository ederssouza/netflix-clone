import { render, screen } from '@testing-library/react'
import Search, { getServerSideProps } from '../../pages/search'

jest.mock('next/router')

describe('Search page component', () => {
  it('should render with success', async () => {
    render(<Search q="search term" />)
    expect(screen.getByText(/search term/)).toBeInTheDocument()
  })

  it('should render `a` prop when has URL contains query param', async () => {
    const response = await getServerSideProps({
      query: {
        q: 'search term'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: expect.objectContaining({
          q: 'search term'
        })
      })
    )
  })

  it('should redirect whe dont receive `q` query param', async () => {
    const response = await getServerSideProps({
      query: {}
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )

    render(<Search />)
  })
})
