import { css } from '@emotion/css'

export const containerCSS = css({
  position: 'relative',
  display: 'inline-block',
  width: '128px'
})

export const displayCSS = (open: boolean) =>
  css({
    display: 'block',
    width: '100%',
    padding: '0 8px',
    textAlign: 'left',
    transition: 'border 0.1s ease',
    border: open
      ? '1px solid rgba(0, 100, 200)'
      : '1px solid rgba(0, 0, 0, 0.1)',
    ':active': {
      backgroundColor: 'rgba(255, 255, 255)'
    }
  })

export const arrowCSS = (open: boolean) =>
  css({
    position: 'absolute',
    right: '8px',
    top: 0,
    bottom: 0,
    margin: 'auto',
    cursor: 'pointer',
    transform: open ? 'rotate(180deg)' : 'rotate(0)',
    transition: 'transform 0.2s ease'
  })

export const optionsCSS = (open: boolean) =>
  css({
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, opacity 0.1s ease',
    opacity: open ? 1 : 0,
    transform: open
      ? 'translateY(0) scaleY(1)'
      : 'translateY(calc(-8px - 50%)) scaleY(0)',
    zIndex: 1
  })

export const optionCSS = css({
  display: 'block',
  width: '100%',
  padding: '0 8px',
  borderRadius: 0,
  textAlign: 'left'
})
