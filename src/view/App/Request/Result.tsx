import { useState } from 'react'
import { css } from '@emotion/css'
import { Request } from '../../util/request'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BsTextParagraph, BsClipboard, BsClock } from 'react-icons/bs'
import Button from '../../comp/Button'
import Space from '../../comp/Space'

export default ({
  request,
  font,
  wrap,
  onChangeWrap
}: {
  request: Request
  font: string
  wrap: boolean
  onChangeWrap: (wrap: boolean) => void
}) => {
  return (
    <div className={style().container()}>
      <TopBar
        wrap={wrap}
        onWrap={onChangeWrap}
        content={request.result ?? 'EasyRest'}
        duration={request.duration ?? -1}
      />

      <textarea className={style().content(wrap, font)} value={request.result ?? ''} onInput={() => {}} />
    </div>
  )
}

const TopBar = ({
  wrap,
  onWrap,
  content,
  duration
}: {
  wrap: boolean
  onWrap: (wrap: boolean) => void
  content: string
  duration: number
}) => {
  return (
    <div className={style().topBar()}>
      <Button className={style().wrapper(wrap)} onClick={() => onWrap(!wrap)}>
        <BsTextParagraph />
        <Space />
        <span>换行</span>
      </Button>

      <CopyToClipboard text={content}>
        <Button>
          <BsClipboard />
          <Space />
          <span>复制</span>
        </Button>
      </CopyToClipboard>

      {duration >= 0 && (
        <>
          <Space />

          <div className={style().status()}>
            <BsClock />
            <Space />
            <span>{duration}ms</span>
          </div>
        </>
      )}
    </div>
  )
}

const style = () => {
  const container = () => css({ flex: 3, overflow: 'hidden' })

  const topBar = () =>
    css({
      height: '40px',
      padding: '5px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    })

  const status = () =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      height: '30px',
      padding: '0 5px'
    })

  const wrapper = (wrap: boolean) =>
    css({
      backgroundColor: wrap ? 'rgb(215, 215, 215)' : 'rgb(255, 255, 255)',
      ':hover': {
        backgroundColor: wrap ? 'rgb(215, 215, 215)' : 'rgb(235, 235, 235)'
      }
    })

  const content = (wrap: boolean, font: string) =>
    css({
      width: 'calc(100% - 10px)',
      height: 'calc(100% - 92px)',
      resize: 'none',
      border: 'none',
      padding: '5px',
      fontFamily: font,
      cursor: 'auto',
      overflow: 'auto',
      margin: '5px',
      whiteSpace: wrap ? 'pre-wrap' : 'pre',
      wordBreak: 'break-all'
    })

  return { container, topBar, status, wrapper, content }
}
