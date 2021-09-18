import { useEffect, useState } from 'react'

import { SidebarBoxItem } from './SidebarBoxItem'
import styles from './styles.module.scss'

interface IItems {
  id: number
  name: string
}

interface ISidebarBoxProps {
  title?: string
  mediaType?: string
  items: IItems[]
}

export function SidebarBox ({ title, mediaType, items }: ISidebarBoxProps) {
  const [showMore, setShowMore] = useState(true)
  const [list, setList] = useState([])
  const limit = 5

  function handleShowMore () {
    setShowMore(!showMore)
    const list = showMore ? items.slice(0, limit) : items
    setList(list)
  }

  useEffect(() => {
    handleShowMore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.sidebarBox}>
      {title && <h4 className={styles.sidebarBoxTitle}>{title}</h4>}

      {mediaType
        ? <SidebarBoxItem mediaType={mediaType} items={list} />
        : <SidebarBoxItem items={list} />
      }

      {items.length > limit && (
        <a
          className={styles.sidebarBoxListShowMore}
          onClick={handleShowMore}
          data-testid="sidebar-box-show-more"
        >
          {showMore ? '[ver menos -]' : '[ver mais +]'}
        </a>
      )}
    </div>
  )
}
