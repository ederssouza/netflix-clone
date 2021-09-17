import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import { IGenres, IMovie } from '../../../@types'
import { CardsSkeletonLoader } from '../../../components/CardsSkeletonLoader'
import { FeaturedMovie } from '../../../components/FeaturedMovie'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { MoviesCarouselCard } from '../../../components/MoviesCarousel/MoviesCarouselCard'
import { MoviesContainer } from '../../../components/MoviesContainer'
import { useOnScreen } from '../../../hooks/useOnScreen'
import { tmdbService } from '../../../services/tmdb'
import { normalizeMoviePayload } from '../../../utils/functions'
import styles from './styles.module.scss'

interface IGenreByIdProps {
  genre: string
  type: string
  id: string
}

export default function GenreById ({ genre, type, id }: IGenreByIdProps) {
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
        const res = await tmdbService.getGenreById({ type, id, page: currentPage })
        const movies = res.data.results.map((movie: IMovie) => normalizeMoviePayload(movie))

        setMovies((oldMovies) => [...oldMovies, ...movies.slice(0, 18)])
        setHasMore(currentPage <= res.data.total_pages)
        setTimeout(() => setStatusRequest('success'), 500)
      } catch (error) {
        setStatusRequest('error')
      }
    }

    fetchData()
  }, [type, id, currentPage])

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

      <main>
        <Header />

        <div>
          {(statusRequest === 'success' || statusRequest === 'loadmore') && (
            <>
              {movies.length > 0 && (
                <FeaturedMovie
                  genre={genre}
                  movie={{ ...movies[4], media_type: type }}
                />
              )}

              <MoviesContainer>
                <div className={styles.container}>
                  <div className={styles.grid}>
                    {movies.map((movie, index) => (
                      <MoviesCarouselCard
                        key={`${movie.id}${index}`}
                        movie={{ ...movie, media_type: type }}
                      />
                    ))}
                  </div>
                </div>
              </MoviesContainer>
            </>
          )}

          {(statusRequest === 'loading' || statusRequest === 'loadmore') && (
            <div className={styles.container}>
              <CardsSkeletonLoader />
              <CardsSkeletonLoader />
              <CardsSkeletonLoader />
              <CardsSkeletonLoader />
            </div>
          )}
        </div>

        {statusRequest === 'error' && (
          <div className={styles.container}>
            <h1>Ocorreu um erro</h1>
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
  try {
    const { type, id } = params
    const res = await tmdbService.getGenres({ type: String(type) })
    const genres = res?.data?.genres

    if (Array.isArray(genres) && !genres.length) {
      return {
        redirect: {
          destination: '/',
          permanent: true
        }
      }
    }

    const genre = genres.find((genre: IGenres) => {
      return genre.id === Number(id)
    }) as IGenres

    return {
      props: {
        genre: genre.name,
        type,
        id
      }
    }
  } catch (error) {
    const statusCode = error?.response?.status

    if (statusCode === 404) {
      return {
        redirect: {
          permanent: false,
          destination: '/NotFound'
        }
      }
    }

    const destination = statusCode ? `/internal-error?code=${statusCode}` : '/internal-error'

    return {
      redirect: {
        permanent: false,
        destination
      }
    }
  }
}
