import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [statusRequest, setStatusRequest] = useState('loading')

  const footerRef = useRef<HTMLDivElement | null>(null)
  const prevQueryRef = useRef(null)
  const oldCart = prevQueryRef.current ?? q

  useEffect(() => {
    prevQueryRef.current = q
  })

  useEffect(() => {
    if (oldCart !== q) {
      setCurrentPage(1)
      setMovies([])
    }
  }, [oldCart, q])

  useEffect(() => {
    const fetchData = async () => {
      try {
        currentPage === 1 ? setStatusRequest('loading') : setStatusRequest('loadmore')

        const res = await api.search({ query: String(q), page: currentPage })
        const movies = res.data.results.map((movie: IMovie) => normalizeMoviePayload(movie))

        setMovies((oldMovies) => [...oldMovies, ...movies])
        setHasMore(currentPage <= res.data.total_pages)
        setTimeout(() => setStatusRequest('success'), 500)

        console.log('total', res.data.total_pages)
      } catch (error) {
        setStatusRequest('error')
      }
    }

    fetchData()
  }, [q, currentPage])

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting) && hasMore) {
        setCurrentPage(oldCurrentPage => oldCurrentPage + 1)
      }
    })

    footerRef?.current && intersectionObserver.observe(footerRef.current)
    return () => intersectionObserver.disconnect()
  }, [hasMore])

  return (
    <>
      <Head>
        <title>Busca | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <h1>Buscar por: {q} {currentPage}</h1>

        {(statusRequest === 'success' || statusRequest === 'loadmore') && (
          <div className={styles.grid}>
            {movies.map((movie, index) => <MoviesCarouselCard key={`${movie.id}${index}`} movie={movie} />)}
          </div>
        )}

        {statusRequest === 'error' && (
          <div>
            <h1>Ocorreu um erro</h1>
          </div>
        )}

        {(statusRequest === 'loading' || statusRequest === 'loadmore') && (
          <div>
            <CardsSkeletonLoader />
            <CardsSkeletonLoader />
            <CardsSkeletonLoader />
            <CardsSkeletonLoader />
          </div>
        )}
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>
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
