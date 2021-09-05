import Head from 'next/head'

import { Header } from '../components/Header'
import { FeaturedMovie } from '../components/FeaturedMovie'
import { MoviesContainer } from '../components/MoviesContainer'
import { MoviesCarousel } from '../components/MoviesCarousel'
import { Footer } from '../components/Footer'

import styles from './home.module.scss'

import { movies } from '../tests/mocks/movies'

export default function Home () {
  return (
    <>
      <Head>
        <title>Início | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <FeaturedMovie movie={movies[0]} />

        <MoviesContainer>
          <MoviesCarousel title="Populares Netflix" movies={movies} />
          <MoviesCarousel title="Em alta" movies={movies} />
          <MoviesCarousel title="Lançamentos" movies={movies} />
          <MoviesCarousel title="Assistir novamente" movies={movies} />
          <MoviesCarousel title="Documentários" movies={movies} />
        </MoviesContainer>

        <Footer />
      </main>
    </>
  )
}
