import { useRouter } from 'next/router'

export default function Search () {
  const { query } = useRouter()

  return (
    <>
      <h1>Buscar por: {query?.q}</h1>
    </>
  )
}
