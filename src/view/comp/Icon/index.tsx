import { cx } from '@emotion/css'
import { containerCSS, imgCSS } from './css'

export default function Icon({
  src,
  alt = '图标',
  size = 16,
  className
}: {
  src: string
  alt?: string
  size?: number
  className?: string
}) {
  return (
    <div className={cx(containerCSS(size), className)}>
      <img src={src} alt={alt} className={imgCSS} />
    </div>
  )
}
