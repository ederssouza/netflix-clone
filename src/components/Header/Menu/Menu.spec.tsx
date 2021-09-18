import { render, screen, fireEvent } from '@testing-library/react'

import { Menu } from '.'

const menuItems = [
  { href: '/', title: 'Home' },
  { href: '/genre/1', title: 'Movies' }
]

jest.mock('next/router', () => {
  return {
    useRouter () {
      return {
        asPath: '/genre/1'
      }
    }
  }
})

describe('Menu component', () => {
  it('should render with success', () => {
    render(<Menu items={menuItems} />)

    const $menu = screen.getByTestId('menu')

    expect(screen.getByTitle('Navegar')).toBeInTheDocument()
    expect($menu.querySelectorAll('button ul li').length).toEqual(menuItems.length)
  })

  it('should render with valid href attribute', () => {
    render(<Menu items={menuItems} />)

    const $menu = screen.getByTestId('menu')
    const getMenuItem = (index: number) => $menu.querySelectorAll('ul li a')[index]

    expect(getMenuItem(0)).toHaveAttribute('href', menuItems[0].href)
    expect(getMenuItem(1)).toHaveAttribute('href', menuItems[1].href)
  })

  it('should have an active link when href equals asPath', () => {
    const { container } = render(<Menu items={menuItems} />)
    const $menu = screen.getByTestId('menu')
    const getMenuItem = (index: number) => $menu.querySelectorAll('ul li')[index]

    fireEvent.click(document)
    fireEvent.click(container.querySelector('.menuMobile'))
    fireEvent.click(container.querySelector('.menuMobileOpen'))

    expect(getMenuItem(0)).not.toHaveClass('menuItemsActiveItem')
    expect(getMenuItem(1)).toHaveClass('menuItemsActiveItem')
  })
})
