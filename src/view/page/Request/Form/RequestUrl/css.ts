import { css } from '@emotion/css'

export const methodCSS = css({
  width: '96px',
  '> button:first-of-type': {
    borderRadius: '4px 0 0 4px',
  },
})

export const urlCSS = css({
  borderRadius: 0,
  margin: '0 4px',
  padding: '0 8px',
  width: 'calc(100% - 184px)',
})

export const requestCSS = css({
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '0 4px 4px 0',
  width: '80px',
  height: '32px',
  backgroundColor: 'rgba(50, 150, 50)',
  color: 'rgba(255, 255, 255)',
  ':active': {
    backgroundColor: 'rgba(30, 130, 30)',
  },
})
