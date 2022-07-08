import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { css } from '@emotion/css'
import { nanoid } from 'nanoid'
import { useStores } from '../util/store'
import { newRequest } from '../util/request'
import Nav from './Nav'
import Request from './Request'
import Config from './Config'

export default () => {
  const [{ requests, activated, font, timeout, wrap }, setStore, loadingStore] = useStores()

  return (
    <HashRouter>
      <div className={style().container()}>
        {loadingStore || (
          <>
            <Nav
              onAdd={() => {
                setStore('requests', [...requests, newRequest()])
                setStore('activated', requests.length)
              }}
              onCopy={() => {
                const newRequests = [...requests]
                newRequests.splice(activated, 0, { ...requests[activated], id: nanoid() })
                setStore('requests', newRequests)
                setStore('activated', activated + 1)
              }}
              onRemove={() => {
                const newRequests = [...requests]
                newRequests.splice(activated, 1)

                if (newRequests.length <= 0) {
                  newRequests.push(newRequest())
                }

                setStore('requests', newRequests)
                setStore('activated', activated > 0 ? activated - 1 : 0)
              }}
              onMark={(mark) => {
                const newRequests = [...requests]
                newRequests.splice(activated, 1, { ...requests[activated], mark })
                setStore('requests', newRequests)
              }}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Request
                    activated={activated}
                    requests={requests}
                    onActive={(id) => setStore('activated', id)}
                    onChange={(requests) => setStore('requests', requests)}
                    font={font}
                    wrap={wrap}
                    onChangeWrap={(wrap) => setStore('wrap', wrap)}
                  />
                }
              />
              <Route
                path="/config"
                element={
                  <Config
                    font={font}
                    onChangeFont={(font) => setStore('font', font)}
                    timeout={timeout}
                    onChangeTimeout={(timeout) => setStore('timeout', timeout)}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </HashRouter>
  )
}

const style = () => {
  const container = () =>
    css({
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      minWidth: '700px',
      minHeight: '500px',
      lineHeight: '16px',
      color: 'rgb(0, 0, 0)',
      cursor: 'default',
      userSelect: 'none',
      fontSize: '12px',
      fontFamily: 'system-ui',
      '*': {
        boxSizing: 'border-box',
        color: 'inherit',
        textDecoration: 'none',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        userSelect: 'inherit',
        cursor: 'inherit',
        outline: 'none',
        lineHeight: 'inherit',
        verticalAlign: 'top',
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px'
        },
        '::-webkit-scrollbar-corner': {
          backgroundColor: 'transparent'
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(40, 50, 60, 0.05)',
          border: '1px solid rgba(40, 50, 60, 0.1)',
          borderRadius: '5px'
        }
      }
    })

  return { container }
}
