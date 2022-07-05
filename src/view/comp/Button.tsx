import { cx, css } from '@emotion/css'
import { TsxChildren } from '../util/types'

export default ({
  onClick,
  className,
  children,
  disabled = false
}: {
  onClick?: () => void
  className?: string
  children?: TsxChildren
  disabled?: boolean
}) => {
  return (
    <button className={cx(style().container(), className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

const style = () => {
  const container = () =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '30px',
      padding: '0 10px',
      background: 'none',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.1s ease',
      ':hover': {
        backgroundColor: 'rgb(235, 235, 235)'
      },
      ':active': {
        backgroundColor: 'rgb(215, 215, 215)'
      }
    })

  return { container }
}
