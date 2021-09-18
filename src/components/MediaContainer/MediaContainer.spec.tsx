import { act, render } from '@testing-library/react'

import { MediaContainer } from '.'

describe('MediaContainer component', () => {
  it('should render left arrow with success', () => {
    jest.useFakeTimers()

    render(
      <MediaContainer>
        <div>content...</div>
      </MediaContainer>
    )

    act(() => jest.advanceTimersByTime(1000))
  })
})
