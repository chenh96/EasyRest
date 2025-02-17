import axios from 'axios'
import { nanoid } from 'nanoid'
import { formatAny } from './json'
import { readData } from './store'
import { isNotBlank } from './string'
import { BasicType, VoidType } from './types'

export const marks = [
  'rgb(0, 0, 0)',
  'rgb(255, 0, 0)',
  'rgb(255, 150, 0)',
  'rgb(0, 150, 0)',
  'rgb(0, 150, 255)',
  'rgb(150, 0, 255)',
] as const
export type Mark = typeof marks[number]

export const requestMethods = [
  'GET',
  'POST',
  'DELETE',
  'PUT',
  'PATCH',
  'OPTIONS',
  'HEAD',
] as const
export type RequestMethod = typeof requestMethods[number]

export const dataTypes = ['Params', 'Body', 'Headers'] as const
export type DataType = typeof dataTypes[number]

export const bodyTypes = ['JSON', 'FormData'] as const
export type BodyType = typeof bodyTypes[number]

export const getDataTypesOfMethod = (method: RequestMethod) => {
  const dataTypesOfMethod: { [Key in RequestMethod]: DataType[] } = {
    GET: ['Params', 'Headers'],
    POST: ['Params', 'Body', 'Headers'],
    DELETE: ['Params', 'Headers'],
    PUT: ['Params', 'Body', 'Headers'],
    PATCH: ['Params', 'Body', 'Headers'],
    OPTIONS: ['Params', 'Headers'],
    HEAD: ['Params', 'Headers'],
  }
  return dataTypesOfMethod[method]
}

export type JsonBody = { [key: string]: JsonBody | BasicType | VoidType }

export type KeyValuePair = [string, string]
export type FilePair = [string, File]

export type Request = {
  id: string
  url: string
  method: RequestMethod
  dataType: DataType
  bodyType: BodyType
  headers: KeyValuePair[]
  params: KeyValuePair[]
  json: string
  form: KeyValuePair[]
  files: FilePair[]
  result?: string
  duration?: number
  mark: Mark
}

export const newRequest: () => Request = () => ({
  id: nanoid(),
  url: '',
  method: 'GET',
  dataType: 'Params',
  bodyType: 'JSON',
  headers: [['', '']],
  params: [['', '']],
  json: '',
  form: [['', '']],
  files: [],
  mark: 'rgb(0, 0, 0)',
})

export const checkUrl = (url: string) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    return `http://${url}`
  }
}

export const getRequestTitle = (url: string) => {
  if (url === null || url === undefined || url.trim().length <= 0) {
    return '新请求'
  }

  return url
}

const pairsToObject = <V>(pairs: [string, V][]) => {
  const obj: { [key: string]: V } = {}
  pairs
    .filter((pair) => isNotBlank(pair[0]))
    .forEach((pair) => (obj[pair[0]] = pair[1]))
  return obj
}

const pairsToFormData = (pairs: [string, string | File][]) => {
  const formData = new FormData()
  pairs.forEach(([key, val]) => formData.append(key, val))
  return formData
}

export const doRequest = async (request: Request) => {
  return new Promise<string>(async (resolve) => {
    axios
      .request({
        timeout: await readData('timeout'),
        url: checkUrl(request.url),
        method: request.method,
        headers: getDataTypesOfMethod(request.method).includes('Headers')
          ? {
              'content-type':
                request.bodyType === 'FormData'
                  ? 'multipart/form-data '
                  : 'application/json',
              ...pairsToObject(request.headers),
            }
          : undefined,
        params: getDataTypesOfMethod(request.method).includes('Params')
          ? pairsToObject(request.params)
          : undefined,
        data: getDataTypesOfMethod(request.method).includes('Body')
          ? request.bodyType === 'FormData'
            ? pairsToFormData([...request.form, ...request.files])
            : request.json
            ? JSON.stringify(JSON.parse(request.json))
            : undefined
          : undefined,
      })
      .then((response) => resolve(formatAny(response.data)))
      .catch((err) => resolve(formatAny(err.message)))
  })
}
