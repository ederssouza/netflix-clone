import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/Button'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'

export default function PageNotFound () {
  return (
    <>
      <Head>
        <title>Página não encontrada | Netflix</title>
      </Head>

      <main>
        <Header />

        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Você se perdeu?</h1>
            <p className={styles.bannerText}>
              Infelizmente, não localizamos essa página.<br />
              Você encontra muitos outros títulos na página inicial.
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
