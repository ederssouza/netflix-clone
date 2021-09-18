const getVoteAverage = (index) => {
  switch (index) {
    case 0:
      return 6.1

    case 1:
      return 7.1

    default:
      return 8.1
  }
}

export const mediaList = Array.from({ length: 20 }).map((_, index) => {
  return {
    id: 1402 + index,
    media_type: index % 2 ? 'movie' : 'tv',
    title: `Movie ${index + 1}`,
    overview: 'Nos Estados Unidos pós-apocalíptico, um pequeno grupo de sobreviventes segue viajando à procura de uma nova casa longe dos mortos-vivos. O desespero por segurança e suprimentos os coloca constantemente à beira da sanidade.',
    backdrop_path: {
      w300: 'https://image.tmdb.org/t/p/w300/wvdWb5kTQipdMDqCclC6Y3zr4j3.jpg',
      w780: 'https://image.tmdb.org/t/p/w780/wvdWb5kTQipdMDqCclC6Y3zr4j3.jpg',
      w1280: 'https://image.tmdb.org/t/p/w1280/wvdWb5kTQipdMDqCclC6Y3zr4j3.jpg',
      original: 'https://image.tmdb.org/t/p/original/wvdWb5kTQipdMDqCclC6Y3zr4j3.jpg'
    },
    vote_average: getVoteAverage(index),
    release_date: '2010',
    original_language: 'EN',
    runtime: 60,
    genres: [
      { id: 10759, name: 'Ação e Aventura' },
      { id: 18, name: 'Drama' },
      { id: 10765, name: 'Sci-Fi & Fantasy' }
    ]
  }
})

export const providersMock = [
  {
    provider_id: 4,
    provider_name: 'NOW',
    logo_path: '/dNAz0MMIPiqCD2axGIktXSFWmkz.jpg'
  }
]

export const providersResponseMock = {
  results: {
    BR: {
      link: '',
      flatrate: [...providersMock]
    }
  }
}

export const castMock = [
  { id: 1, name: 'Keanu Reeves' },
  { id: 2, name: 'Carrie-Anne Moss' }
]

export const genresMock = [
  { id: 10759, name: 'Action' },
  { id: 18, name: 'Adventure' },
  { id: 10765, name: 'Animation' },
  { id: 10766, name: 'Comedy' },
  { id: 10767, name: 'Crime' },
  { id: 10768, name: 'Documentary' },
  { id: 10769, name: 'Drama' }
]
