import { render, screen } from '@testing-library/react'

import PageNotFound from '../../pages/404'

describe('PageNotFound page component', () => {
  it('should render with success', () => {
    render(<PageNotFound />)

    expect(screen.getByText('Você se perdeu?')).toBeInTheDocument()
  })
})
