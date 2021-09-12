import Head from 'next/head'

import { FeaturedMovie } from '../components/FeaturedMovie'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { MoviesCarousel } from '../components/MoviesCarousel'
import { MoviesContainer } from '../components/MoviesContainer'
import { movies } from '../tests/mocks/tmdb'
import styles from './home.module.scss'

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
