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

      <pre className={style().content(wrap, font)}>
        <code>{request.result}</code>
      </pre>
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
      backgroundColor: wrap ? 'rgb(214, 215, 216)' : 'rgb(255, 255, 255)',
      ':hover': {
        backgroundColor: wrap ? 'rgb(214, 215, 216)' : 'rgb(234, 235, 236)'
      }
    })

  const content = (wrap: boolean, font: string) =>
    css({
      width: '100%',
      height: 'calc(100% - 81px)',
      margin: 0,
      userSelect: 'text',
      padding: '5px',
      fontFamily: font,
      cursor: 'auto',
      overflow: 'auto',
      whiteSpace: wrap ? 'pre-wrap' : 'pre',
      wordBreak: 'break-all'
    })

  return { container, topBar, status, wrapper, content }
}
