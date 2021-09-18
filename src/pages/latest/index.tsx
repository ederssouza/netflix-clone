import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import { IMedia } from '../../@types'
import { CardsSkeletonLoader } from '../../components/CardsSkeletonLoader'
import { EmptyState } from '../../components/EmptyState'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { MediaCarouselCard } from '../../components/MediaCarousel/MediaCarouselCard'
import { useOnScreen } from '../../hooks/useOnScreen'
import { tmdbService } from '../../services/tmdb'
import { normalizeMediaPayload } from '../../utils/functions'
import styles from './styles.module.scss'

export default function Latest () {
  const [currentPage, setCurrentPage] = useState(1)
  const [mediaList, setMediaList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [statusRequest, setStatusRequest] = useState('loading')
  const footerRef = useRef<HTMLDivElement | null>(null)
  const { isIntersecting } = useOnScreen(footerRef)

  function resetList () {
    setCurrentPage(1)
    setMediaList([])
    setHasMore(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        currentPage === 1 ? setStatusRequest('loading') : setStatusRequest('loadmore')

        const res = await tmdbService.getTrendings({ page: currentPage })
        const results = res.data.results.map((media: IMedia) => normalizeMediaPayload(media))

        setMediaList((oldMediaList) => [...oldMediaList, ...results.slice(0, 18)])
        setHasMore(currentPage <= res.data.total_pages)
        setTimeout(() => setStatusRequest('success'), 500)
      } catch (error) {
        setStatusRequest('error')
        resetList()
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
        <title>Bombando | Netflix</title>
      </Head>

      <main className={styles.container}>
        <Header />

        {(statusRequest === 'success' || statusRequest === 'loadmore') && (
          <div className={styles.grid}>
            {mediaList.map((media, index) => <MediaCarouselCard key={`${media.id}${index}`} media={media} />)}
          </div>
        )}

        {statusRequest === 'error' && (
          <EmptyState
            title="Ops... Ocorreu um erro"
            text="Por favor, tente novamente mais tarde."
          />
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

      {mediaList?.length > 0 && statusRequest !== 'loading' && statusRequest !== 'loadmore' && (
        <div ref={footerRef}>
          <Footer />
        </div>
      )}
    </>
  )
}
