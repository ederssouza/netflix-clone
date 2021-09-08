import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { IoMdPlay } from 'react-icons/io'

import { Header } from '../../components/Header'
import { ProgressChart } from '../../components/ProgressChart'
import { Button } from '../../components/Button'

import styles from './styles.module.scss'

interface IGenresProps {
  id: number
  name: string
}

interface IMovie {
  title: string
  releaseDate: string
  genres: IGenresProps[]
  runtime: number
}

interface IDetailsProps {
  movie: IMovie
}

export default function DetailsById ({ movie }: IDetailsProps) {
  return (
    <>
      <Head>
        <title>DYNAMIC_TITLE | Netflix</title>
        <meta name="description" content="..." />
        <link rel="icon" href="/assets/img/favicon.ico" />
      </Head>

      <div data-testid="details">
        <Header />

        <section
          className={styles.header}
          style={{ backgroundImage: 'url("https://occ-0-626-1123.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQ1n7nMsHQU4eAT8s7OtRNBTkRt8KcVP9M0q5ZnZRppX0WwulOFBD6wHx0U4pOga86psNHvwzBvJah7ey3BpIgbMOeE.webp?r=252")' }}
        >
          <div className={styles.headerInfo}>
            <div className={styles.container}>
              <div className={styles.headerInfoLeft}>
                <ProgressChart value={80} />
              </div>

              <div className={styles.headerInfoRight}>
                <div>
                  <h1 className={styles.headerTitle}>{movie.title} (2012)</h1>
                  <span>(US) Action, Thriller {movie.runtime}</span>
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

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt unde magnam similique dolor? Culpa iste perferendis alias cum aspernatur harum ad, quam dolore labore est maiores. Soluta itaque inventore quia.</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt unde magnam similique dolor? Culpa iste perferendis alias cum aspernatur harum ad, quam dolore labore est maiores. Soluta itaque inventore quia.</p>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt unde magnam similique dolor? Culpa iste perferendis alias cum aspernatur harum ad, quam dolore labore est maiores. Soluta itaque inventore quia.</p>
              </div>

              <aside className={styles.sidebar}>
                <div className={styles.sidebarBox}>
                  <span className={styles.sidebarTitle}>Elenco:</span> Nome 1, Nome 2, Nome 3, Nome 4, Nome 5.
                </div>

                <div className={styles.sidebarBox}>
                  <span className={styles.sidebarTitle}>Gênero:</span> Gênero 1, Gênero 2, Gênero 3, Gênero 4, Gênero 5.
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params

  // TODO: make request
  const movie = {
    id: String(id),
    title: 'Matrix',
    releaseDate: '2010-10-31',
    genres: [
      { id: 28, name: 'Ação' },
      { id: 53, name: 'Thriller' }
    ],
    runtime: 42
  }

  return {
    props: {
      movie
    }
  }
}
