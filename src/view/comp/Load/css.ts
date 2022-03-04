import { css, keyframes } from '@emotion/css'

export const containerCSS = (show: boolean, cover: boolean) =>
  css({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: cover ? 'rgba(255, 255, 255)' : 'rgba(0, 0, 0, 0)',
    opacity: show ? 1 : 0,
    transition: 'opacity 0.2s ease'
  })

const rotateAnimation = keyframes({
  '0%': {
    transform: 'rotate(0)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
})

export const iconCSS = css({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: '20%',
  margin: 'auto',
  padding: '8px',
  width: '48px',
  height: '48px',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255)',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  '> img': {
    animation: `${rotateAnimation} 2s linear infinite`
  }
})
