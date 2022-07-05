import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/css'
import { BsArrowLeftCircle, BsGear, BsBug, BsPlusCircle, BsStickies, BsTrash } from 'react-icons/bs'
import Space from '../comp/Space'
import Button from '../comp/Button'
import { toggleDevTools } from '../util/ipc'

export default ({ onAdd, onCopy, onRemove }: { onAdd: () => void; onCopy: () => void; onRemove: () => void }) => {
  const location = useLocation()

  return (
    <nav className={style().container()}>
      {location.pathname === '/config' && (
        <Link to="/" draggable={false}>
          <Button>
            <BsArrowLeftCircle />
            <Space />
            <span>返回</span>
          </Button>
        </Link>
      )}

      {location.pathname === '/' && (
        <Link to="/config" draggable={false}>
          <Button>
            <BsGear />
            <Space />
            <span>设置</span>
          </Button>
        </Link>
      )}

      <Button onClick={toggleDevTools}>
        <BsBug />
        <Space />
        <span>控制台</span>
      </Button>

      {location.pathname === '/' && (
        <>
          <div className={style().separator()}></div>

          <Button onClick={onAdd}>
            <BsPlusCircle />
            <Space />
            <span>新增</span>
          </Button>
          <Button onClick={onCopy}>
            <BsStickies />
            <Space />
            <span>复制</span>
          </Button>
          <Button onClick={onRemove}>
            <BsTrash />
            <Space />
            <span>删除</span>
          </Button>
        </>
      )}
    </nav>
  )
}

const style = () => {
  const container = () => css({ borderBottom: '1px solid rgba(0, 0, 0, 0.2)', padding: '5px' })

  const separator = () =>
    css({
      display: 'inline-block',
      width: '2px',
      height: '20px',
      margin: '5px',
      borderRadius: '1px',
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    })

  return { container, separator }
}
