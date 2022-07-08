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
    <button className={cx(style().container(disabled), className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

const style = () => {
  const container = (disabled: boolean) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '30px',
      padding: '0 10px',
      border: 'none',
      background: 'none',
      borderRadius: '2px',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'background-color 0.1s ease',
      ':hover': {
        backgroundColor: disabled ? 'none' : 'rgb(234, 235, 236)'
      },
      ':active': {
        backgroundColor: disabled ? 'none' : 'rgb(214, 215, 216)'
      }
    })

  return { container }
}
