import { IoMdPlay, IoMdInformationCircleOutline } from 'react-icons/io'
import { Button } from '../Button'

export function FeaturedMovie () {
  return (
    <div>
      FeaturedMovie component

      <div>
        <Button color="primary" icon={<IoMdPlay />}>
          Assistir
        </Button>

        <Button color="secondary" icon={<IoMdInformationCircleOutline />}>
          Mais informações
        </Button>
      </div>
    </div>
  )
}
