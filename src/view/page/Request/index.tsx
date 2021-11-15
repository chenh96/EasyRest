import { useEffect, useState } from 'react'
import { RequestDetails } from './const'
import { expectData, saveData } from '../../util/store'
import Load from '../../comp/Load'
import Nav from '../../comp/Nav'
import Content from '../../comp/Content'
import Tabs from './Tabs'
import Form from './Form'

export default function Request() {
  const [requests, setReqeusts] = useState<RequestDetails[]>([newRequest()])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [maxTabs, setMaxTabs] = useState<number>(0)
  const [codeFont, setCodeFont] = useState<string>('')
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  useEffect(() => {
    if (firstLoad) {
      Promise.all([
        expectData('Requests', [newRequest()]),
        expectData('ActiveIndex', 0),
        expectData('MaxTabs', 10),
        expectData('CodeFont', 'Consolas'),
      ])
        .then((results) => {
          setReqeusts(results[0])
          setActiveIndex(results[1])
          setMaxTabs(results[2])
          setCodeFont(results[3])
        })
        .finally(() => setTimeout(() => setFirstLoad(false), 100))
    }
  }, [])

  useEffect(() => {
    saveData('Requests', requests)
  }, [requests])
  useEffect(() => {
    saveData('ActiveIndex', activeIndex)
  }, [activeIndex])

  return (
    <>
      <Nav />
      <Content>
        <Tabs
          requests={requests}
          active={activeIndex}
          limited={requests.length >= maxTabs}
          onSort={(sorted) => {
            setReqeusts(sorted)
            setActiveIndex((prev) =>
              sorted.findIndex((request) => request.id === requests[prev].id)
            )
          }}
          onActive={setActiveIndex}
          onAdd={() => {
            setActiveIndex(requests.length)
            setReqeusts((prev) => [...prev, newRequest()])
          }}
          onClose={() => {
            setActiveIndex((prev) => (prev <= 0 ? 0 : prev - 1))
            setReqeusts((prev) => {
              const newRequests = [...prev]
              newRequests.splice(activeIndex, 1)
              if (newRequests.length <= 0) {
                newRequests.push(newRequest())
              }
              return newRequests
            })
          }}
          onCopy={() => {
            setActiveIndex((prev) => prev + 1)
            setReqeusts((prev) => {
              const newRequests = [...prev]
              newRequests.splice(activeIndex, 0, {
                ...requests[activeIndex],
                id: randomId(),
              })
              return newRequests
            })
          }}
        />

        <Form
          request={requests[activeIndex]}
          codeFont={codeFont}
          onChange={(request) =>
            setReqeusts((prev) => {
              const newRequests = [...prev]
              newRequests.splice(activeIndex, 1, request)
              return newRequests
            })
          }
        />
      </Content>

      <Load show={firstLoad} cover />
    </>
  )
}

function randomId(): string {
  return `${new Date().getTime()}-${Math.round(Math.random() * 1000)}`
}

function newRequest(): RequestDetails {
  return {
    id: randomId(),
    url: '',
    method: 'GET',
    params: [['', '']],
    // data: [['', '']],
    headers: [['', '']],
    body: '',
    result: '',
  }
}
