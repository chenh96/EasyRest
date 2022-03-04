import { containerCSS } from './css'

export default function Blank({
  size = 16,
  block = false
}: {
  size?: number
  block?: boolean
}) {
  return <div className={containerCSS(block, size)}></div>
}
