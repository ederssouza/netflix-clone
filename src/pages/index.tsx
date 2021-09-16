import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { IMovie } from '../@types'
import { FeaturedMovie } from '../components/FeaturedMovie'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { MoviesCarousel } from '../components/MoviesCarousel'
import { MoviesContainer } from '../components/MoviesContainer'
import { api } from '../services/api'
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { netflix, trendings, action, adventure, comedy, documentaries } = await api.getHomeLists()

    const sections = [
      { title: 'Populares Netflix', movies: [...netflix] },
      { title: 'Em alta', movies: [...trendings] },
      { title: 'Ação', movies: [...action] },
      { title: 'Aventura', movies: [...adventure] },
      { title: 'Comédia', movies: [...comedy] },
      { title: 'Documentário', movies: [...documentaries] }
    ]

    const sectionIndexAleatory = Math.floor(Math.random() * sections.length)
    const movieIndexAleatory = Math.floor(Math.random() * 20)
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
