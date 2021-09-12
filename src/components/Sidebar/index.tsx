import { ICast, IGenres } from '../../@types'
import { SidebarBox } from './SidebarBox'
import styles from './styles.module.scss'

interface IBannerProps {
  cast: ICast[]
  genres: IGenres[]
}

export function Sidebar ({ cast, genres }: IBannerProps) {
  return (
    <aside className={styles.sidebar}>
      {cast?.length > 0 && (
        <div data-testid="sidebar-cast">
          <SidebarBox title="Elenco:" items={cast} />
        </div>
      )}

      {genres?.length > 0 && (
        <div data-testid="sidebar-genres">
          <SidebarBox title="Gênero:" items={genres} />
        </div>
      )}
    </aside>
  )
}
