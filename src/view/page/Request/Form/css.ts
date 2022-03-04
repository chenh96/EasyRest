import { css } from '@emotion/css'

export const paramsPartCSS = css({
  display: 'inline-block',
  width: '60%',
  minWidth: '384px',
  height: 'calc(100% - 50px)',
  margin: '4px',
  padding: '4px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '6px',
  backgroundColor: 'rgba(250, 250, 250)'
})

export const requestBodyCSS = (font: string) =>
  css({
    display: 'inline-block',
    position: 'relative',
    width: '100%',
    height: 'calc(100% - 76px)',
    marginTop: '4px',
    padding: '8px',
    wordBreak: 'break-word',
    fontFamily: font,
    '::-webkit-scrollbar': {
      width: '8px'
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(240, 240, 240)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '4px'
    }
  })
