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

export default function Tv ({ featured, sections }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Series | Netflix</title>
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
    const [actionResponse, crimeResponse, dramaResponse, familyResponse, misteryResponse, westernResponse] = await Promise.all([
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
      { title: 'Action & Adventure', movies: [...action] },
      { title: 'Crime', movies: [...crime] },
      { title: 'Drama', movies: [...drama] },
      { title: 'Família', movies: [...family] },
      { title: 'Mistério', movies: [...mistery] },
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