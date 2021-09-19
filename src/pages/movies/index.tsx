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

interface IMoviesProps {
  featured: IMedia
  sections: ISectionsProps[]
}

export default function Movies ({ featured, sections }: IMoviesProps) {
  return (
    <>
      <Head>
        <title>Filmes | Netflix</title>
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
      animationResponse,
      dramaResponse,
      terrorResponse,
      warResponse,
      westernResponse
    ] = await Promise.all([
      tmdbService.getGenreById({ type: 'movie', id: '28', page: 1 }),
      tmdbService.getGenreById({ type: 'movie', id: '16', page: 1 }),
      tmdbService.getGenreById({ type: 'movie', id: '18', page: 1 }),
      tmdbService.getGenreById({ type: 'movie', id: '27', page: 1 }),
      tmdbService.getGenreById({ type: 'movie', id: '10752', page: 1 }),
      tmdbService.getGenreById({ type: 'movie', id: '37', page: 1 })
    ])

    const action = normalizeMediaSectionList(actionResponse?.data?.results, 'movie')
    const animation = normalizeMediaSectionList(animationResponse?.data?.results, 'movie')
    const drama = normalizeMediaSectionList(dramaResponse?.data?.results, 'movie')
    const terror = normalizeMediaSectionList(terrorResponse?.data?.results, 'movie')
    const war = normalizeMediaSectionList(warResponse?.data?.results, 'movie')
    const western = normalizeMediaSectionList(westernResponse?.data?.results, 'movie')
    const totalMediaPerPage = actionResponse?.data?.results?.length

    const sections = [
      { title: 'Ação', mediaList: [...action] },
      { title: 'Animação', mediaList: [...animation] },
      { title: 'Drama', mediaList: [...drama] },
      { title: 'Terror', mediaList: [...terror] },
      { title: 'Guerra', mediaList: [...war] },
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
