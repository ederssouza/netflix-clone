import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

interface IPercentageCircleProps {
  value: number
}

export function PercentageCircle ({ value }: IPercentageCircleProps) {
  const [color, setColor] = useState('')

  useEffect(() => {
    let color = 'circularChartGreen'

    if (value < 60) color = 'circularChartRed'
    if (value >= 60 && value < 80) color = 'circularChartOrange'

    setColor(color)
  }, [value])

  return (
    <div className={styles.flexWrapper}>
      <div className={styles.singleChart}>
        <svg viewBox="0 0 36 36" className={`${styles.circularChart} ${styles[color]}`}>
          <path className={styles.circleBg}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path className={styles.circle}
            strokeDasharray={`${value}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className={styles.percentage}>
            {value}%
          </text>
        </svg>
      </div>
    </div>
  )
}
