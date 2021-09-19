import { render } from '@testing-library/react'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'

import { Sidebar } from '.'
import { castMock, genresMock } from '../../tests/mocks/tmdb'

jest.mock('next/router')

describe('Sidebar component', () => {
  it('should not assign mediaType value when `type` URL query param', () => {
    const useRouterMocked = mocked(useRouter)

    useRouterMocked.mockReturnValueOnce({
      query: {}
    } as any)

    render(<Sidebar cast={castMock} genres={genresMock} />)
  })

  it('should assign mediaType value when `type` URL query param', () => {
    const useRouterMocked = mocked(useRouter)

    useRouterMocked.mockReturnValueOnce({
      query: { type: 'movie' }
    } as any)

    render(<Sidebar cast={castMock} genres={genresMock} />)
  })
})
