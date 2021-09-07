import { GetServerSideProps } from 'next'

export default function Details () {
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
