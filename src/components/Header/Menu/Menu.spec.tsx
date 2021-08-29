import { render, screen } from '@testing-library/react'
import { Menu } from '.'

const menuItems = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/genre/1',
    title: 'Movies'
  }
]

describe('Menu component', () => {
  it('should render with success', () => {
    render(<Menu items={menuItems} />)

    const $menu = screen.getByTestId('menu')

    expect(screen.getByTitle('Home')).toBeInTheDocument()
    expect(screen.getByTitle('Movies')).toBeInTheDocument()
    expect($menu.querySelectorAll('ul li').length).toEqual(menuItems.length)
  })

  it('should render with valid href attribute', () => {
    render(<Menu items={menuItems} />)

    const $menu = screen.getByTestId('menu')
    const getMenuItem = (index: number) => $menu.querySelectorAll('ul li a')[index]

    expect(getMenuItem(0)).toHaveAttribute('href', menuItems[0].href)
    expect(getMenuItem(1)).toHaveAttribute('href', menuItems[1].href)
  })
})
