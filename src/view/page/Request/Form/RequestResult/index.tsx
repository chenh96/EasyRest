import { RequestDetails } from '../../const'
import { containerCSS, resultCodeCSS, resultStatusCSS } from './css'
import Blank from '../../../../comp/Blank'
import Load from '../../../../comp/Load'

export default function RequestResult({
  request,
  requesting = false,
  codeFont = 'inherit'
}: {
  request: RequestDetails
  requesting?: boolean
  codeFont?: string
}) {
  return (
    <div className={containerCSS}>
      <div className={resultStatusCSS}>
        {request.time}
        <Blank />
        {request.duration ? `耗时 ${request.duration}ms` : ''}
      </div>

      <pre className={resultCodeCSS(codeFont)}>{request.result}</pre>

      <Load show={requesting} />
    </div>
  )
}
