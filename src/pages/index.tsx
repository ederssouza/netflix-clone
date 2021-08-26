import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'

export default function Home () {
  return (
    <>
      <Head>
        <title>Netflix clone</title>
        <meta name="description" content="..." />
      </Head>

      <main className={styles.container}>
        <h1 className={styles.title}>
          <Image
            src="/assets/img/netflix.png"
            width="92.5px"
            height="31px"
            alt="Netflix logo"
          />
          Netflix clone
        </h1>
      </main>
    </>
  )
}
