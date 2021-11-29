import { RequestDetails, RequestMethod } from '../../const'
import { methodCSS, urlCSS, requestCSS } from './css'
import Select from '../../../../comp/Select'
import Input from '../../../../comp/Input'
import Button from '../../../../comp/Button'
import Icon from '../../../../comp/Icon'
import Blank from '../../../../comp/Blank'
import go from '../../../../asset/go.png'

const METHODS: { label: string; value: RequestMethod }[] = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'DELETE', value: 'DELETE' },
  { label: 'PUT', value: 'PUT' },
]

export default function RequestUrl({
  request,
  onChange = () => {},
  onRequest = () => {},
}: {
  request: RequestDetails
  onChange?: (request: RequestDetails) => void
  onRequest?: () => void
}) {
  return (
    <div>
      <Select
        options={METHODS}
        value={request.method}
        onSelect={(method) =>
          onChange({ ...request, method: method as RequestMethod })
        }
        className={methodCSS}
      />
      <Input
        placeholder="URL"
        className={urlCSS}
        value={request.url}
        onInput={(url) => onChange({ ...request, url })}
      />
      <Button className={requestCSS} onClick={onRequest}>
        请求
        <Blank size={8} />
        <Icon src={go} />
      </Button>
    </div>
  )
}
