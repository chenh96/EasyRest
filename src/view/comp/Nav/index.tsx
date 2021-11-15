import { Link } from 'react-router-dom'
import { openDevTools } from '../../util/ipc'
import { configCSS, containerCSS, logoCSS } from './css'
import Icon from '../Icon'
import Button from '../Button'
import config from '../../asset/config.png'
import bug from '../../asset/bug.png'

export default function Nav() {
  return (
    <div className={containerCSS}>
      <Link to="/">
        <Button className={logoCSS}>EasyRest</Button>
      </Link>
      <Link to="/config">
        <Button className={configCSS}>
          <Icon src={config} />
        </Button>
      </Link>
      <Button className={configCSS} onClick={openDevTools}>
        <Icon src={bug} />
      </Button>
    </div>
  )
}
