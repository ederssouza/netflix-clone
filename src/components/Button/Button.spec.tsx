import { render, screen } from '@testing-library/react'
import { Button } from '.'

describe('Button component', () => {
  it('should render with success', () => {
    render(<Button>Primary</Button>)
    expect(screen.getByText('Primary')).toBeInTheDocument()
  })
})
