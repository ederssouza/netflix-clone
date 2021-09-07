import { render } from '@testing-library/react'
import { PercentageCircle } from '.'

describe('PercentageCircle component', () => {
  it('should render with red color', () => {
    const { container } = render(<PercentageCircle value={20} />)

    expect(container.querySelector('svg')).toHaveClass('circularChartRed')
  })

  it('should render with orange color', () => {
    const { container } = render(<PercentageCircle value={60} />)

    expect(container.querySelector('svg')).toHaveClass('circularChartOrange')
  })

  it('should render with green color', () => {
    const { container } = render(<PercentageCircle value={80} />)

    expect(container.querySelector('svg')).toHaveClass('circularChartGreen')
  })
})
