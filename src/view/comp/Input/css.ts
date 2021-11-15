import { css } from '@emotion/css'

export const containerCSS = css({
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '4px',
  height: '32px',
  padding: 0,
  resize: 'none',
  transition: 'border 0.1s ease',
  ':focus': {
    border: '1px solid rgba(0, 100, 200)',
  },
})
