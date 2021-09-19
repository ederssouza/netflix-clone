import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import { IGenres, IMedia } from '../../../@types'
import { CardsSkeletonLoader } from '../../../components/CardsSkeletonLoader'
import { EmptyState } from '../../../components/EmptyState'
import { FeaturedMedia } from '../../../components/FeaturedMedia'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { MediaCarouselCard } from '../../../components/MediaCarousel/MediaCarouselCard'
import { MediaContainer } from '../../../components/MediaContainer'
import { useOnScreen } from '../../../hooks/useOnScreen'
import { tmdbService } from '../../../services/tmdb'
import { normalizeMediaPayload } from '../../../utils/functions'
import styles from './styles.module.scss'

interface IGenreByIdProps {
  genre: string
  type: string
  id: string
}

export default function GenreById ({ genre, type, id }: IGenreByIdProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [mediaList, setMediaList] = useState([])
  const [featuredMedia, setFeaturedMedia] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [statusRequest, setStatusRequest] = useState('loading')
  const footerRef = useRef<HTMLDivElement | null>(null)
  const { isIntersecting } = useOnScreen(footerRef, 500)

  useEffect(() => {
    const fetchData = async () => {
      try {
        currentPage === 1 ? setStatusRequest('loading') : setStatusRequest('loadmore')

        const res = await tmdbService.getGenreById({ type, id, page: currentPage })
        const results = res.data.results.map((media: IMedia) => normalizeMediaPayload(media))

        setMediaList((oldMediaList) => [...oldMediaList, ...results.slice(0, 18)])
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

  useEffect(() => {
    const mediaAleatoryIndex = Math.floor(Math.random() * mediaList.length)
    const featured = mediaList[mediaAleatoryIndex]
    setFeaturedMedia({ ...featured, media_type: type })
  }, [mediaList, type])

  return (
    <>
      <Head>
        <title>{genre} | Netflix</title>
      </Head>

      <main>
        <Header />

        <div>
          {(statusRequest === 'success' || statusRequest === 'loadmore') && (
            <>
              {mediaList.length > 0 && (
                <FeaturedMedia
                  genre={genre}
                  media={featuredMedia}
                />
              )}

              <MediaContainer>
                <div className={styles.container}>
                  <div className={styles.grid}>
                    {mediaList.map((media, index) => (
                      <MediaCarouselCard
                        key={`${media.id}${index}`}
                        media={{ ...media, media_type: type }}
                      />
                    ))}
                  </div>
                </div>
              </MediaContainer>
            </>
          )}

          {(statusRequest === 'loading' || statusRequest === 'loadmore') && (
            <div className={statusRequest === 'loading' ? styles.containerPaddingTop : styles.container}>
              <CardsSkeletonLoader />
              <CardsSkeletonLoader />
              <CardsSkeletonLoader />
              <CardsSkeletonLoader />
            </div>
          )}
        </div>

        {statusRequest === 'error' && (
          <EmptyState
            title="Ops... Ocorreu um erro"
            text="Por favor, tente novamente mais tarde."
          />
        )}
      </main>

      {statusRequest === 'success' && mediaList?.length > 0 && (
        <div ref={footerRef}>
          <Footer />
        </div>
      )}
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
        notFound: true
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
