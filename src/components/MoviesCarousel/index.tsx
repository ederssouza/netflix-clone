// https://www.npmjs.com/package/react-multi-carousel
import { useEffect, useRef, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { MoviesCarouselArrow } from './MoviesCarouselArrow'

import styles from './styles.module.scss'

interface IMovie {
  id: number
  title: string
  image: string
}

interface IMoviesCarouselProps {
  title: string
  movies: IMovie[]
}

const defaultResponsiveProps = {
  superLargeDesktop: {
    breakpoint: { min: 3001, max: 4000 },
    items: 6,
    slidesToSlide: 6,
    partialVisibilityGutter: 10
  },
  desktop: {
    breakpoint: { min: 1025, max: 3000 },
    items: 6,
    slidesToSlide: 6,
    partialVisibilityGutter: 10
  },
  tablet: {
    breakpoint: { min: 768, max: 1024 },
    items: 4,
    slidesToSlide: 4,
    partialVisibilityGutter: 10
  },
  mobile: {
    breakpoint: { min: 0, max: 767 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 10
  }
}

export function MoviesCarousel ({ title, movies }: IMoviesCarouselProps) {
  const [responsive, setResponsive] = useState({ ...defaultResponsiveProps })
  const sliderRef = useRef(null)

  function handleResponsiveProps () {
    setResponsive({ ...defaultResponsiveProps })
  }

  useEffect(() => {
    handleResponsiveProps()
    window.addEventListener('resize', handleResponsiveProps)
    return () => window.removeEventListener('resize', handleResponsiveProps)
  }, [])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <Carousel
        ref={sliderRef}
        partialVisible={true}
        infinite={true}
        draggable={false}
        ssr={true}
        responsive={responsive}
        customLeftArrow={<MoviesCarouselArrow direction="left" />}
        customRightArrow={<MoviesCarouselArrow direction="right" />}
      >
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            style={{ margin: '0 2px', borderRadius: 4, overflow: 'hidden' }}
          >
            <img src={movie.image} alt={movie.title} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
