import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { ICast, IMovie, IProvider } from '../../../@types'
import { Banner } from '../../../components/Banner'
import { Details } from '../../../components/Details'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { Sidebar } from '../../../components/Sidebar'
import { api } from '../../../services/api'
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
    const objRequestParams = { type: String(type), id: String(id) }
    const [detailsResponse, watchProvidersResponse, creditsResponse] = await Promise.all([
      api.getDetailsById(objRequestParams),
      api.getWatchProvidersById(objRequestParams),
      api.getCreditsById(objRequestParams)
    ])

    const BRProviders = watchProvidersResponse?.data?.results?.BR

    return {
      props: {
        movie: normalizeMoviePayload({ ...detailsResponse?.data, media_type: type }),
        providers: BRProviders?.[Object.keys(BRProviders)[1]] || [],
        cast: creditsResponse?.data?.cast || []
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
