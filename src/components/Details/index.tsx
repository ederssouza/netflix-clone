import { IProvider } from '../../@types'
import { TMDB_BASE_URL_IMAGE } from '../../services/tmdb'
import styles from './styles.module.scss'

interface IDetailsProps {
  overview?: string
  providers: IProvider[]
}

export function Details ({ overview, providers }: IDetailsProps) {
  return (
    <div className={styles.content}>
      <h2 className={styles.contentTitle}>Resumo</h2>
      <p>{overview || 'Nenhum resumo disponível'}</p>

      <h2 className={styles.contentTitle}>Disponível nas plataformas</h2>
      {providers?.length
        ? (
          <ul className={styles.providers}>
            {providers.map(provider => (
              <li key={provider.provider_id}>
                <img
                  src={`${TMDB_BASE_URL_IMAGE}/original${provider.logo_path}`}
                  alt={provider.provider_name}
                />
              </li>
            ))}
          </ul>
          )
        : <p>Não está disponível em nenhuma plataforma</p>}
    </div>
  )
}
