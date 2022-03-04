import { css } from '@emotion/css'

export const containerCSS = (size: number) =>
  css({
    display: 'inline-block',
    width: `${size}px`,
    height: `${size}px`
  })

export const imgCSS = css({
  objectFit: 'contain',
  width: '100%',
  height: '100%'
})
