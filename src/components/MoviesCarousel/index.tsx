import { useEffect, useRef, useState, forwardRef, ForwardRefRenderFunction } from 'react'
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

const MoviesCarouselBase: ForwardRefRenderFunction<HTMLInputElement, IMoviesCarouselProps> = ({ title, movies, ...rest }: IMoviesCarouselProps, ref) => {
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
    <div className={styles.container} data-testid="movies-carousel" ref={ref}>
      <h2 className={styles.title}>{title}</h2>

      <Carousel
        ref={sliderRef}
        partialVisible={true}
        infinite={true}
        draggable={false}
        responsive={responsive}
        ssr={true}
        // TODO: get dinamicaly (https://stackoverflow.com/questions/67627482/react-multi-carousel-doesnt-do-server-side-render)
        deviceType={'desktop'}
        customLeftArrow={<MoviesCarouselArrow direction="left" />}
        customRightArrow={<MoviesCarouselArrow direction="right" />}
      >
        {movies.map(movie => <MoviesCarouselCard key={movie.id} movie={movie} />)}
      </Carousel>
    </div>
  )
}

export const MoviesCarousel = forwardRef(MoviesCarouselBase)
