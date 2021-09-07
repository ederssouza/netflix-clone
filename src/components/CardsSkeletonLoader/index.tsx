import styles from './styles.module.scss'

interface ICardsSkeletonLoaderProps {
  items?: number
}

export function CardsSkeletonLoader ({ items = 6 }: ICardsSkeletonLoaderProps) {
  return (
    <div>
      <div className={styles.cardsSkeleton}>
        <div className={styles.cardsSkeletonTitle} />
        <div className={styles.cardsSkeletonGrid}>
          {Array.from({ length: items }).map((_, index) => <div key={index + 1} />)}
        </div>
      </div>
    </div>
  )
}
