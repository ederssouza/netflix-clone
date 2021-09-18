import Link from 'next/link'

import styles from './styles.module.scss'

interface IItems {
  id: number
  name: string
}

interface ISidebarBoxItemProps {
  items: IItems[]
  mediaType?: string
}

export function SidebarBoxItem ({ items, mediaType }: ISidebarBoxItemProps) {
  return (
      <>
        {items.map((item, index, arr) => {
          const comma = index + 1 < arr.length ? ', ' : ''

          return (
            <span className={styles.sidebarBoxItem} key={item.id}>
              {mediaType
                ? <Link href={`/genre/${mediaType}/${item.id}`}>{item.name}</Link>
                : item.name
              }
              {comma}
            </span>
          )
        })}
      </>
  )
}
