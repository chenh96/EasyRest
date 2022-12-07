import { useEffect, useRef, useState } from 'react'
import { css, cx, keyframes } from '@emotion/css'
import { BsGlobe, BsArrowRepeat, BsXLg, BsCodeSlash, BsFileEarmarkPlus, BsFileEarmark } from 'react-icons/bs'
import {
  Request,
  requestMethods,
  RequestMethod,
  bodyTypes,
  DataType,
  BodyType,
  KeyValuePair,
  FilePair,
  getDataTypesOfMethod,
  doRequest
} from '../../util/request'
import { isNotBlank } from '../../util/string'
import { formatJson } from '../../util/json'
import Space from '../../comp/Space'
import Selector from '../../comp/Selector'
import Input from '../../comp/Input'
import Button from '../../comp/Button'
import Switcher from '../../comp/Switcher'

export default ({
  request,
  onChange,
  font
}: {
  request: Request
  onChange: (request: Request) => void
  font: string
}) => {
  const [requesting, setRequesting] = useState(false)

  useEffect(() => {
    const dataTypes = getDataTypesOfMethod(request.method)
    if (!dataTypes.includes(request.dataType)) {
      onChange({ ...request, dataType: dataTypes[0] })
    }
  }, [request])

  return (
    <div className={style().container()}>
      <URL
        method={request.method}
        url={request.url}
        onChangeMethod={(method) => onChange({ ...request, method })}
        onEditUrl={(url) => onChange({ ...request, url })}
        onRequest={() => {
          setRequesting(true)
          const from = new Date()
          doRequest(request).then((result) => {
            onChange({ ...request, result, duration: new Date().getTime() - from.getTime() })
            setRequesting(false)
          })
        }}
        requesting={requesting}
      />

      <Space vertical />

      <DataTypeSelector
        method={request.method}
        dataType={request.dataType}
        bodyType={request.bodyType}
        onChangeDataType={(dataType) => onChange({ ...request, dataType })}
        onChangeBodyType={(bodyType) => onChange({ ...request, bodyType })}
        onFormatJson={() => onChange({ ...request, json: formatJson(request.json) })}
        onAddFile={(file) => onChange({ ...request, files: [...request.files, ['file', file]] })}
      />

      <Space vertical />

      {request.dataType === 'Params' && (
        <Pairs pairs={request.params} onChange={(params) => onChange({ ...request, params })} />
      )}

      {request.dataType === 'Headers' && (
        <Pairs pairs={request.headers} onChange={(headers) => onChange({ ...request, headers })} />
      )}

      {request.dataType === 'Body' && request.bodyType === 'JSON' && (
        <JSON value={request.json} onChange={(json) => onChange({ ...request, json })} font={font} />
      )}

      {request.dataType === 'Body' && request.bodyType === 'FormData' && (
        <FormData
          form={request.form}
          files={request.files}
          onChangeForm={(form) => onChange({ ...request, form })}
          onChangeFiles={(files) => onChange({ ...request, files })}
        />
      )}
    </div>
  )
}

const URL = ({
  method,
  url,
  onChangeMethod,
  onEditUrl,
  onRequest,
  requesting
}: {
  method: RequestMethod
  url: string
  onChangeMethod: (method: RequestMethod) => void
  onEditUrl: (url: string) => void
  onRequest: () => void
  requesting: boolean
}) => {
  return (
    <div className={style().url()}>
      <Selector
        displayClass={style().methodSelector()}
        options={requestMethods}
        value={method}
        onSelect={onChangeMethod}
      />
      <Space />
      <Input className={style().urlInput()} value={url} onInput={onEditUrl} />
      <Space />
      <Button className={style().requester(requesting)} onClick={onRequest} disabled={requesting}>
        {requesting ? <BsArrowRepeat className={style().requesting()} /> : <BsGlobe />}
        <Space />
        <span>请求</span>
      </Button>
    </div>
  )
}

const DataTypeSelector = ({
  method,
  dataType,
  bodyType,
  onChangeDataType,
  onChangeBodyType,
  onFormatJson,
  onAddFile
}: {
  method: RequestMethod
  dataType: DataType
  bodyType: BodyType
  onChangeDataType: (dataType: DataType) => void
  onChangeBodyType: (bodyType: BodyType) => void
  onFormatJson: () => void
  onAddFile: (file: File) => void
}) => {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className={style().dataTypeSelector()}>
      <Switcher options={getDataTypesOfMethod(method)} value={dataType} onSwitch={onChangeDataType} />

      <Space />

      {dataType === 'Body' && <Switcher options={bodyTypes} value={bodyType} onSwitch={onChangeBodyType} />}

      <Space />

      {dataType === 'Body' && bodyType === 'JSON' && (
        <Button className={style().bodyOperator()} onClick={onFormatJson}>
          <BsCodeSlash />
          <Space />
          <span>格式化</span>
        </Button>
      )}

      {dataType === 'Body' && bodyType === 'FormData' && (
        <Button className={style().bodyOperator()} onClick={() => fileRef.current?.click()}>
          <BsFileEarmarkPlus />
          <Space />
          <span>文件</span>
          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                onAddFile(file)
                e.target.value = ''
              }
            }}
          />
        </Button>
      )}
    </div>
  )
}

