import { css } from '@emotion/css'

export const containerCSS = css({
  display: 'inline-block',
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  backgroundColor: 'rgba(250, 250, 250)',
  width: '512px',
  margin: '4px',
  padding: '0 8px',
})

export const titleCSS = css({
  fontWeight: 'bold',
  lineHeight: '32px',
})

export const commentCSS = css({
  lineHeight: '32px',
  color: 'rgba(100, 120, 140)',
})

export const inputCSS = css({
  padding: '0 8px',
  position: 'absolute',
  right: '16px',
  top: 0,
  bottom: 0,
  margin: 'auto',
})
