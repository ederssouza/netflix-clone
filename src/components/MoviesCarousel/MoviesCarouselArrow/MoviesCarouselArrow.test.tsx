import { fireEvent, render, screen } from '@testing-library/react'

import { MoviesCarouselArrow } from '.'

describe('MoviesCarouselArrow component', () => {
  it('should render left arrow with success', () => {
    render(<MoviesCarouselArrow direction="left" />)
    const $moviesCarouselArrow = screen.getByTestId('movies-carousel-arrow')
    expect($moviesCarouselArrow).toHaveClass('carouselArrowLeft')
    expect($moviesCarouselArrow).not.toHaveClass('carouselArrow-hidden')
    expect($moviesCarouselArrow.querySelector('svg')).toBeInTheDocument()
  })

  it('should render with `carouselArrow-hidden` CSS class when receive `firstLoad` prop', () => {
    render(<MoviesCarouselArrow direction="left" firstLoad />)
    const $moviesCarouselArrow = screen.getByTestId('movies-carousel-arrow')
    expect($moviesCarouselArrow).toHaveClass('carouselArrow-hidden')
    expect($moviesCarouselArrow.querySelector('svg')).not.toBeInTheDocument()
  })

  it('should call `onClick` function when on click left arrow', () => {
    const onClick = jest.fn()

    render(
      <MoviesCarouselArrow
        direction="left"
        firstLoad={false}
        onClick={onClick}
      />
    )

    const $moviesCarouselArrow = screen.getByTestId('movies-carousel-arrow')

    fireEvent.click($moviesCarouselArrow)
    expect(onClick).toBeCalledTimes(1)
  })

  it('should render right arrow with success', () => {
    render(<MoviesCarouselArrow direction="right" />)
    const $moviesCarouselArrow = screen.getByTestId('movies-carousel-arrow')
    expect($moviesCarouselArrow).toHaveClass('carouselArrowRight')
  })

  it('should call `onClick` function when on click right arrow', () => {
    const onClick = jest.fn()

    render(
      <MoviesCarouselArrow
        direction="right"
        onClick={onClick}
      />
    )

    const $moviesCarouselArrow = screen.getByTestId('movies-carousel-arrow')

    fireEvent.click($moviesCarouselArrow)

    expect(onClick).toBeCalledTimes(1)
  })
})
