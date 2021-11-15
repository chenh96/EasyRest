import { cx } from '@emotion/css'
import { containerCSS, buttonCSS } from './css'
import Button from '../Button'

export default function Switch({
  options,
  value,
  onChange = () => {},
  className,
}: {
  options: { label: string; value: string }[]
  value?: string
  onChange?: (value: string) => void
  className?: string
}) {
  return (
    <div className={cx(containerCSS, className)}>
      {options.map((option) => (
        <Button
          key={option.value}
          className={buttonCSS(option.value === value)}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  )
}
