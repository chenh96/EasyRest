import { css } from '@emotion/css'

export const containerCSS = (block: boolean, size: number) =>
  css({
    display: block ? 'block' : 'inline-block',
    width: block ? 'auto' : `${size}px`,
    height: block ? `${size}px` : 'auto',
  })
