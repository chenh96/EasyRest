import { useEffect, useState } from 'react'
import { expectData, saveData } from '../../util/store'
import { containerCSS } from './css'
import ConfigInput from './ConfigInput'
import Nav from '../../comp/Nav'
import Content from '../../comp/Content'
import Load from '../../comp/Load'

export default function Config() {
  const [requestTimeout, setRequestTimeout] = useState<number>(0)
  const [maxTabs, setMaxTabs] = useState<number>(0)
  const [codeFont, setCodeFont] = useState<string>('')

  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  useEffect(() => {
    if (firstLoad) {
      Promise.all([
        expectData('Timeout', 10000),
        expectData('MaxTabs', 10),
        expectData('CodeFont', 'Consolas'),
      ])
        .then((results) => {
          setRequestTimeout(results[0])
          setMaxTabs(results[1])
          setCodeFont(results[2])
        })
        .finally(() => setTimeout(() => setFirstLoad(false), 100))
    }
  }, [])

  useEffect(() => {
    saveData('Timeout', requestTimeout)
  }, [requestTimeout])
  useEffect(() => {
    saveData('MaxTabs', maxTabs)
  }, [maxTabs])
  useEffect(() => {
    saveData('CodeFont', codeFont)
  }, [codeFont])

  return (
    <>
      <Nav />

      <Content>
        <div className={containerCSS}>
          <ConfigInput
            title="请求超时"
            comment="请求时的超时毫秒数"
            maxLength={8}
            value={`${requestTimeout}`}
            onInput={(value) => {
              try {
                setRequestTimeout(parseInt(value))
              } catch (err) {}
            }}
          />

          <ConfigInput
            title="最大标签数"
            comment="能够打开的最大标签数量"
            maxLength={2}
            value={`${maxTabs}`}
            onInput={(value) => {
              try {
                setMaxTabs(parseInt(value))
              } catch (err) {}
            }}
          />

          <ConfigInput
            title="代码字体"
            comment="应用中代码部分的 CSS 字体"
            value={codeFont}
            onInput={setCodeFont}
          />
        </div>
      </Content>

      <Load show={firstLoad} cover />
    </>
  )
}
