import { useEffect, useRef, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { MoviesCarouselArrow } from './MoviesCarouselArrow'
import { IMovie, MoviesCarouselCard } from './MoviesCarouselCard'

import styles from './styles.module.scss'

interface IMoviesCarouselProps {
  title: string
  movies: IMovie[]
}

const defaultResponsiveProps = {
  superLargeDesktop: {
    breakpoint: { min: 1400, max: 5000 },
    items: 6,
    slidesToSlide: 6,
    partialVisibilityGutter: 20
  },
  desktop: {
    breakpoint: { min: 1100, max: 1399 },
    items: 5,
    slidesToSlide: 5,
    partialVisibilityGutter: 18
  },
  tablet: {
    breakpoint: { min: 800, max: 1099 },
    items: 4,
    slidesToSlide: 4,
    partialVisibilityGutter: 16
  },
  mobile2: {
    breakpoint: { min: 500, max: 799 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 13
  },
  mobile: {
    breakpoint: { min: 0, max: 499 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 19
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
        {movies.map(movie => <MoviesCarouselCard key={movie.id} movie={movie} />)}
      </Carousel>
    </div>
  )
}
