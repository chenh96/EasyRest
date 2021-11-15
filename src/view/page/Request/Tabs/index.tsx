import { useRef, useState } from 'react'
import { containerCSS, operationCSS, scrollerCSS, tabCSS } from './css'
import { RequestDetails } from '../const'
import { urlToTab } from '../../../util/string'
import { ReactSortable } from 'react-sortablejs'
import Icon from '../../../comp/Icon'
import Button from '../../../comp/Button'
import left from '../../../asset/left.png'
import right from '../../../asset/right.png'
import add from '../../../asset/add.png'
import close from '../../../asset/close.png'
import copy from '../../../asset/copy.png'

const SCROLL_STEP = 200

export default function Tabs({
  requests,
  active,
  limited = false,
  onSort = () => {},
  onActive = () => {},
  onAdd = () => {},
  onClose = () => {},
  onCopy = () => {},
}: {
  requests: RequestDetails[]
  active: number
  limited?: boolean
  onSort?: (requests: RequestDetails[]) => void
  onActive?: (index: number) => void
  onAdd?: () => void
  onClose?: () => void
  onCopy?: () => void
}) {
  const [dragging, setDragging] = useState<boolean>(false)
  const $scroller = useRef<HTMLDivElement>(null)

  return (
    <div className={containerCSS}>
      <Button
        className={operationCSS}
        onClick={() => {
          if ($scroller.current) {
            const currentLeft = $scroller.current.scrollLeft
            $scroller.current.scrollTo({
              left: currentLeft - SCROLL_STEP,
              behavior: 'smooth',
            })
          }
        }}
      >
        <Icon src={left} />
      </Button>

      <div
        className={scrollerCSS}
        ref={$scroller}
        onWheel={(e) => {
          if ($scroller.current) {
            const currentLeft = $scroller.current.scrollLeft
            $scroller.current.scrollTo({
              left: currentLeft + e.deltaY,
            })
          }
        }}
      >
        <ReactSortable
          list={requests}
          setList={onSort}
          onStart={() => setDragging(true)}
          onEnd={() => setTimeout(() => setDragging(false), 100)}
        >
          {requests.map((request, index) => (
            <Button
              className={tabCSS(index === active, !dragging)}
              key={index}
              onClick={() => onActive(index)}
            >
              <span>{urlToTab(request.url)}</span>
            </Button>
          ))}
        </ReactSortable>
      </div>

      <Button
        className={operationCSS}
        onClick={() => {
          if ($scroller.current) {
            const currentLeft = $scroller.current.scrollLeft
            $scroller.current.scrollTo({
              left: currentLeft + SCROLL_STEP,
              behavior: 'smooth',
            })
          }
        }}
      >
        <Icon src={right} />
      </Button>

      <Button
        className={operationCSS}
        onClick={() => {
          new Promise((resolve) => resolve(onAdd())).then(() => {
            if ($scroller.current) {
              const currentWidth = $scroller.current.scrollWidth
              $scroller.current.scrollTo({
                left: currentWidth,
                behavior: 'smooth',
              })
            }
          })
        }}
        disabled={limited}
      >
        <Icon src={add} />
      </Button>

      <Button
        className={operationCSS}
        onClick={() => {
          new Promise((resolve) => resolve(onCopy())).then(() => {
            if ($scroller.current) {
              const currentWidth = $scroller.current.scrollWidth
              $scroller.current.scrollTo({
                left: currentWidth,
                behavior: 'smooth',
              })
            }
          })
        }}
        disabled={limited}
      >
        <Icon src={copy} size={14} />
      </Button>

      <Button className={operationCSS} onClick={onClose}>
        <Icon src={close} />
      </Button>
    </div>
  )
}
