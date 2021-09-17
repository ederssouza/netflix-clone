import { GetStaticProps } from 'next'
import Head from 'next/head'

import { IMovie } from '../@types'
import { FeaturedMovie } from '../components/FeaturedMovie'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { MoviesCarousel } from '../components/MoviesCarousel'
import { MoviesContainer } from '../components/MoviesContainer'
import { tmdbService } from '../services/tmdb'
import { normalizeMediaSectionList } from '../utils/functions'
import styles from './home.module.scss'

interface ISectionsProps {
  title: string
  movies: IMovie[]
}

interface IHomeProps {
  featured: IMovie
  sections: ISectionsProps[]
}

export default function Home ({ featured, sections }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Início | Netflix</title>
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
      { title: 'Populares Netflix', movies: [...netflix] },
      { title: 'Em alta', movies: [...topRated] },
      { title: 'Ação', movies: [...action] },
      { title: 'Aventura', movies: [...adventure] },
      { title: 'Comédia', movies: [...comedy] },
      { title: 'Documentário', movies: [...documentaries] }
    ]

    const sectionIndexAleatory = Math.floor(Math.random() * sections.length)
    const movieIndexAleatory = Math.floor(Math.random() * totalMediaPerPage)
    const featured = sections[sectionIndexAleatory].movies[movieIndexAleatory]

    return {
      props: {
        featured,
        sections
      },
      revalidate: 60 * 60 * 0.5 // seconds * minutes * hours = 30 minutes
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
