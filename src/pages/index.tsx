import { GetStaticProps } from 'next'
import Head from 'next/head'

import { IFeaturedMedia, IMedia } from '../@types'
import { FeaturedMedia } from '../components/FeaturedMedia'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { MediaCarousel } from '../components/MediaCarousel'
import { MediaContainer } from '../components/MediaContainer'
import { tmdbService } from '../services/tmdb'
import { normalizeMediaSectionList } from '../utils/functions'
import styles from './home.module.scss'

interface ISectionsProps {
  title: string
  mediaList: IMedia[]
}

interface IHomeProps {
  featured: IFeaturedMedia
  sections: ISectionsProps[]
}

export default function Home ({ featured, sections }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Início | Netflix</title>
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
      netflixResponse,
      trendingsResponse,
      actionResponse,
      adventureResponse,
      comedyResponse,
      documentariesResponse
    ] = await Promise.all([
      tmdbService.getNetflixList({ page: 1 }),
      tmdbService.getTrendings({ page: 1 }),
      tmdbService.getGenreById({ type: 'movie', id: '28', page: 2 }),
      tmdbService.getGenreById({ type: 'movie', id: '12', page: 2 }),
      tmdbService.getGenreById({ type: 'movie', id: '35', page: 2 }),
      tmdbService.getGenreById({ type: 'tv', id: '99', page: 2 })
    ])

    const netflix = normalizeMediaSectionList(netflixResponse?.data?.results, 'tv')
    const topRated = normalizeMediaSectionList(trendingsResponse?.data?.results, 'tv')
    const action = normalizeMediaSectionList(actionResponse?.data?.results, 'movie')
    const adventure = normalizeMediaSectionList(adventureResponse?.data?.results, 'movie')
    const comedy = normalizeMediaSectionList(comedyResponse?.data?.results, 'movie')
    const documentaries = normalizeMediaSectionList(documentariesResponse?.data?.results, 'tv')
    const totalMediaPerPage = netflixResponse?.data?.results?.length

    const sections = [
      { title: 'Populares Netflix', mediaList: [...netflix] },
      { title: 'Em alta', mediaList: [...topRated] },
      { title: 'Ação', mediaList: [...action] },
      { title: 'Aventura', mediaList: [...adventure] },
      { title: 'Comédia', mediaList: [...comedy] },
      { title: 'Documentário', mediaList: [...documentaries] }
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
