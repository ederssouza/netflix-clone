import { render, screen, fireEvent } from '@testing-library/react'
import { MoviesCarouselArrow } from '.'

describe('MoviesCarouselArrow component', () => {
  it('should render with success', () => {
    const { container } = render(
      <MoviesCarouselArrow
        orientation="left"
        handleClick={() => {}}
      />
    )

    const $arrowButton = screen.getByTestId('button-prev-movies')
    expect($arrowButton).toHaveClass('prevButton')
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('should render with next icon SVG', () => {
    const { container } = render(
      <MoviesCarouselArrow
        orientation="right"
        handleClick={() => {}}
      />
    )

    const $arrowButton = screen.getByTestId('button-next-movies')
    expect($arrowButton).toHaveClass('nextButton')
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('should be hidden when receive `visible={false}` prop', () => {
    const handleClickMock = jest.fn()

    render(
      <MoviesCarouselArrow
        orientation="right"
        visible={false}
        handleClick={() => handleClickMock()}
      />
    )

    const $arrowButton = screen.getByTestId('button-next-movies')

    expect($arrowButton).not.toBeVisible()
  })

  it('should execute a function on click', () => {
    const handleClickMock = jest.fn()

    render(
      <MoviesCarouselArrow
        orientation="right"
        handleClick={() => handleClickMock()}
      />
    )

    const $arrowButton = screen.getByTestId('button-next-movies')
    fireEvent.click($arrowButton)

    expect(handleClickMock).toHaveBeenCalled()
  })
})
