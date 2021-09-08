import { render, screen } from '@testing-library/react'

import { CardsSkeletonLoader } from '.'

describe('CardsSkeletonLoader component', () => {
  it('should render 4 cards when receive `items={4}` prop', () => {
    render(<CardsSkeletonLoader items={4} />)

    const $cardsSkeletonLoader = screen.getByTestId('cards-skeleton-loader')
    const $cardsSkeletonColumns = $cardsSkeletonLoader.querySelectorAll('.cardsSkeletonGrid div')

    expect($cardsSkeletonColumns.length).toEqual(4)
  })

  it('should render with title `title` prop', () => {
    render(<CardsSkeletonLoader title items={4} />)

    const $cardsSkeletonLoader = screen.getByTestId('cards-skeleton-loader')
    const $cardsSkeletonTitle = $cardsSkeletonLoader.querySelector('.cardsSkeletonTitle')

    expect($cardsSkeletonTitle).toHaveClass('cardsSkeletonTitle')
  })
})
