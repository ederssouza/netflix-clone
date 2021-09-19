import { useEffect, useRef, useState, forwardRef, ForwardRefRenderFunction } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import { IMedia } from '../../@types'
import { MediaCarouselArrow } from './MediaCarouselArrow'
import { MediaCarouselCard } from './MediaCarouselCard'
import styles from './styles.module.scss'

interface IMediaCarouselProps {
  title: string
  mediaList: IMedia[]
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
  mobile: {
    breakpoint: { min: 500, max: 799 },
    items: 3,
    slidesToSlide: 3,
    partialVisibilityGutter: 13
  },
  smallMobile: {
    breakpoint: { min: 0, max: 499 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 19
  }
}

const MediaCarouselBase: ForwardRefRenderFunction<HTMLInputElement, IMediaCarouselProps> = ({ title, mediaList, ...rest }: IMediaCarouselProps, ref) => {
  const [responsive, setResponsive] = useState({ ...defaultResponsiveProps })
  const [firstLoad, setFirstLoad] = useState(true)
  const sliderRef = useRef(null)

  function handleResponsiveProps () {
    setResponsive({ ...defaultResponsiveProps })
  }

  function scrollCallback () {
    setFirstLoad(false)
  }

  useEffect(() => {
    handleResponsiveProps()
    window.addEventListener('resize', handleResponsiveProps)
    return () => window.removeEventListener('resize', handleResponsiveProps)
  }, [])

  return (
    <div
      className={`${styles.mediaCarousel} ${firstLoad ? 'carousel-firstload' : ''}`}
      data-testid="carousel"
      ref={ref}
    >
      <h2 className={styles.mediaCarouselTitle}>{title}</h2>

      <Carousel
        ref={sliderRef}
        infinite={true}
        customTransition="transform 400ms ease-in-out"
        transitionDuration={400}
        partialVisible={true}
        draggable={false}
        responsive={responsive}
        ssr={true}
        // TODO: get dinamicaly (https://stackoverflow.com/questions/67627482/react-multi-carousel-doesnt-do-server-side-render)
        deviceType={'desktop'}
        customLeftArrow={
          <MediaCarouselArrow
            firstLoad={firstLoad}
            direction="left"
          />
        }
        customRightArrow={
          <MediaCarouselArrow direction="right" />
        }
        beforeChange={() => scrollCallback()}
      >
        {mediaList.map(media => <MediaCarouselCard key={media.id} media={media} adjustOnMouseEnterEvent />)}
      </Carousel>
    </div>
  )
}

export const MediaCarousel = forwardRef(MediaCarouselBase)