const Pairs = ({ pairs, onChange }: { pairs: KeyValuePair[]; onChange: (pairs: KeyValuePair[]) => void }) => {
  useEffect(() => {
    if (pairs.length <= 0 || isNotBlank(pairs[pairs.length - 1][0]) || isNotBlank(pairs[pairs.length - 1][1])) {
      onChange([...pairs, ['', '']])
    }
  }, [pairs])

  const onEdit = (index: number, pair: KeyValuePair) => {
    const newPairs = [...pairs]
    newPairs.splice(index, 1, pair)
    onChange(newPairs)
  }

  const onRemove = (index: number) => {
    const newPairs = [...pairs]
    newPairs.splice(index, 1)
    onChange(newPairs)
  }

  return (
    <div className={style().pairs()}>
      {pairs.map((pair, index) => (
        <div key={index} className={style().pair()}>
          <Input className={style().pairKey()} value={pair[0]} onInput={(value) => onEdit(index, [value, pair[1]])} />
          <Space />
          <Input className={style().pairValue()} value={pair[1]} onInput={(value) => onEdit(index, [pair[0], value])} />
          <Space />
          <Button className={style().pairRemove()} onClick={() => onRemove(index)}>
            <BsXLg />
          </Button>
        </div>
      ))}
    </div>
  )
}

const FormData = ({
  form,
  files,
  onChangeForm,
  onChangeFiles
}: {
  form: KeyValuePair[]
  files: FilePair[]
  onChangeForm: (pairs: KeyValuePair[]) => void
  onChangeFiles: (files: FilePair[]) => void
}) => {
  const onEditFileKey = (index: number, key: string) => {
    const newFiles = [...files]
    files.splice(index, 1, [key, files[index][1]])
    onChangeFiles(newFiles)
  }

  const onRemoveFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    onChangeFiles(newFiles)
  }

  return (
    <div className={style().pairs()}>
      {files.map((file, index) => (
        <div key={index} className={style().pair()}>
          <Input className={style().pairKey()} value={file[0]} onInput={(value) => onEditFileKey(index, value)} />
          <Space />
          <Input className={style().fileValue()} disabled value={file[1].name} />
          <BsFileEarmark className={style().fileIcon()} />
          <Space />
          <Button className={style().pairRemove()} onClick={() => onRemoveFile(index)}>
            <BsXLg />
          </Button>
        </div>
      ))}

      <Pairs pairs={form} onChange={onChangeForm} />
    </div>
  )
}

const JSON = ({ value, onChange, font }: { value: string; onChange: (value: string) => void; font: string }) => {
  return <textarea className={style().json(font)} value={value} onInput={(e) => onChange(e.currentTarget.value)} />
}

const style = () => {
  const container = () =>
    css({
      flex: 4,
      minWidth: '416px',
      height: 'calc(100% - 41px)',
      borderRight: '1px solid rgba(40, 50, 60, 0.2)',
      padding: '5px'
    })

  const url = () => css({ display: 'flex' })

  const methodSelector = () => css({})

  const urlInput = () => css({ flex: 1 })

  const requester = (disabled: boolean) =>
    css({
      border: '1px solid rgba(40, 50, 60, 0.2)',
      backgroundColor: 'rgb(0, 100, 200)',
      color: 'rgb(255, 255, 255)',
      ':hover': {
        backgroundColor: disabled ? 'rgb(0, 100, 200)' : 'rgb(0, 90, 190)'
      },
      ':active': {
        backgroundColor: disabled ? 'rgb(0, 100, 200)' : 'rgb(0, 70, 170)'
      }
    })

  const rotateAnimation = () =>
    keyframes({
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    })

  const requesting = () => css({ animation: `${rotateAnimation()} 1s linear infinite` })

  const dataTypeSelector = () => css({ whiteSpace: 'nowrap', overflow: 'hidden' })

  const bodyOperator = () => css({ border: '1px solid rgba(40, 50, 60, 0.2)', backgroundColor: 'rgb(244, 245, 246)' })

  const pairs = () => css({ maxHeight: 'calc(100% - 70px)', overflow: 'auto', margin: '0 -5px', padding: '0 5px' })

  const pair = () =>
    css({
      display: 'flex',
      position: 'relative',
      marginBottom: '5px',
      ':last-of-type': {
        marginBottom: 0
      }
    })

  const pairKey = () => css({ flex: '35% 1 1' })

  const pairValue = () => css({ flex: '65% 1 1' })

  const pairRemove = () => css({ flexShrink: 0, width: '30px', padding: 0 })

  const fileValue = () => cx(pairValue(), css({ paddingRight: '25px' }))

  const fileIcon = () =>
    css({ position: 'absolute', right: '40px', top: 0, bottom: 0, margin: 'auto', color: 'rgba(0, 0, 0, 0.5)' })

  const json = (font: string) =>
    css({
      display: 'table-column',
      width: '100%',
      height: 'calc(100% - 70px)',
      resize: 'none',
      border: '1px solid rgba(40, 50, 60, 0.2)',
      borderRadius: '2px',
      padding: '5px',
      backgroundColor: 'rgb(244, 245, 246)',
      overflow: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      fontFamily: font,
      cursor: 'auto',
      transition: 'border 0.1s ease',
      ':hover': {
        border: '1px solid rgba(40, 50, 60, 0.4)'
      },
      ':focus': {
        border: '1px solid rgb(0, 100, 200)'
      }
    })

  return {
    container,
    url,
    methodSelector,
    urlInput,
    requester,
    requesting,
    dataTypeSelector,
    bodyOperator,
    pairs,
    pair,
    pairKey,
    pairValue,
    pairRemove,
    fileValue,
    fileIcon,
    json
  }
}
