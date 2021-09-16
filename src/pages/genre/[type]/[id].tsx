import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import { IMovie } from '../../../@types'
import { CardsSkeletonLoader } from '../../../components/CardsSkeletonLoader'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { MoviesCarouselCard } from '../../../components/MoviesCarousel/MoviesCarouselCard'
import { useOnScreen } from '../../../hooks/useOnScreen'
import { api } from '../../../services/api'
import { normalizeMoviePayload } from '../../../utils/functions'
import styles from './styles.module.scss'

interface IGenreProps {
  id: string
}

export default function GenreById ({ id }: IGenreProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [statusRequest, setStatusRequest] = useState('loading')
  const footerRef = useRef<HTMLDivElement | null>(null)
  const { isIntersecting } = useOnScreen(footerRef)

  useEffect(() => {
    const fetchData = async () => {
      try {
        currentPage === 1 ? setStatusRequest('loading') : setStatusRequest('loadmore')

        const res = await api.getGenreById({ type: 'tv', id: 99, page: currentPage })
        const movies = res.data.results.map((movie: IMovie) => normalizeMoviePayload(movie))

        setMovies((oldMovies) => [...oldMovies, ...movies.slice(0, 18)])
        setHasMore(currentPage <= res.data.total_pages)
        setTimeout(() => setStatusRequest('success'), 500)
      } catch (error) {
        setStatusRequest('error')
      }
    }

    fetchData()
  }, [currentPage])

  useEffect(() => {
    if (isIntersecting && hasMore) {
      setCurrentPage(oldCurrentPage => oldCurrentPage + 1)
    }
  }, [isIntersecting, hasMore])

  return (
    <>
      <Head>
        <title>Busca | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <h1>[GENRE_NAME] {currentPage}</h1>

        {(statusRequest === 'success' || statusRequest === 'loadmore') && (
          <div className={styles.grid}>
            {movies.map((movie, index) => <MoviesCarouselCard key={`${movie.id}${index}`} movie={movie} />)}
          </div>
        )}

        {statusRequest === 'error' && (
          <div>
            {/* TODO: create component */}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { type, id } = params
  console.log({ type, id })

  return {
    props: {
      id,
      type
    }
  }
}