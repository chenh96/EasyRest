import { ReactNode } from 'react'
import { containerCSS } from './css'

export default function Content({
  children
}: {
  children?: string | ReactNode | ReactNode[]
}) {
  return <div className={containerCSS}>{children}</div>
}
