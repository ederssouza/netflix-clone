import Link from 'next/link'
import { useEffect, useState } from 'react'

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
        ? (
          <>
            {list.map((item, index, arr) => {
              const coma = index + 1 < arr.length ? ', ' : ''

              return (
                <span className={styles.sidebarBoxItem} key={item.id}>
                  <Link href={`/genre/${mediaType}/${item.id}`}>{item.name}</Link>{coma}
                </span>
              )
            })}
          </>
          )
        : (
          <>
          {list.map((item, index, arr) => {
            const coma = index + 1 < arr.length ? ', ' : ''

            return (
              <span className={styles.sidebarBoxItem} key={item.id}>
                {item.name}{coma}
              </span>
            )
          })}
          </>
          )}

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
