import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { ICast, IMedia, IProvider } from '../../../@types'
import { Details } from '../../../components/Details'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { MediaBanner } from '../../../components/MediaBanner'
import { Sidebar } from '../../../components/Sidebar'
import { tmdbService } from '../../../services/tmdb'
import { normalizeMediaDetailsPayload } from '../../../utils/functions'
import styles from '../styles.module.scss'

interface IDetailsProps {
  media: IMedia
  providers?: IProvider[]
  cast?: ICast[]
}

export default function DetailsById ({ media, cast, providers }: IDetailsProps) {
  return (
    <>
      <Head>
        {media?.title && <title>{media.title} | Netflix</title>}
        {media?.overview && <meta name="description" content={media.overview} />}
      </Head>

      <div data-testid="details">
        <Header />

        <MediaBanner media={media} />

        <section>
          <div className={styles.container}>
            <div className={styles.content}>
              <Details overview={media.overview} providers={providers} />
              <Sidebar genres={media.genres} cast={cast} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await tmdbService.getTrendings({ page: 1 })
  const results = res?.data?.results || []
  const paths = results.map((item: IMedia) => {
    const type = item.media_type
    const id = String(item.id)

    return { params: { type, id } }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { type, id } = params
    const objRequestParams = { type: String(type), id: String(id) }
    const [detailsResponse, watchProvidersResponse, creditsResponse] = await Promise.all([
      tmdbService.getDetailsById(objRequestParams),
      tmdbService.getWatchProvidersById(objRequestParams),
      tmdbService.getCreditsById(objRequestParams)
    ])

    const BRProviders = watchProvidersResponse?.data?.results?.BR

    return {
      props: {
        media: normalizeMediaDetailsPayload({ ...detailsResponse?.data, media_type: type }),
        providers: BRProviders?.[Object.keys(BRProviders)[1]] || [],
        cast: creditsResponse?.data?.cast || []
      },
      revalidate: 60 * 60 * 24 * 7 // 1 week
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
