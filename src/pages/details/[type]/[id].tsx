import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { IoMdPlay } from 'react-icons/io'

import { Button } from '../../../components/Button'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { ProgressChart } from '../../../components/ProgressChart'
import { tmdbService } from '../../../services/tmdb'
import { formatMoviePayload } from '../../../utils/functions'
import styles from '../styles.module.scss'

interface IMovie {
  background: string
  score: number
  title: string,
  originalName: string
  year: string
  country: string
  genres: string[]
  runtime: string
  overview: string
  type: string
}

interface ICast {
  id: number
  name: string
}

interface IProvider {
  logoPath: string
  providerId: string
  providerName: string
}

interface IDetailsProps {
  movie: IMovie
  cast: ICast[]
  providers: IProvider[]
}

export default function DetailsById ({ movie, cast, providers }: IDetailsProps) {
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
          style={{ backgroundImage: `url("${movie.background}")` }}
        >
          <div className={styles.headerInfo}>
            <div className={styles.container}>
              <div className={styles.headerInfoLeft}>
                <ProgressChart value={movie.score} />
              </div>

              <div className={styles.headerInfoRight}>
                <div>
                  <h1 className={styles.headerTitle}>
                    {movie.title} ({movie.year})
                  </h1>
                  <span>({movie.country}) {movie.genres.join(', ')} {movie.runtime}</span>
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
                <ul>
                  {providers.map(provider => (
                    <li key={provider.providerId}>
                      <img src={provider.logoPath} alt="" />
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
                  {movie.genres.map((genre, index, arr) => {
                    return index + 1 < arr.length
                      ? <span key={genre}> {genre}, </span>
                      : <span key={genre}>{genre}</span>
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
  const { data: movieData } = await tmdbService.get(`/${type}/${id}`)
  const { data: credits } = await tmdbService.get(`/${type}/${id}/credits`)
  const { data: watchProviders } = await tmdbService.get(`/${type}/${id}/watch/providers`)

  const movie = formatMoviePayload(movieData)
  const providersList = watchProviders?.results?.BR?.flatrate || []
  const providers = providersList.map(provider => ({
    logoPath: `https://image.tmdb.org/t/p/original${provider.logo_path}`,
    providerId: provider.provider_id,
    providerName: provider.provider_name
  }))

  return {
    props: {
      movie: { ...movie, type },
      cast: credits?.cast,
      providers
    }
  }
}
