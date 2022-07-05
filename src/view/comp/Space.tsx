import { css } from '@emotion/css'

export default ({ size = 5, vertical = false }: { size?: number; vertical?: boolean }) => {
  return <div className={style().container(size, vertical)}></div>
}

const style = () => {
  const container = (size: number, vertical: boolean) =>
    css({
      display: vertical ? 'block' : 'inline-block',
      width: vertical ? 'auto' : `${size}px`,
      height: vertical ? `${size}px` : 'auto'
    })

  return { container }
}
