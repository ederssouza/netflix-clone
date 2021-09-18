import { render } from '@testing-library/react'

import { SidebarBox } from '.'
import { genresMock } from '../../../tests/mocks/tmdb'

describe('SidebarBox component', () => {
  it('should render list item without link', () => {
    render(<SidebarBox title="Adventure" items={genresMock} />)
  })

  it('should render list item with link', () => {
    render(<SidebarBox title="Adventure" mediaType="drama" items={genresMock} />)
  })
})
