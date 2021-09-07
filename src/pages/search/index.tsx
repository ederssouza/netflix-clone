import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { Header } from '../../components/Header'
// import { MoviesCarouselCard } from '../../components/MoviesCarousel/MoviesCarouselCard'
import { CardsSkeletonLoader } from '../../components/CardsSkeletonLoader'

import styles from './styles.module.scss'

// import { movies } from '../../tests/mocks/movies'

interface ISearchProps {
  q?: string
}

export default function Search ({ q }: ISearchProps) {
  return (
    <>
      <Head>
        <title>Busca | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <h1>Buscar por: {q}</h1>

        {/* TODO: loader status */}
        <div>
          <CardsSkeletonLoader />
          <CardsSkeletonLoader />
          <CardsSkeletonLoader />
          <CardsSkeletonLoader />
        </div>

        {/* TODO: success status */}
        {/* <div className={styles.grid}>
          {movies.map(movie => <MoviesCarouselCard key={movie.id} movie={movie} />)}
        </div> */}
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query?.q) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      q: query.q
    }
  }
}
