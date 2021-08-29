import { IoSearch } from 'react-icons/io5'

import styles from './styles.module.scss'

export function SearchBox () {
  return (
    <div className={styles.container}>
      <label htmlFor="input-search">Pesquisar por titulo, gente ou gêneros</label>
      <IoSearch />
      <input type="search" id="input-search" placeholder="Titulo, gente e gêneros" />
    </div>
  )
}
