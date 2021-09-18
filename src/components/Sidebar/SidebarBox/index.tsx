import Link from 'next/link'

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
  return (
    <div className={styles.sidebarBox}>
      {title && <h4 className={styles.sidebarBoxTitle}>{title}</h4>}

      {mediaType
        ? (
        <ul className={styles.sidebarBoxList}>
          {items.map((item, index, arr) => {
            return index + 1 < arr.length
              ? <li key={item.id}> <Link href={`/genre/${mediaType}/${item.id}`}>{item.name}</Link>, </li>
              : <li key={item.id}><Link href={`/genre/${mediaType}/${item.id}`}>{item.name}</Link></li>
          })}
        </ul>
          )
        : (
        <ul className={styles.sidebarBoxList}>
          {items.map((item, index, arr) => {
            return index + 1 < arr.length
              ? <li key={item.id}> {item.name}, </li>
              : <li key={item.id}>{item.name}</li>
          })}
        </ul>
          )}
    </div>
  )
}
