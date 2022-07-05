import { useState } from 'react'
import { css } from '@emotion/css'
import { getRequestTitle, Request } from '../../util/request'
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

  return (
    <div className={style().container()}>
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
            <span className={style().index()}>{index + 1}</span>
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
      overflow: 'hidden',
      borderRight: '1px solid rgba(0, 0, 0, 0.2)',
      padding: '5px'
    })

  const list = () => css({ height: 'calc(100% - 41px)', overflow: 'auto' })

  const item = (activated: boolean, dragging: boolean) =>
    css({
      display: 'block',
      width: '100%',
      textAlign: 'left',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      backgroundColor: activated ? 'rgb(215, 215, 215)' : 'rgb(255, 255, 255)',
      ':hover': {
        backgroundColor: dragging
          ? activated
            ? 'rgb(215, 215, 215)'
            : 'rgb(255, 255, 255)'
          : activated
          ? 'rgb(215, 215, 215)'
          : 'rgb(235, 235, 235)'
      },
      ':active': {
        backgroundColor: dragging ? (activated ? 'rgb(215, 215, 215)' : 'rgb(255, 255, 255)') : 'rgb(215, 215, 215)'
      }
    })

  const index = () => css({ fontWeight: 'bold' })

  return { container, list, item, index }
}
