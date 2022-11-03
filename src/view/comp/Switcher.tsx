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
}) => (
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

const style = () => {
  const container = () =>
    css({
      display: 'inline-block',
      whiteSpace: 'nowrap',
      border: '1px solid rgba(40, 50, 60, 0.2)',
      borderRadius: '2px',
      overflow: 'hidden',
      backgroundColor: 'rgb(244, 245, 246)'
    })

  const item = (activated: boolean) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      height: '28px',
      padding: '0 10px',
      backgroundColor: activated ? 'rgb(214, 215, 216)' : 'rgb(244, 245, 246)',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.1s ease',
      ':hover': {
        backgroundColor: activated ? 'rgb(214, 215, 216)' : 'rgb(234, 235, 236)'
      },
      ':active': {
        backgroundColor: 'rgb(214, 215, 216)'
      }
    })

  return { container, item }
}
