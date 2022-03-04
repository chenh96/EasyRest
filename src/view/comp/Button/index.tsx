import { ReactNode, MouseEvent } from 'react'
import { cx } from '@emotion/css'
import { containerCSS } from './css'

export default function Button({
  onClick = () => {},
  className,
  children,
  disabled = false
}: {
  onClick?: (e: MouseEvent) => void
  className?: string
  children?: string | ReactNode | ReactNode[]
  disabled?: boolean
}) {
  return (
    <button
      className={cx(containerCSS(disabled), className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
