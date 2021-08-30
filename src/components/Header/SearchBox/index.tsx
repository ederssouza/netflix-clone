import { ChangeEvent, useState } from 'react'
import { IoSearch, IoClose } from 'react-icons/io5'

import styles from './styles.module.scss'

export function SearchBox () {
  const [className, setClassName] = useState(styles.container)
  const [search, setSearch] = useState('')

  function handleClick () {
    setClassName(`${styles.container} ${styles.containerOpen}`)
  }

  function handleBlur () {
    !search.trim() && setClassName(styles.container)
  }

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  return (
    <label
      className={className}
      data-testid="search-box"
      onClick={() => handleClick()}
    >
      <IoSearch className={styles.searchIcon} />

      <input
        type="search"
        placeholder="Titulo, gente e gêneros"
        value={search}
        onBlur={() => handleBlur()}
        onChange={(e) => handleChange(e)}
      />

      <IoClose
        className={styles.closeIcon}
        onClick={() => setSearch('')}
      />
    </label>
  )
}
