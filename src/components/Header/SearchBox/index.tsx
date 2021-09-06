import Router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoSearch, IoClose } from 'react-icons/io5'
import { useDebouncedCallback } from 'use-debounce'

import styles from './styles.module.scss'

export function SearchBox () {
  const [className, setClassName] = useState(styles.container)
  const [search, setSearch] = useState('')
  const debounced = useDebouncedCallback(redirectToSearch, 2000)
  const router = useRouter()

  function handleClick () {
    setClassName(`${styles.container} ${styles.containerOpen}`)
  }

  function handleChange (value: string) {
    setSearch(value)
    debounced(value)
  }

  function redirectToSearch (value: string) {
    const val = value.trim()
    val && Router.push(`/search?q=${value}`)
  }

  function handleBlur () {
    !search.trim() && setClassName(styles.container)
  }

  useEffect(() => {
    const q = router?.query?.q
    if (q) {
      handleClick()
      setSearch(String(q))
    }
  }, [router])

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
        data-testid="input-search"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => handleBlur()}
      />

      <IoClose
        className={styles.closeIcon}
        data-testid="close-search-box"
        onClick={() => setSearch('')}
      />
    </label>
  )
}
