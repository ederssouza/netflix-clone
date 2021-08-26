import Head from 'next/head'
import { FeaturedMovie } from '../components/FeaturedMovie'
import { Header } from '../components/Header'
import { MoviesCarousel } from '../components/MoviesCarousel'
import { Footer } from '../components/Footer'
import styles from './home.module.scss'

export default function Home () {
  return (
    <>
      <Head>
        <title>Netflix clone</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <FeaturedMovie />
        <MoviesCarousel />
        <Footer />
      </main>
    </>
  )
}
