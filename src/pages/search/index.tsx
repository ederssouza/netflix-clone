import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { IMovie } from '../../@types'
import { CardsSkeletonLoader } from '../../components/CardsSkeletonLoader'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { MoviesCarouselCard } from '../../components/MoviesCarousel/MoviesCarouselCard'
import { api } from '../../services/api'
import { normalizeMoviePayload } from '../../utils/functions'
import styles from './styles.module.scss'

interface ISearchProps {
  q?: string
}

export default function Search ({ q }: ISearchProps) {
  const [movies, setMovies] = useState([])
  const [statusRequest, setStatusRequest] = useState('loading')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatusRequest('loading')

        const res = await api.search({ query: String(q), page: 1 })
        const movies = res.data.results.map((movie: IMovie) => normalizeMoviePayload(movie))

        setMovies(movies)
        setTimeout(() => setStatusRequest('success'), 500)
      } catch (error) {
        setStatusRequest('error')
      }
    }

    fetchData()
  }, [q])

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

        {statusRequest === 'loading' && (
          <div>
            <CardsSkeletonLoader />
            <CardsSkeletonLoader />
            <CardsSkeletonLoader />
            <CardsSkeletonLoader />
          </div>
        )}

        {statusRequest === 'error' && (
          <div>
            <h1>Ocorreu um erro</h1>
          </div>
        )}

        {statusRequest === 'success' && (
          <div className={styles.grid}>
            {movies.map(movie => <MoviesCarouselCard key={movie.id} movie={movie} />)}
          </div>
        )}
      </main>

      <Footer />
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
