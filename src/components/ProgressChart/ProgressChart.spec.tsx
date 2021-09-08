import { render } from '@testing-library/react'

import { ProgressChart } from '.'

describe('ProgressChart component', () => {
  it('should render with red color', () => {
    const { container } = render(<ProgressChart value={20} />)

    expect(container.querySelector('svg')).toHaveClass('progressChartRed')
  })

  it('should render with orange color', () => {
    const { container } = render(<ProgressChart value={60} />)

    expect(container.querySelector('svg')).toHaveClass('progressChartOrange')
  })

  it('should render with green color', () => {
    const { container } = render(<ProgressChart value={80} />)

    expect(container.querySelector('svg')).toHaveClass('progressChartGreen')
  })
})
