import { act, render, screen } from '@testing-library/react'

import Home from '../../pages/index'

describe('Home page component', () => {
  it('should render with success', () => {
    jest.useFakeTimers()

    render(<Home />)

    act(() => jest.advanceTimersByTime(10))

    expect(screen.getByAltText('Netflix logo')).toBeInTheDocument()
  })
})
