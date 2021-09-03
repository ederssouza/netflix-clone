import { ImFacebook2, ImInstagram, ImTwitter, ImYoutube } from 'react-icons/im'
import styles from './styles.module.scss'

export function Footer () {
  return (
    <footer className={styles.footer} data-testid="footer">
      <div className={styles.container}>
        <ul className={styles.socialMedia}>
          <li>
            <a href="https://www.facebook.com/netflixbrasil" title="Facebook">
              <ImFacebook2 />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/NetflixBrasil" title="Instagram">
              <ImInstagram />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/NetflixBrasil" title="Twitter">
              <ImTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/user/NetflixBRA" title="YouTube">
              <ImYoutube />
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.container}>
        <ul className={styles.footerList}>
          <li>
            <a href="#" title="Idioma e legendas">Idioma e legendas</a>
          </li>
          <li>
            <a href="#" title="Imprensa">Imprensa</a>
          </li>
          <li>
            <a href="#" title="Privacidade">Privacidade</a>
          </li>
          <li>
            <a href="#" title="Entre em contato">Entre em contato</a>
          </li>
        </ul>

        <ul className={styles.footerList}>
          <li>
            <a href="#" title="Audiodescrição">Audiodescrição</a>
          </li>
          <li>
            <a href="#" title="Relações com investidores">Relações com investidores</a>
          </li>
          <li>
            <a href="#" title="Avisos legais">Avisos legais</a>
          </li>
        </ul>

        <ul className={styles.footerList}>
          <li>
            <a href="#" title="Centro de ajuda">Centro de ajuda</a>
          </li>
          <li>
            <a href="#" title="Carreiras">Carreiras</a>
          </li>
          <li>
            <a href="#" title="Preferências de cookies">Preferências de cookies</a>
          </li>
        </ul>

        <ul className={styles.footerList}>
          <li>
            <a href="#" title="Cartão pré-pago">Cartão pré-pago</a>
          </li>
          <li>
            <a href="#" title="Termos de uso">Termos de uso</a>
          </li>
          <li>
            <a href="#" title="Informações corporativas">Informações corporativas</a>
          </li>
        </ul>
      </div>

      <span className={styles.copyright}>&copy; 1997-2021 Netflix, Inc.  ‎{'{cde6c7c5-4e42-4c65-8f35-2d9aa3d447b7}'}</span>
    </footer>
  )
}
