import styles from './styles.module.scss'

interface ICardsSkeletonLoaderProps {
  title?: boolean
  items?: number
}

export function CardsSkeletonLoader ({ title = false, items = 6 }: ICardsSkeletonLoaderProps) {
  return (
    <div>
      <div className={styles.cardsSkeleton}>
        {title && <div className={styles.cardsSkeletonTitle} />}
        <div className={styles.cardsSkeletonGrid}>
          {Array.from({ length: items }).map((_, index) => <div key={index + 1} />)}
        </div>
      </div>
    </div>
  )
}
