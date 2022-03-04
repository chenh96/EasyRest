import { useState, useEffect } from 'react'
import { expectData } from '../../../util/store'
import { format } from 'date-fns'
import { paramsPartCSS, requestBodyCSS } from './css'
import { ParamType, RequestDetails, RequestMethod } from '../const'
import { doRequest } from '../../../util/request'
import RequestResult from './RequestResult'
import Blank from '../../../comp/Blank'
import RequestUrl from './RequestUrl'
import KeyValues from './KeyValues'
import Switch from '../../../comp/Switch'
import Input from '../../../comp/Input'

// const TYPES: { label: string; value: ParamType }[] = [
//   { label: '参数', value: 'Params' },
//   { label: '请求体', value: 'Body' },
//   { label: '请求头', value: 'Header' }
// ]

export const TYPES: {
  label: string
  value: string
  supports: RequestMethod[]
}[] = [
  { label: '参数', value: 'Params', supports: ['GET', 'DELETE', 'POST'] },
  { label: '请求体', value: 'Body', supports: ['POST'] },
  { label: '请求头', value: 'Header', supports: ['GET', 'DELETE', 'POST'] }
]

export default function Form({
  request,
  codeFont = 'inherit',
  onChange = () => {}
}: {
  request: RequestDetails
  codeFont?: string
  onChange?: (request: RequestDetails) => void
}) {
  const [activeParamType, setActiveParamType] = useState<ParamType>('Params')
  const [requesting, setRequesting] = useState<boolean>(false)

  return (
    <>
      <div className={paramsPartCSS}>
        <RequestUrl
          request={request}
          onChange={onChange}
          onRequest={() => {
            const begin = new Date()
            setRequesting(true)
            doRequest(request)
              .then((result) => {
                const end = new Date()
                onChange({
                  ...request,
                  result,
                  time: format(end, 'yyyy-MM-dd HH:mm:ss'),
                  duration: end.getTime() - begin.getTime()
                })
              })
              .finally(() => setRequesting(false))
          }}
        />

        <Blank block size={8} />

        <Switch
          options={TYPES.filter((type) =>
            type.supports.includes(request.method)
          )}
          value={activeParamType}
          onChange={(value) => setActiveParamType(value as ParamType)}
        />

        {activeParamType === 'Params' && (
          <KeyValues
            params={request.params}
            onChange={(params) => onChange({ ...request, params })}
          />
        )}

        {activeParamType === 'Body' && (
          <Input
            className={requestBodyCSS(codeFont)}
            mutliple
            value={request.body}
            onInput={(body) => onChange({ ...request, body })}
          />
        )}

        {activeParamType === 'Header' && (
          <KeyValues
            params={request.headers}
            onChange={(headers) => onChange({ ...request, headers })}
          />
        )}
      </div>

      <RequestResult
        request={request}
        requesting={requesting}
        codeFont={codeFont}
      />
    </>
  )
}
