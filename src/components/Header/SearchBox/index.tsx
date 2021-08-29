import { IoSearch } from 'react-icons/io5'

import styles from './styles.module.scss'

export function SearchBox () {
  return (
    <label className={styles.container}>
      <IoSearch />
      <input type="search" placeholder="Titulo, gente e gêneros" />
    </label>
  )
}
