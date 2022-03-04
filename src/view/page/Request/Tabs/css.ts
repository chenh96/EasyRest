import { cx, css } from '@emotion/css'

export const containerCSS = css({
  height: '42px',
  margin: '0 4px',
  padding: '0 4px',
  borderRadius: '6px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(250, 250, 250)'
})

const buttonCSS = css({
  margin: '4px 0',
  backgroundColor: 'rgba(250, 250, 250)',
  transition: 'background-color 0.1s ease',
  ':active': {
    backgroundColor: 'rgba(230, 230, 230)'
  }
})

export const operationCSS = cx(
  buttonCSS,
  css({
    width: '32px'
  })
)

export const scrollerCSS = css({
  display: 'inline-block',
  whiteSpace: 'nowrap',
  overflowX: 'scroll',
  width: 'calc(100% - 160px)',
  padding: '0 4px',
  '::-webkit-scrollbar': {
    width: 0,
    height: 0
  }
})

export const tabCSS = (active: boolean, animated: boolean) =>
  cx(
    buttonCSS,
    css({
      maxWidth: '200px',
      margin: '4px 2px',
      padding: '0 8px',
      backgroundColor: active ? 'rgba(0, 100, 200)' : 'rgba(255, 255, 255)',
      color: active ? 'rgba(255, 255, 255)' : 'rgba(40, 60, 80)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      // transition: 'background-color 0.1s ease, color 0.1s ease',
      transition: animated
        ? 'background-color 0.1s ease, color 0.1s ease'
        : 'none',
      ':active': {
        backgroundColor: active ? 'rgba(0, 100, 200)' : 'rgba(255, 255, 255)'
      },
      span: {
        flexGrow: 0,
        flexShrink: 0,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'inherit'
      }
    })
  )
