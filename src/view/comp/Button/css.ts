import { css } from '@emotion/css'

export const containerCSS = (disabled: boolean) =>
  css({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '4px',
    padding: 0,
    cursor: 'pointer',
    height: '32px',
    backgroundColor: 'rgba(255, 255, 255)',
    transition: 'background-color 0.1s ease',
    ':active': disabled
      ? {
          backgroundColor: 'inherit !important'
        }
      : {
          backgroundColor: 'rgba(240, 240, 240)'
        },
    opacity: disabled ? 0.5 : 1
  })
