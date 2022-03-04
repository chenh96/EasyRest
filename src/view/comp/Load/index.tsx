import { useEffect, useState } from 'react'
import { containerCSS, iconCSS } from './css'
import Icon from '../Icon'
import load from '../../asset/load.png'

export default function Load({
  show,
  cover = false
}: {
  show: boolean
  cover?: boolean
}) {
  const [exists, setExists] = useState<boolean>(show)
  const [visible, setVisible] = useState<boolean>(show)

  useEffect(() => {
    if (show) {
      setExists(true)
      setTimeout(() => setVisible(true), 0)
    } else {
      setVisible(false)
      setTimeout(() => setExists(false), 200)
    }
  }, [show])

  return (
    <>
      {exists && (
        <div className={containerCSS(visible, cover)}>
          <Icon src={load} className={iconCSS} />
        </div>
      )}
    </>
  )
}
