import { css } from '@emotion/css'

export const containerCSS = css({
  display: 'inline-block',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  overflow: 'hidden',
  whiteSpace: 'nowrap'
})

export const buttonCSS = (active: boolean) =>
  css({
    height: '30px',
    padding: '0 8px',
    borderRight: '1px solid rgba(230, 230, 230)',
    borderRadius: 0,
    backgroundColor: active ? 'rgba(230, 230, 230)' : 'rgba(255, 255, 255)',
    // color: active ? 'rgba(255, 255, 255)' : 'rgba(40, 60, 80)',
    transition: 'background-color 0.1s ease, color 0.1s ease',
    ':active': {
      backgroundColor: active ? 'rgba(230, 230, 230)' : 'rgba(255, 255, 255)'
    },
    ':last-of-type': {
      borderRight: 'none'
    }
  })
