import { useEffect, useState } from 'react'
import { cx } from '@emotion/css'
import {
  arrowCSS,
  containerCSS,
  displayCSS,
  optionCSS,
  optionsCSS,
} from './css'
import Button from '../Button'
import Icon from '../Icon'
import down from '../../asset/down.png'

export default function Select({
  options,
  value,
  onSelect = () => {},
  placeholder = '请选择',
  className,
}: {
  options: { label: string; value: string }[]
  value?: string
  onSelect?: (value: string) => void
  placeholder?: string
  className?: string
}) {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => document.addEventListener('click', () => setOpen(false)), [])

  return (
    <div className={cx(containerCSS, className)}>
      <Button
        className={displayCSS(open)}
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
      >
        {options.find((option) => option.value === value)?.label || placeholder}

        <Icon src={down} className={arrowCSS(open)} />
      </Button>

      <div className={optionsCSS(open)}>
        {options.map((option) => (
          <Button
            key={option.value}
            className={optionCSS}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
