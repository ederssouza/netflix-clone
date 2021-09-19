import { render, screen } from '@testing-library/react'
import { IoMdPlay } from 'react-icons/io'

import { Button } from '.'

describe('Button component', () => {
  it('should render with success', () => {
    render(<Button>Primary button</Button>)

    const component = screen.getByText('Primary button')

    expect(component).toBeInTheDocument()
    expect(component).toHaveClass('buttonPrimary')
  })

  it('should render `buttonPrimary` CSS class when not receive `color` prop', () => {
    render(<Button>Primary button</Button>)

    const component = screen.getByText('Primary button')

    expect(component).toHaveClass('buttonPrimary')
  })

  it('should render `buttonSecondary` CSS class when receive `color="secondary"` prop', () => {
    render(
      <Button color="secondary">
        Secondary button
      </Button>
    )

    const component = screen.getByText('Secondary button')

    expect(component).toHaveClass('buttonSecondary')
  })

  it('should render button with an icon component when receiving `icon` prop', () => {
    const { container } = render(
      <Button icon={<IoMdPlay />}>
        Play movie
      </Button>
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
