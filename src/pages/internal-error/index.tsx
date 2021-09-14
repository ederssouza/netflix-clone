import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

interface IInternalErrorProps {
  statusCode: string
}

export default function PageInternalError ({ statusCode }: IInternalErrorProps) {
  return (
    <>
      <Head>
        <title>Início | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main>
        <Header />

        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Erro {statusCode}</h1>
            <p className={styles.bannerText}>
              Ops... Parece que algo deu errado.<br />
              Tente novamente mais tarde.
            </p>

            <Link href="/" passHref>
              <Button>Página inicial da Netflix</Button>
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const { code } = query

  return {
    props: {
      statusCode: code
    }
  }
}
