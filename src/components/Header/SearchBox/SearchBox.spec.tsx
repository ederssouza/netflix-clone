import { render, screen, fireEvent, act } from '@testing-library/react'
import Router, { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'

import { SearchBox } from '.'

jest.mock('next/router')

describe('SearchBox component', () => {
  it('should render with success', () => {
    render(<SearchBox />)

    const $inputSearch = screen.getByTestId('input-search') as HTMLInputElement

    fireEvent.change($inputSearch)

    expect($inputSearch).toBeInTheDocument()
  })

  it('should open search box when on click', () => {
    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')

    fireEvent.click($searchBox)

    expect($searchBox).toHaveClass('searchBoxOpen')
  })

  it('should clear input field when on click close icon', () => {
    render(<SearchBox />)

    const $inputSearch = screen.getByTestId('input-search') as HTMLInputElement
    const $closeSearchBox = screen.getByTestId('close-search-box')

    fireEvent.change($inputSearch, { target: { value: 'Matrix' } })
    expect($inputSearch.value).toEqual('Matrix')

    fireEvent.click($closeSearchBox)
    expect($inputSearch.value).toEqual('')
  })

  it('should keep open on blur if value is valid', () => {
    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')
    const $inputSearch = screen.getByTestId('input-search') as HTMLInputElement

    fireEvent.click($searchBox)
    fireEvent.change($inputSearch, { target: { value: 'Matrix' } })
    expect($inputSearch.value).toEqual('Matrix')

    fireEvent.blur($inputSearch)

    expect($searchBox).toHaveClass('searchBoxOpen')
  })

  it('should auto close on blur if value is empty', () => {
    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')
    const $inputSearch = screen.getByTestId('input-search') as HTMLInputElement

    fireEvent.click($searchBox)
    fireEvent.change($inputSearch, { target: { value: 'Matrix' } })
    expect($inputSearch.value).toEqual('Matrix')

    fireEvent.change($inputSearch, { target: { value: '' } })
    expect($inputSearch.value).toEqual('')

    fireEvent.blur($inputSearch)

    expect($searchBox).not.toHaveClass('searchBoxOpen')
  })

  it('should redirect to search page when is valid value', () => {
    jest.useFakeTimers()

    render(<SearchBox />)

    const $inputSearch = screen.getByTestId('input-search') as HTMLInputElement

    expect($inputSearch.value).toEqual('')
    fireEvent.change($inputSearch, { target: { value: 'Matrix' } })
    expect($inputSearch.value).toEqual('Matrix')

    act(() => jest.advanceTimersByTime(2000))

    expect(Router.push).toHaveBeenCalledWith('/search?q=Matrix')
  })

  it('should open search box when has URL contains query param', () => {
    const useRouterMocked = mocked(useRouter)

    useRouterMocked.mockReturnValueOnce({
      query: { q: 'search term' }
    } as any)

    render(<SearchBox />)

    const $searchBox = screen.getByTestId('search-box')

    expect($searchBox).toHaveClass('searchBoxOpen')
  })
})
