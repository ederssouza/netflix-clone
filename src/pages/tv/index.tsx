import { GetStaticProps } from 'next'
import Head from 'next/head'

import { IMedia } from '../../@types'
import { FeaturedMedia } from '../../components/FeaturedMedia'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { MediaCarousel } from '../../components/MediaCarousel'
import { MediaContainer } from '../../components/MediaContainer'
import { tmdbService } from '../../services/tmdb'
import { normalizeMediaSectionList } from '../../utils/functions'
import styles from '../home.module.scss'

interface ISectionsProps {
  title: string
  mediaList: IMedia[]
}

interface ITVProps {
  featured: IMedia
  sections: ISectionsProps[]
}

export default function TV ({ featured, sections }: ITVProps) {
  return (
    <>
      <Head>
        <title>Séries | Netflix</title>
      </Head>

      <main className={styles.container}>
        <Header />
        <FeaturedMedia media={featured} />

        <MediaContainer>
          {sections.map(section => (
            <MediaCarousel
              key={section.title}
              title={section.title}
              mediaList={section.mediaList}
            />
          ))}
        </MediaContainer>

        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [
      actionResponse,
      crimeResponse,
      dramaResponse,
      familyResponse,
      misteryResponse,
      westernResponse
    ] = await Promise.all([
      tmdbService.getGenreById({ type: 'tv', id: '10759', page: 1 }),
      tmdbService.getGenreById({ type: 'tv', id: '80', page: 1 }),
      tmdbService.getGenreById({ type: 'tv', id: '18', page: 2 }),
      tmdbService.getGenreById({ type: 'tv', id: '10751', page: 1 }),
      tmdbService.getGenreById({ type: 'tv', id: '9648', page: 1 }),
      tmdbService.getGenreById({ type: 'tv', id: '37', page: 1 })
    ])

    const action = normalizeMediaSectionList(actionResponse?.data?.results, 'tv')
    const crime = normalizeMediaSectionList(crimeResponse?.data?.results, 'tv')
    const drama = normalizeMediaSectionList(dramaResponse?.data?.results, 'tv')
    const family = normalizeMediaSectionList(familyResponse?.data?.results, 'tv')
    const mistery = normalizeMediaSectionList(misteryResponse?.data?.results, 'tv')
    const western = normalizeMediaSectionList(westernResponse?.data?.results, 'tv')
    const totalMediaPerPage = actionResponse?.data?.results?.length

    const sections = [
      { title: 'Ação e Aventura', mediaList: [...action] },
      { title: 'Crime', mediaList: [...crime] },
      { title: 'Drama', mediaList: [...drama] },
      { title: 'Família', mediaList: [...family] },
      { title: 'Mistério', mediaList: [...mistery] },
      { title: 'Faroeste', mediaList: [...western] }
    ]

    const sectionAleatoryIndex = Math.floor(Math.random() * sections.length)
    const mediaAleatoryIndex = Math.floor(Math.random() * totalMediaPerPage)
    const featured = sections[sectionAleatoryIndex].mediaList[mediaAleatoryIndex]

    return {
      props: {
        featured,
        sections
      },
      revalidate: 60 * 60 * 24 // 1 day
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
