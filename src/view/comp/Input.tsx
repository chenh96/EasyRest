import { cx, css } from '@emotion/css'
import { HTMLInputTypeAttribute } from 'react'

export default <T extends string | number>({
  value,
  onInput,
  disabled = false,
  type = 'text',
  className
}: {
  value?: T
  onInput?: (value: T) => void
  disabled?: boolean
  type?: HTMLInputTypeAttribute
  className?: string
}) => {
  return (
    <input
      className={cx(style().container(), className)}
      value={value}
      onInput={(e) => onInput?.(e.currentTarget.value as T)}
      type={type}
      disabled={disabled}
    />
  )
}

const style = () => {
  const container = () =>
    css({
      minWidth: '100px',
      height: '30px',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      padding: '0 5px',
      backgroundColor: 'rgb(245, 245, 245)',
      cursor: 'text',
      transition: 'border 0.1s ease',
      ':hover': {
        border: '1px solid rgba(0, 0, 0, 0.5)'
      },
      ':focus': {
        border: '1px solid rgb(0, 100, 200)'
      }
    })

  return { container }
}
