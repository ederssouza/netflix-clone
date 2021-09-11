/* eslint-disable camelcase */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { IoMdPlay } from 'react-icons/io'

import { Button } from '../../../components/Button'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { ProgressChart } from '../../../components/ProgressChart'
import { tmdbService } from '../../../services/tmdb'
import styles from '../styles.module.scss'

interface IGenres {
  id: number
  name: string
}

interface IMovie {
  title: string
  overview: string
  backdrop_path: string
  vote_average: number
  release_date: string
  original_language: string
  runtime: number
  genres: IGenres[]
}

interface IProvider {
  provider_id?: number,
  provider_name?: string
  logo_path?: string
}

interface ICast {
  id: number
  name: string
}

interface IDetailsProps {
  movie: IMovie
  providers?: IProvider[]
  cast?: ICast[]
}

export default function DetailsById ({ movie, cast = [], providers = [] }: IDetailsProps) {
  return (
    <>
      <Head>
        <title>{movie.title} | Netflix</title>
        <meta name="description" content={movie.overview} />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <div data-testid="details">
        <Header />

        <section
          className={styles.header}
          style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")` }}
        >
          <div className={styles.headerInfo}>
            <div className={styles.container}>
              <div className={styles.headerInfoLeft}>
                <ProgressChart value={movie.vote_average * 10} />
              </div>

              <div className={styles.headerInfoRight}>
                <div>
                  <h1 className={styles.headerTitle}>
                    {movie.title} ({movie.release_date})
                  </h1>
                  <span>({movie.original_language}) {movie?.genres?.map(genre => genre.name).join(', ')} {movie.runtime}</span>
                </div>

                <Button color="primary" icon={<IoMdPlay />}>
                  Trailer
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.description}>
                <h2 className={styles.contentTitle}>Resumo</h2>
                <p>{movie.overview}</p>

                <h2 className={styles.contentTitle}>Disponível nas plataformas</h2>
                <ul className={styles.providers}>
                  {providers.map(provider => (
                    <li key={provider.provider_id}>
                      <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} />
                    </li>
                  ))}
                </ul>
              </div>

              <aside className={styles.sidebar}>
                <div className={styles.sidebarBox}>
                  <span className={styles.sidebarTitle}>Elenco:</span>
                  {cast.map((actor, index, arr) => {
                    return index + 1 < arr.length
                      ? <span key={actor.id}> {actor.name}, </span>
                      : <span key={actor.id}>{actor.name}</span>
                  })}
                </div>

                <div className={styles.sidebarBox}>
                  <span className={styles.sidebarTitle}>Gênero:</span>
                  {movie?.genres?.map((genre, index, arr) => {
                    return index + 1 < arr.length
                      ? <span key={genre.id}> {genre.name}, </span>
                      : <span key={genre.id}>{genre.name}</span>
                  })}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { type, id } = params

  const detailsResponse = await tmdbService.getDetailsById({
    type: String(type),
    id: String(id)
  })

  const watchProvidersResponse = await tmdbService.getWatchProvidersById({
    type: String(type),
    id: String(id)
  })

  const creditsResponse = await tmdbService.getCreditsById({
    type: String(type),
    id: String(id)
  })

  return {
    props: {
      movie: detailsResponse?.data || {},
      providers: watchProvidersResponse?.data?.results?.BR?.flatrate || [],
      cast: creditsResponse?.data?.cast || []
    }
  }
}
