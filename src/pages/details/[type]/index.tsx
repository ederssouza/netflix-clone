import { GetServerSideProps } from 'next'

export default function DetailsType () {
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
