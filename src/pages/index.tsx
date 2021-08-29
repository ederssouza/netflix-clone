import Head from 'next/head'

import { Header } from '../components/Header'
import { FeaturedMovie } from '../components/FeaturedMovie'
import { MoviesCarousel } from '../components/MoviesCarousel'
import { Footer } from '../components/Footer'

import common from '../styles/common.module.scss'
import styles from './home.module.scss'

export default function Home () {
  const movies = Array.from({ length: 20 }).map((_, index) => {
    return {
      id: index + 1,
      title: 'Movie title',
      image: 'https://occ-0-626-1123.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQ1n7nMsHQU4eAT8s7OtRNBTkRt8KcVP9M0q5ZnZRppX0WwulOFBD6wHx0U4pOga86psNHvwzBvJah7ey3BpIgbMOeE.webp?r=252'
    }
  })

  return (
    <>
      <Head>
        <title>Início | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <FeaturedMovie />

        <div className={common.moviesContainer}>
          <MoviesCarousel title="Populares Netflix" movies={movies} />
          <MoviesCarousel title="Em alta" movies={movies} />
          <MoviesCarousel title="Lançamentos" movies={movies} />
          <MoviesCarousel title="Assistir novamente" movies={movies} />
          <MoviesCarousel title="Documentários" movies={movies} />
        </div>

        <Footer />
      </main>
    </>
  )
}
