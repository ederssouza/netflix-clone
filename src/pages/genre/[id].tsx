import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { Header } from '../../components/Header'

import styles from './styles.module.scss'

interface IGenreProps {
  id: string
}

export default function Genre ({ id }: IGenreProps) {
  return (
    <>
      <Head>
        <title>GENRE_NAME ID | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <Header />
        <h1>Genre {id}</h1>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params

  return {
    props: {
      id
    }
  }
}
