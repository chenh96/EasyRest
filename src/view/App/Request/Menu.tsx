import { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/css'
import { getRequestTitle, Mark, Request } from '../../util/request'
import { ReactSortable } from 'react-sortablejs'
import Button from '../../comp/Button'
import Space from '../../comp/Space'

export default ({
  activated,
  requests,
  onSort,
  onActive
}: {
  activated: number
  requests: Request[]
  onSort: (requests: Request[]) => void
  onActive: (index: number) => void
}) => {
  const [dragging, setDragging] = useState(false)

  const scrollerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!scrollerRef.current) {
      return
    }

    const scrollerHeight = scrollerRef.current.clientHeight
    const scrollTop = scrollerRef.current.scrollTop

    const minOffset = 30 * (activated + 1) + 10 - scrollerHeight
    const maxOffset = 30 * activated

    if (scrollTop < minOffset) {
      scrollerRef.current.scrollTo({ top: minOffset, behavior: 'smooth' })
    } else if (scrollTop > maxOffset) {
      scrollerRef.current.scrollTo({ top: maxOffset, behavior: 'smooth' })
    }
  }, [activated])

  return (
    <div ref={scrollerRef} className={style().container()}>
      <ReactSortable
        className={style().list()}
        list={requests}
        setList={onSort}
        animation={200}
        onStart={() => setDragging(true)}
        onEnd={() => setDragging(false)}
      >
        {requests.map((request, index) => (
          <Button
            key={request.id}
            className={style().item(activated === index, dragging)}
            onClick={() => onActive(index)}
          >
            <span className={style().index(request.mark)}>{index + 1}</span>
            <Space />
            <span>{getRequestTitle(request.url)}</span>
          </Button>
        ))}
      </ReactSortable>
    </div>
  )
}

const style = () => {
  const container = () =>
    css({
      flex: 2,
      borderRight: '1px solid rgba(40, 50, 60, 0.2)',
      height: 'calc(100% - 41px)',
      overflow: 'auto',
      padding: '5px'
    })

  const list = () => css({})

  const item = (activated: boolean, dragging: boolean) =>
    css({
      display: 'block',
      width: '100%',
      textAlign: 'left',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      backgroundColor: activated ? 'rgb(214, 215, 216)' : 'rgb(255, 255, 255)',
      ':hover': {
        backgroundColor: dragging
          ? activated
            ? 'rgb(214, 215, 216)'
            : 'rgb(255, 255, 255)'
          : activated
          ? 'rgb(214, 215, 216)'
          : 'rgb(234, 235, 236)'
      },
      ':active': {
        backgroundColor: dragging ? (activated ? 'rgb(214, 215, 216)' : 'rgb(255, 255, 255)') : 'rgb(214, 215, 216)'
      }
    })

  const index = (mark: Mark) => css({ fontWeight: 'bold', color: mark })

  return { container, list, item, index }
}
