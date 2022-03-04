import { css } from '@emotion/css'

export const containerCSS = css({
  position: 'relative',
  maxHeight: 'calc(100% - 76px)',
  marginTop: '4px',
  overflow: 'auto',
  '::-webkit-scrollbar': {
    width: '8px'
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(240, 240, 240)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '4px'
  }
})

export const rowCSS = css({
  marginTop: '4px',
  ':first-of-type': {
    marginTop: 0
  }
})

export const keyCSS = css({
  width: '25%',
  borderRadius: '4px 0 0 4px',
  padding: '0 8px'
})

export const valueCSS = css({
  width: 'calc(75% - 44px)',
  marginLeft: '4px',
  padding: '0 8px',
  borderRadius: 0
})

export const removeCSS = css({
  width: '32px',
  marginLeft: '4px',
  backgroundColor: 'rgba(250, 250, 250)',
  borderRadius: '0 4px 4px 0'
})
