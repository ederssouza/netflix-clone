import { fireEvent, render, screen } from '@testing-library/react'

import { SidebarBox } from '.'
import { genresMock } from '../../../tests/mocks/tmdb'

describe('SidebarBox component', () => {
  it('should render list item without link', () => {
    render(<SidebarBox title="Adventure" items={genresMock.slice(0, 3)} />)
  })

  it('should show more items when click on "show more" link', () => {
    render(<SidebarBox title="Adventure" mediaType="drama" items={genresMock} />)

    const $sidebarBoxShowMore = screen.getByTestId('sidebar-box-show-more')

    fireEvent.click($sidebarBoxShowMore)
  })

  it('should show less items when click on "show less" link', () => {
    render(<SidebarBox title="Adventure" mediaType="drama" items={genresMock} />)

    const $sidebarBoxShowMore = screen.getByTestId('sidebar-box-show-more')

    fireEvent.click($sidebarBoxShowMore)
    fireEvent.click($sidebarBoxShowMore)
  })
})
