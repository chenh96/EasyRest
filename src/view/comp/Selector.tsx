import { useEffect, useRef, useState } from 'react'
import { cx, css, keyframes } from '@emotion/css'
import { BsChevronDown } from 'react-icons/bs'
import { BasicType } from '../util/types'

export default <E extends BasicType>({
  options,
  value,
  onSelect,
  containerClass,
  displayClass,
  iconClass,
  listClass,
  itemClass
}: {
  options: E[] | readonly E[]
  value: E
  onSelect?: (value: E) => void
  containerClass?: string
  displayClass?: string
  iconClass?: string
  listClass?: string
  itemClass?: string
}) => {
  const [showList, setShowList] = useState(false)
  const [existList, setExistList] = useState(showList)
  useEffect(() => {
    if (showList) {
      setExistList(true)
    } else {
      setTimeout(() => setExistList(false), 200)
    }
  }, [showList])

  const displayRef = useRef<HTMLButtonElement>(null)
  const clickHide = (e: MouseEvent) => displayRef.current?.contains(e.target as Node) || setShowList(false)
  useEffect(() => {
    document.addEventListener('click', clickHide)
    return () => document.removeEventListener('click', clickHide)
  }, [])

  return (
    <div className={cx(style().container(), containerClass)}>
      <button
        className={cx(style().display(), displayClass)}
        ref={displayRef}
        onClick={() => setShowList((prev) => !prev)}
      >
        <span>{value}</span>
        <BsChevronDown className={cx(style().icon(showList), iconClass)} />
      </button>
      <div className={cx(style().list(existList, showList), listClass)}>
        {options.map((option) => (
          <button key={`${option}`} className={cx(style().item(), itemClass)} onClick={() => onSelect?.(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

const style = () => {
  const container = () =>
    css({
      position: 'relative',
      display: 'inline-block'
    })

  const display = () =>
    css({
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      minWidth: '100px',
      height: '30px',
      border: '1px solid rgba(40, 50, 60, 0.2)',
      borderRadius: '2px',
      padding: '0 22px 0 10px',
      backgroundColor: 'rgb(244, 245, 246)',
      cursor: 'pointer',
      zIndex: 2,
      transition: 'background-color 0.1s ease',
      ':hover': {
        backgroundColor: 'rgb(234, 235, 236)'
      },
      ':active': {
        backgroundColor: 'rgb(214, 215, 216)'
      }
    })

  const icon = (showList: boolean) =>
    css({
      position: 'absolute',
      right: '5px',
      top: 0,
      bottom: 0,
      margin: 'auto',
      color: 'rgba(0, 0, 0, 0.5)',
      transform: showList ? 'rotateX(180deg)' : 'none',
      transition: 'transform 0.2s ease'
    })

  const listShowAnimation = () =>
    keyframes({
      from: {
        opacity: 0,
        transform: 'translateY(-30px)'
      },
      to: {
        opacity: 1,
        transform: 'none'
      }
    })

  const listHideAnimation = () =>
    keyframes({
      from: {
        opacity: 1,
        transform: 'none'
      },
      to: {
        opacity: 0,
        transform: 'translateY(-30px)'
      }
    })

  const list = (exist: boolean, show: boolean) =>
    css({
      display: exist ? 'block' : 'none',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 'calc(100% - 1px)',
      backgroundColor: 'rgb(255, 255, 255)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(40, 50, 60, 0.2)',
      borderRadius: '2px',
      overflow: 'hidden',
      opacity: show ? 1 : 0,
      transform: show ? 'none' : 'translateY(-25%)',
      animation: `${show ? listShowAnimation() : listHideAnimation()} 0.2s ease`,
      zIndex: 1
    })

  const item = () =>
    css({
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '30px',
      padding: '0 10px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.1s ease',
      ':hover': {
        backgroundColor: 'rgb(234, 235, 236)'
      },
      ':active': {
        backgroundColor: 'rgb(214, 215, 216)'
      }
    })

  return { container, display, icon, list, item }
}
