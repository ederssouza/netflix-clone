import { fireEvent, render, screen } from '@testing-library/react'

import { MediaCarouselArrow } from '.'

describe('MediaCarouselArrow component', () => {
  it('should render left arrow with success', () => {
    render(<MediaCarouselArrow direction="left" />)

    const $mediaCarouselArrow = screen.getByTestId('carousel-arrow')

    expect($mediaCarouselArrow).toHaveClass('carouselArrowLeft')
    expect($mediaCarouselArrow).not.toHaveClass('carouselArrow-hidden')
    expect($mediaCarouselArrow.querySelector('svg')).toBeInTheDocument()
  })

  it('should render with `carouselArrow-hidden` CSS class when receive `firstLoad` prop', () => {
    render(<MediaCarouselArrow direction="left" firstLoad />)

    const $mediaCarouselArrow = screen.getByTestId('carousel-arrow')

    expect($mediaCarouselArrow).toHaveClass('carouselArrow-hidden')
    expect($mediaCarouselArrow.querySelector('svg')).not.toBeInTheDocument()
  })

  it('should call `onClick` function when on click left arrow', () => {
    const onClick = jest.fn()

    render(
      <MediaCarouselArrow
        direction="left"
        firstLoad={false}
        onClick={onClick}
      />
    )

    const $mediaCarouselArrow = screen.getByTestId('carousel-arrow')

    fireEvent.click($mediaCarouselArrow)

    expect(onClick).toBeCalledTimes(1)
  })

  it('should render right arrow with success', () => {
    render(<MediaCarouselArrow direction="right" />)

    const $mediaCarouselArrow = screen.getByTestId('carousel-arrow')

    expect($mediaCarouselArrow).toHaveClass('carouselArrowRight')
  })

  it('should call `onClick` function when on click right arrow', () => {
    const onClick = jest.fn()

    render(
      <MediaCarouselArrow
        direction="right"
        onClick={onClick}
      />
    )

    const $mediaCarouselArrow = screen.getByTestId('carousel-arrow')

    fireEvent.click($mediaCarouselArrow)

    expect(onClick).toBeCalledTimes(1)
  })
})
