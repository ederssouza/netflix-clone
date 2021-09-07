import { GetServerSideProps } from 'next'

export default function Genre () {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/',
      permanent: true
    }
  }
}
