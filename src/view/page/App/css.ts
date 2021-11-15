import { cx, css } from '@emotion/css'

export const containerCSS = css({
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  minWidth: '700px',
  minHeight: '500px',
  '*': {
    color: 'rgba(40, 60, 80)',
    fontSize: '12px',
    boxSizing: 'border-box',
    outline: 'none',
    verticalAlign: 'top',
    textDecoration: 'none',
    fontFamily: 'Microsoft YaHei'
  },
})
