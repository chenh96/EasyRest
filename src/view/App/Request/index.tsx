import { css } from '@emotion/css'
import { Request } from '../../util/request'
import { findIndex } from '../../util/collection'
import Menu from './Menu'
import Details from './Details'
import Result from './Result'

export default ({
  activated,
  requests,
  onActive,
  onChange,
  font,
  wrap,
  onChangeWrap
}: {
  activated: number
  requests: Request[]
  onActive: (index: number) => void
  onChange: (requests: Request[]) => void
  font: string
  wrap: boolean
  onChangeWrap: (wrap: boolean) => void
}) => {
  return (
    <div className={style().container()}>
      <Menu
        activated={activated}
        requests={requests}
        onSort={(newRequests) => {
          onActive(findIndex(newRequests, (request) => request.id === requests[activated].id))
          onChange(newRequests)
        }}
        onActive={onActive}
      />

      <Details
        request={requests[activated]}
        onChange={(request) => {
          const newRequests = [...requests]
          newRequests.splice(activated, 1, request)
          onChange(newRequests)
        }}
        font={font}
      />

      <Result request={requests[activated]} font={font} wrap={wrap} onChangeWrap={onChangeWrap} />
    </div>
  )
}

const style = () => {
  const container = () => css({ height: '100%', display: 'flex' })

  return { container }
}
