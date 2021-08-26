import Image from 'next/image'

export function Header () {
  return (
    <header>
      <Image
        src="/assets/img/netflix.png"
        width="92.5px"
        height="31px"
        alt="Netflix logo"
      />
    </header>
  )
}
