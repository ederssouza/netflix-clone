import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBox } from '.'

describe('SearchBox component', () => {
  it('should render with success', () => {
    render(<SearchBox />)

    expect(screen.getByTestId('search-box')).toBeInTheDocument()
  })

  it('should open when on click', () => {
    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')

    fireEvent.click($searchBox)

    expect($searchBox).toHaveClass('containerOpen')
  })

  it('should keep input open when has value', () => {
    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')
    const $input = $searchBox.querySelector('input')

    fireEvent.click($searchBox)
    fireEvent.change($input, { target: { value: 'Matrix' } })
    fireEvent.blur($input)

    expect($searchBox).toHaveClass('containerOpen')
  })

  it('should close input when has not value', () => {
    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')
    const $input = $searchBox.querySelector('input')

    fireEvent.click($searchBox)
    fireEvent.change($input, { target: { value: '' } })
    fireEvent.blur($input)

    expect($searchBox).not.toHaveClass('containerOpen')
  })

  it('should reset input and keep open when on click in the close icon', () => {
    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')
    const $input = $searchBox.querySelector('input')
    const $closeIcon = $searchBox.querySelector('.closeIcon')

    fireEvent.click($searchBox)
    fireEvent.change($input, { target: { value: 'Matrix' } })
    fireEvent.click($closeIcon)

    expect($input.value).toEqual('')
    expect($searchBox).toHaveClass('containerOpen')
  })
})
