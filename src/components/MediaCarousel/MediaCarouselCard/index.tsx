import Link from 'next/link'
import { IoMdPlay } from 'react-icons/io'
import { TiInfoLarge } from 'react-icons/ti'

import { IMedia } from '../../../@types'
import styles from './styles.module.scss'

interface IMediaCarouselCardProps {
  media: IMedia
}

export function MediaCarouselCard ({ media }: IMediaCarouselCardProps) {
  function handleMouseEnter (e) {
    const $carousel = e.target.closest('.react-multi-carousel-track')
    const $carouselActiveItems = $carousel.querySelectorAll('.react-multi-carousel-item--active')
    const $firstCarouselActiveItem = $carouselActiveItems[0]
    const $firstCarouselActiveItemIndex = $firstCarouselActiveItem.getAttribute('data-index')
    const $lastCarouselActiveItem = $carouselActiveItems[$carouselActiveItems.length - 1]
    const $lastCarouselActiveItemIndex = $lastCarouselActiveItem.getAttribute('data-index')
    const $target = e.target.closest('.react-multi-carousel-item')
    const $targetCard = e.target.closest('.react-multi-carousel-item > div')
    const $targetIndex = $target.getAttribute('data-index')

    if ($firstCarouselActiveItemIndex === $targetIndex) {
      $targetCard.classList.add('mediaCarouselFirstActiveCard')
    }

    if ($lastCarouselActiveItemIndex === $targetIndex) {
      $targetCard.classList.add('mediaCarouselLastActiveCard')
    }
  }

  return (
    <div
      className={styles.mediaCarouselCard}
      data-testid="carousel-card"
      onMouseEnter={handleMouseEnter}
    >
      <img src={media.backdrop_path.w300} alt={media.title} />

      <div className={styles.mediaCarouselCardDetails}>
        <h2 className={styles.mediaCarouselCardTitle}>{media.title}</h2>

        <ul className={styles.mediaCarouselCardActions}>
          <li className={styles.mediaCarouselCardActionActiveItem}>
            <a href="#" title=""><IoMdPlay /></a>
          </li>

          <li
            className={styles.mediaCarouselCardActionItem}
            data-testid="carousel-more-details"
          >
            <Link href={`/details/${media.media_type}/${media.id}`} passHref>
              <a title="Ver mais detalhes"><TiInfoLarge /></a>
            </Link>
          </li>
        </ul>

        <span className={`${styles.mediaCarouselCardRelevant} ${styles.mediaCarouselCardRelevantGreen}`}>
          {media?.vote_average ? (media.vote_average * 10) : 0}% relevante
        </span>
      </div>
    </div>
  )
}
