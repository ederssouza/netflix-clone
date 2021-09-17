import { GetStaticProps } from 'next'
import Head from 'next/head'

import { IMovie } from '../../@types'
import { FeaturedMovie } from '../../components/FeaturedMovie'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { MoviesCarousel } from '../../components/MoviesCarousel'
import { MoviesContainer } from '../../components/MoviesContainer'
import { tmdbService } from '../../services/tmdb'
import { normalizeMediaSectionList } from '../../utils/functions'
import styles from '../home.module.scss'

interface ISectionsProps {
  title: string
  movies: IMovie[]
}

interface IHomeProps {
  featured: IMovie
  sections: ISectionsProps[]
}

export default function Movies ({ featured, sections }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Filmes | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <FeaturedMovie movie={featured} />

        <MoviesContainer>
          {sections.map(section => (
            <MoviesCarousel
              key={section.title}
              title={section.title}
              movies={section.movies}
            />
          ))}
        </MoviesContainer>

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
      { title: 'Ação', movies: [...action] },
      { title: 'Animação', movies: [...animation] },
      { title: 'Drama', movies: [...drama] },
      { title: 'Terror', movies: [...terror] },
      { title: 'Guerra', movies: [...war] },
      { title: 'Faroeste', movies: [...western] }
    ]

    const sectionIndexAleatory = Math.floor(Math.random() * sections.length)
    const movieIndexAleatory = Math.floor(Math.random() * totalMediaPerPage)
    const featured = sections[sectionIndexAleatory].movies[movieIndexAleatory]

    return {
      props: {
        featured,
        sections
      },
      revalidate: 60 * 30 // 30 minutes
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
