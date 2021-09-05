import { useRouter } from 'next/router'
import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Search from '../../pages/search'

jest.mock('next/router')

describe('Search page component', () => {
  it('should render with success', () => {
    const useRouterMocked = mocked(useRouter)

    useRouterMocked.mockReturnValueOnce({
      query: { q: 'search term' }
    } as any)

    render(<Search />)
    expect(screen.getByText(/search term/)).toBeInTheDocument()
  })
})
