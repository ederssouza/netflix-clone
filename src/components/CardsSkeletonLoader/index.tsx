import styles from './styles.module.scss'

interface ICardsSkeletonLoaderProps {
  title?: boolean
  items?: number
}

export function CardsSkeletonLoader ({ title = false, items = 6 }: ICardsSkeletonLoaderProps) {
  return (
    <div className={styles.cardsSkeletonContainer}>
      <div
        className={styles.cardsSkeleton}
        data-testid="cards-skeleton-loader"
      >
        {title && <div className={styles.cardsSkeletonTitle} />}
        <div className={styles.cardsSkeletonGrid}>
          {Array.from({ length: items }).map((_, index) => <div key={index + 1} />)}
        </div>
      </div>
    </div>
  )
}
