import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

interface IProgressChartProps {
  value: number
}

export function ProgressChart ({ value }: IProgressChartProps) {
  const [color, setColor] = useState('')

  useEffect(() => {
    let color = 'progressChartGreen'

    if (value < 60) color = 'progressChartRed'
    if (value >= 60 && value < 70) color = 'progressChartOrange'

    setColor(color)
  }, [value])

  return (
    <div className={styles.progressChartWrapper}>
      <div className={styles.progressChartSingleChart}>
        <svg
          className={`${styles.circularChart} ${styles[color]}`}
          viewBox="0 0 36 36"
        >
          <path
            className={styles.progressChartCircleBg}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />

          <path
            className={styles.progressChartCircle}
            strokeDasharray={`${value}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />

          <text
            className={styles.progressChartPercentage}
            x="18"
            y="20.35"
          >
            {value}%
          </text>
        </svg>
      </div>
    </div>
  )
}
