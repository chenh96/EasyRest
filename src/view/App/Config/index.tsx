import { css } from '@emotion/css'
import { openGithub } from '../../util/ipc'
import { BsFonts, BsHourglassSplit, BsGithub, BsArrowRight } from 'react-icons/bs'
import Input from '../../comp/Input'
import Space from '../../comp/Space'
import Button from '../../comp/Button'

export default ({
  font,
  onChangeFont,
  timeout,
  onChangeTimeout
}: {
  font: string
  onChangeFont: (font: string) => void
  timeout: number
  onChangeTimeout: (timeout: number) => void
}) => {
  return (
    <div className={style().container()}>
      <div className={style().panel()}>
        <div className={style().icon()}>
          <BsFonts />
        </div>

        <div className={style().intro()}>
          <div className={style().title()}>
            <span>代码字体</span>
          </div>
          <div className={style().comment()}>控制代码编辑或显示的字体</div>
        </div>

        <Input className={style().input()} value={font} onInput={onChangeFont} type="text" />
      </div>

      <div className={style().panel()}>
        <div className={style().icon()}>
          <BsHourglassSplit />
        </div>

        <div className={style().intro()}>
          <div className={style().title()}>
            <span>请求超时</span>
          </div>
          <div className={style().comment()}>请求接口的超时时间(ms)</div>
        </div>

        <Input className={style().input()} value={timeout} onInput={onChangeTimeout} type="number" />
      </div>

      <div className={style().panel()}>
        <div className={style().icon()}>
          <BsGithub />
        </div>

        <div className={style().intro()}>
          <div className={style().title()}>
            <span>GitHub</span>
          </div>
          <div className={style().comment()}>本项目的首页</div>
        </div>

        <Button className={style().input()} onClick={openGithub}>
          <span>前往 GitHub</span>
          <Space />
          <BsArrowRight />
        </Button>
      </div>
    </div>
  )
}

const style = () => {
  const container = () =>
    css({
      padding: '10px 0 0 10px',
      height: 'calc(100% - 41px)',
      overflow: 'auto'
    })

  const panel = () =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60px',
      width: '600px',
      margin: '0 10px 10px 0',
      paddingRight: '15px'
    })

  const icon = () =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      width: '60px',
      height: '60px'
    })

  const intro = () => css({ flex: 2 })

  const title = () => css({ fontWeight: 'bold', fontSize: '14px' })

  const comment = () => css({})

  const input = () => css({ flex: 3 })

  return { container, panel, icon, intro, title, comment, input }
}
