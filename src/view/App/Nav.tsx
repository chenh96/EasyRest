import { Link, useLocation } from 'react-router-dom'
import { css } from '@emotion/css'
import { toggleDevTools } from '../util/ipc'
import { Mark, marks } from '../util/request'
import {
  BsArrowLeftCircle,
  BsGear,
  BsBug,
  BsPlusCircle,
  BsStickies,
  BsTrash
} from 'react-icons/bs'
import Space from '../comp/Space'
import Button from '../comp/Button'
import logoImg from '../img/logo.png'

export default ({
  onAdd,
  onCopy,
  onRemove,
  onMark
}: {
  onAdd: () => void
  onCopy: () => void
  onRemove: () => void
  onMark: (mark: Mark) => void
}) => {
  const location = useLocation()

  return (
    <nav className={style().container()}>
      <Link to="/" draggable={false}>
        <Button className={style().logo()}>
          <img src={logoImg} />
          <Space />
          <span>EasyRest</span>
        </Button>
      </Link>

      <div className={style().separator()}></div>

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

          <Button onClick={onAdd} className={style().add()}>
            <BsPlusCircle />
            <Space />
            <span>新增</span>
          </Button>
          <Button onClick={onCopy} className={style().copy()}>
            <BsStickies />
            <Space />
            <span>复制</span>
          </Button>
          <Button onClick={onRemove} className={style().remove()}>
            <BsTrash />
            <Space />
            <span>删除</span>
          </Button>
        </>
      )}

      {location.pathname === '/' && (
        <>
          <div className={style().separator()}></div>

          {marks.map((mark) => (
            <Button
              className={style().marker(mark)}
              onClick={() => onMark(mark)}
            ></Button>
          ))}
        </>
      )}
    </nav>
  )
}

const style = () => {
  const container = () =>
    css({
      borderBottom: '1px solid rgba(40, 50, 60, 0.2)',
      padding: '5px',
      userSelect: 'none',
      '-webkit-app-region': 'drag',
      button: {
        '-webkit-app-region': 'no-drag'
      }
    })

  const logo = () =>
    css({
      span: {
        color: 'rgba(40,180,180)',
        fontWeight: 'bold'
      },
      img: {
        width: '16px',
        height: '16px'
      }
    })

  const separator = () =>
    css({
      display: 'inline-block',
      width: '2px',
      height: '20px',
      margin: '5px',
      borderRadius: '1px',
      backgroundColor: 'rgba(40, 50, 60, 0.2)'
    })

  const add = () => css({ color: 'rgb(0, 150, 0)' })

  const copy = () => css({ color: 'rgb(255, 150, 0)' })

  const remove = () => css({ color: 'rgb(255, 0, 0)' })

  const marker = (color: string) =>
    css({
      marginTop: '7.5px',
      padding: 0,
      width: '15px',
      height: '15px',
      borderRadius: '10px',
      marginLeft: '10px',
      backgroundColor: color,
      transition: 'transform 0.2s ease',
      ':hover': {
        backgroundColor: color,
        transform: 'scale(1.2)'
      },
      ':active': {
        backgroundColor: color,
        transform: 'scale(1.1)'
      }
    })

  return { container, logo, separator, add, copy, remove, marker }
}
