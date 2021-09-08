import { ImFacebook2, ImInstagram, ImTwitter, ImYoutube } from 'react-icons/im'

import { FooterCopyright } from './FooterCopyright'
import { FooterMenu } from './FooterMenu'
import { FooterSocialMedia } from './FooterSocialMedia'
import styles from './styles.module.scss'

export function Footer () {
  const socialMediaList = [
    {
      href: 'https://www.facebook.com/netflixbrasil',
      title: 'Facebook',
      icon: <ImFacebook2 />
    },
    {
      href: 'https://www.instagram.com/NetflixBrasil',
      title: 'Instagram',
      icon: <ImInstagram />
    },
    {
      href: 'https://twitter.com/NetflixBrasil',
      title: 'Twitter',
      icon: <ImTwitter />
    },
    {
      href: 'https://www.youtube.com/user/NetflixBRA',
      title: 'YouTube',
      icon: <ImYoutube />
    }
  ]

  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.footerContainer}>
        <FooterSocialMedia items={socialMediaList} />
      </div>

      <div className={styles.footerContainer}>
        <FooterMenu
          items={[
            'Idioma e legendas',
            'Imprensa',
            'Privacidade',
            'Entre em contato'
          ]}
        />

        <FooterMenu
          items={[
            'Audiodescrição',
            'Relações com investidores',
            'Avisos legais'
          ]}
        />

        <FooterMenu
          items={[
            'Centro de ajuda',
            'Carreiras',
            'Preferências de cookies'
          ]}
        />

        <FooterMenu
          items={[
            'Cartão pré-pago',
            'Termos de uso',
            'Informações corporativas'
          ]}
        />
      </div>

      <FooterCopyright />
    </footer>
  )
}
