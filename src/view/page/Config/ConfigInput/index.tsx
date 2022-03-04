import { containerCSS, titleCSS, inputCSS, commentCSS } from './css'
import Input from '../../../comp/Input'

export default function ConfigInput({
  maxLength,
  title,
  comment,
  value,
  onInput = () => {}
}: {
  maxLength?: number
  title: string
  comment: string
  value?: string
  onInput?: (value: string) => void
}) {
  return (
    <div className={containerCSS}>
      <div className={titleCSS}>{title}</div>
      <div className={commentCSS}>{comment}</div>
      <Input
        className={inputCSS}
        value={value}
        onInput={onInput}
        maxLength={maxLength}
      />
    </div>
  )
}
