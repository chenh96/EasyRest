import { cx } from '@emotion/css'
import { containerCSS } from './css'

export default function Input({
  value,
  onInput = () => {},
  // type = 'text',
  // max,
  maxLength,
  mutliple = false,
  placeholder,
  className,
}: {
  value?: string
  onInput?: (value: string) => void
  // type?: string
  // max?: number
  maxLength?: number
  mutliple?: boolean
  placeholder?: string
  className?: string
}) {
  return (
    <>
      {mutliple ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onInput={(e) => onInput(e.currentTarget.value)}
          className={cx(containerCSS, className)}
          maxLength={maxLength}
        />
      ) : (
        <input
          // type={type}
          value={value}
          placeholder={placeholder}
          onInput={(e) => onInput(e.currentTarget.value)}
          className={cx(containerCSS, className)}
          maxLength={maxLength}
        />
      )}
    </>
  )
}
