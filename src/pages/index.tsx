import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { FeaturedMovie } from '../components/FeaturedMovie'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { MoviesCarousel } from '../components/MoviesCarousel'
import { MoviesContainer } from '../components/MoviesContainer'
import { api } from '../services/api'
import { normalizeMediaPayload } from '../utils/functions'
import styles from './home.module.scss'

interface IHomeProps {
  featured: any
  sections: any[]
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [netflixResponse, trendingsResponse, actionResponse, adventureResponse, comedyResponse, documentariesResponse] = await Promise.all([
      api.getNetflixList({ page: 1 }),
      api.getTrendings({ page: 1 }),
      api.getGenreById({ type: 'movie', id: '28', page: 2 }),
      api.getGenreById({ type: 'movie', id: '12', page: 2 }),
      api.getGenreById({ type: 'movie', id: '35', page: 2 }),
      api.getGenreById({ type: 'tv', id: '99', page: 2 })
    ])

    const netflix = netflixResponse?.data?.results.map(item => normalizeMediaPayload({ ...item, media_type: 'tv' }))
    const topRated = trendingsResponse?.data?.results.map(item => normalizeMediaPayload({ ...item, media_type: 'tv' }))
    const action = actionResponse?.data?.results.map(item => normalizeMediaPayload({ ...item, media_type: 'movie' }))
    const adventure = adventureResponse?.data?.results.map(item => normalizeMediaPayload({ ...item, media_type: 'movie' }))
    const comedy = comedyResponse?.data?.results.map(item => normalizeMediaPayload({ ...item, media_type: 'movie' }))
    const documentaries = documentariesResponse?.data?.results.map(item => normalizeMediaPayload({ ...item, media_type: 'tv' }))

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
