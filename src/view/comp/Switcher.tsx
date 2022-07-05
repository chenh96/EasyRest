import { css, cx } from '@emotion/css'
import { BasicType } from '../util/types'

export default <E extends BasicType>({
  options,
  value,
  onSwitch,
  containerClass,
  itemClass
}: {
  options: E[] | readonly E[]
  value: E
  onSwitch?: (value: E) => void
  containerClass?: string
  itemClass?: string
}) => {
  return (
    <div className={cx(style().container(), containerClass)}>
      {options.map((option) => (
        <button
          key={`${option}`}
          className={cx(style().item(value === option), itemClass)}
          onClick={() => onSwitch?.(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

const style = () => {
  const container = () =>
    css({
      display: 'inline-block',
      whiteSpace: 'nowrap',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      borderRadius: '5px',
      overflow: 'hidden'
    })

  const item = (activated: boolean) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      height: '28px',
      padding: '0 10px',
      backgroundColor: activated ? 'rgb(215, 215, 215)' : 'rgb(245, 245, 245)',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.1s ease',
      ':hover': {
        backgroundColor: activated ? 'rgb(215, 215, 215)' : 'rgb(235, 235, 235)'
      },
      ':active': {
        backgroundColor: 'rgb(215, 215, 215)'
      }
    })

  return { container, item }
}
