import { css } from '@emotion/css'

export const containerCSS = css({
  position: 'relative',
  display: 'inline-block',
  width: 'calc(40% - 12px)',
  maxWidth: 'calc(100% - 396px)',
  height: 'calc(100% - 50px)',
  margin: '4px 4px 4px 0',
  padding: 0,
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  backgroundColor: 'rgba(250, 250, 250)',
  overflow: 'hidden',
})

export const resultStatusCSS = css({
  lineHeight: '32px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '0 4px',
  color: 'rgba(100, 120, 140)',
})

export const resultCodeCSS = (font: string) =>
  css({
    width: 'calc(100% - 8px)',
    height: 'calc(100% - 40px)',
    margin: '4px',
    // padding: '8px',
    paddingRight: '4px',
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
    fontFamily: font,
    overflow: 'auto',
    '::-webkit-scrollbar': {
      width: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(240, 240, 240)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
    },
  })
