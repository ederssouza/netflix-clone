import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import { IMedia } from '../../@types'
import { CardsSkeletonLoader } from '../../components/CardsSkeletonLoader'
import { EmptyState } from '../../components/EmptyState'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { MediaCarouselCard } from '../../components/MediaCarousel/MediaCarouselCard'
import { useOnScreen } from '../../hooks/useOnScreen'
import { usePrevious } from '../../hooks/usePrevious'
import { tmdbService } from '../../services/tmdb'
import { normalizeMediaPayload } from '../../utils/functions'
import styles from './styles.module.scss'

interface ISearchProps {
  q?: string
}

export default function Search ({ q }: ISearchProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [mediaList, setMediaList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [statusRequest, setStatusRequest] = useState('loading')
  const prevQuery = usePrevious(q)
  const footerRef = useRef<HTMLDivElement | null>(null)
  const { isIntersecting } = useOnScreen(footerRef, 500)

  function resetList () {
    setCurrentPage(1)
    setMediaList([])
    setHasMore(false)
  }

  useEffect(() => {
    prevQuery !== q && resetList()
  }, [prevQuery, q])

  useEffect(() => {
    const fetchData = async () => {
      try {
        currentPage === 1 ? setStatusRequest('loading') : setStatusRequest('loadmore')

        const res = await tmdbService.search({ query: String(q), page: currentPage })
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
  }, [q, currentPage])

  useEffect(() => {
    if (isIntersecting && hasMore) {
      setCurrentPage(oldCurrentPage => oldCurrentPage + 1)
    }
  }, [isIntersecting, hasMore])

  return (
    <>
      <Head>
        <title>Busca | Netflix</title>
      </Head>

      <main className={styles.container}>
        <Header />

        {(statusRequest === 'success' || statusRequest === 'loadmore') && (
          <div className={styles.grid}>
            {mediaList.map((media, index) => <MediaCarouselCard key={`${media.id}${index}`} media={media} />)}
          </div>
        )}

        {statusRequest === 'success' && !mediaList?.length && (
          <EmptyState title={`Não encontramos resultados para "${q}"`}>
            <div className={styles.emptyState}>
              <p className={styles.emptyStateSubtitle}>Sugestões:</p>
              <ul className={styles.emptyStateList}>
                <li>Tente palavras-chave diferentes</li>
                <li>Procurando um filme ou série?</li>
                <li>Experimente buscar por filme ou série</li>
              </ul>
            </div>
          </EmptyState>
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

      {statusRequest === 'success' && mediaList?.length > 0 && (
        <div ref={footerRef}>
          <Footer />
        </div>
      )}
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
