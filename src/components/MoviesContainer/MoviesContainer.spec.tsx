import { act, render } from '@testing-library/react'

import { MoviesContainer } from '.'

describe('MoviesContainer component', () => {
  it('should render left arrow with success', () => {
    jest.useFakeTimers()

    render(
      <MoviesContainer>
        <div>content...</div>
      </MoviesContainer>
    )

    act(() => jest.advanceTimersByTime(1000))
  })
})
