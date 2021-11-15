import { containerCSS, rowCSS, keyCSS, removeCSS, valueCSS } from './css'
import { Pair } from '../../const'
import Input from '../../../../comp/Input'
import Button from '../../../../comp/Button'
import Icon from '../../../../comp/Icon'
import close from '../../../../asset/close.png'

export default function Params({
  params,
  onChange = () => {},
}: {
  params: Pair[]
  onChange?: (params: Pair[]) => void
}) {
  return (
    <div className={containerCSS}>
      {params.map((pair, index) => (
        <div className={rowCSS} key={index}>
          <Input
            className={keyCSS}
            placeholder="参数名"
            value={pair[0]}
            onInput={(value) => {
              const newParams = [...params]
              newParams.splice(index, 1, [value, pair[1]])

              if (value.length > 0 && params.length - 1 === index) {
                newParams.push(['', ''])
              }

              onChange(newParams)
            }}
          />
          <Input
            className={valueCSS}
            placeholder="参数值"
            value={pair[1]}
            onInput={(value) => {
              const newParams = [...params]
              newParams.splice(index, 1, [pair[0], value])

              if (value.length > 0 && params.length - 1 === index) {
                newParams.push(['', ''])
              }

              onChange(newParams)
            }}
          />
          <Button
            className={removeCSS}
            onClick={() => {
              const newParams = [...params]
              newParams.splice(index, 1)

              if (newParams.length <= 0) {
                newParams.push(['', ''])
              }

              const lastParam = newParams[newParams.length - 1]
              if (lastParam[0].length > 0 || lastParam[1].length > 0) {
                newParams.push(['', ''])
              }

              onChange(newParams)
            }}
          >
            <Icon src={close} />
          </Button>
        </div>
      ))}
    </div>
  )
}
