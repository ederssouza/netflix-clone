import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { ICast, IMovie, IProvider } from '../../../@types'
import { Banner } from '../../../components/Banner'
import { Details } from '../../../components/Details'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { Sidebar } from '../../../components/Sidebar'
import { tmdbService } from '../../../services/tmdb'
import { normalizeMoviePayload } from '../../../utils/functions'
import styles from '../styles.module.scss'

interface IDetailsProps {
  movie: IMovie
  providers?: IProvider[]
  cast?: ICast[]
}

export default function DetailsById ({ movie, cast, providers }: IDetailsProps) {
  return (
    <>
      <Head>
        {movie?.title && <title>{movie.title} | Netflix</title>}
        {movie?.overview && <meta name="description" content={movie.overview} />}
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <div data-testid="details">
        <Header />

        <Banner movie={movie} />

        <section>
          <div className={styles.container}>
            <div className={styles.content}>
              <Details overview={movie.overview} providers={providers} />
              <Sidebar genres={movie.genres} cast={cast} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
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

    const BRProviders = watchProvidersResponse?.data?.results?.BR

    return {
      props: {
        movie: normalizeMoviePayload(detailsResponse?.data),
        providers: BRProviders?.[Object.keys(BRProviders)[1]] || [],
        cast: creditsResponse?.data?.cast || []
      }
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      return {
        redirect: {
          permanent: false,
          destination: '/NotFound'
        }
      }
    }

    return {
      redirect: {
        permanent: false,
        destination: '/internal-error'
      }
    }
  }
}
