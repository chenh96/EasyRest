import { cx, css } from '@emotion/css'

export const containerCSS = css({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  height: '40px',
  padding: '0 2px',
})

const buttonCSS = css({
  height: '32px',
  margin: '4px 2px',
})

export const logoCSS = cx(
  buttonCSS,
  css({
    padding: '0 8px',
    fontWeight: 'bold',
  })
)

export const configCSS = cx(
  buttonCSS,
  css({
    float: 'right',
    width: '32px',
  })
)
