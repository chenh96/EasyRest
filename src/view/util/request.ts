import axios from 'axios'
import { nanoid } from 'nanoid'
import { deepCopy } from './json'
import { expectData } from './store'

export async function fetch(request: RequestDetails): Promise<string> {
  const timeout = await expectData('RequestTimeout')

  return new Promise<string>((resolve) => {
    const supports = MethodTypeSupports[request.method]

    const params: { [key: string]: string | File[] } = {}
    if (supports.includes('Params')) {
      request.params
        .filter((pair) => pair[0].length > 0)
        .forEach((pair) => (params[pair[0]] = pair[1]))
    }

    const headers: { [key: string]: string } = {}
    if (supports.includes('Headers')) {
      request.headers
        .filter((pair) => pair[0].length > 0)
        .forEach((pair) => (headers[pair[0]] = pair[1]))
    }

    let data: string | FormData | null = null
    if (supports.includes('Data')) {
      switch (request.bodyType) {
        case 'JSON':
          data = request.body
          headers['Content-Type'] = 'application/json'
          break
        case 'FormData':
          const formData = new FormData()
          request.data
            .filter((pair) => pair[0].length > 0)
            .forEach((pair) => formData.append(...pair))
          request.files
            .filter((pair) => pair[0].length > 0)
            .forEach((pair) => formData.append(...pair))
          data = formData
          headers['Content-Type'] = 'multipart/form-data'
          break
      }
    }

    axios
      .request({
        url: request.url,
        method: request.method,
        params,
        headers,
        data,
        timeout,
      })
      .then((data) => {
        if (data.status === 200) {
          resolve(toString(data.data))
        } else {
          resolve(toString(data))
        }
      })
      .catch((err) => {
        console.error(err)
        resolve(toString(err.message))
      })
  })
}

export const RequestMethods = [
  'GET',
  'POST',
  'DELETE',
  'PUT',
  'PATCH',
  'OPTIONS',
  'HEAD',
] as const
export type RequestMethod = typeof RequestMethods[number]

export const DataTypes = ['Data', 'Params', 'Headers'] as const
export type DataType = typeof DataTypes[number]

export const BodyTypes = ['JSON', 'FormData'] as const
export type BodyType = typeof BodyTypes[number]

export const MethodTypeSupports: { [key in RequestMethod]: DataType[] } = {
  GET: ['Params', 'Headers'],
  POST: ['Data', 'Params', 'Headers'],
  DELETE: ['Params', 'Headers'],
  PUT: ['Data', 'Params', 'Headers'],
  PATCH: ['Data', 'Params', 'Headers'],
  OPTIONS: ['Params', 'Headers'],
  HEAD: ['Params', 'Headers'],
}

export type RequestDetails = {
  id: string
  url: string
  method: RequestMethod
  bodyType: BodyType

  params: [string, string][]
  data: [string, string][]
  files: [string, File][]
  body: string
  headers: [string, string][]

  result?: string
  time?: string
  duration?: number
}

export function newRequest(): RequestDetails {
  return {
    id: nanoid(),
    url: '',
    method: 'GET',
    bodyType: 'JSON',
    params: [['', '']],
    data: [['', '']],
    files: [],
    body: '',
    headers: [['', '']],
  }
}

export function copyOf(request: RequestDetails): RequestDetails {
  return {
    ...deepCopy(request),
    id: nanoid(),
  }
}

function toString(data: any): string {
  if (typeof data === 'string') {
    return data
  } else if (typeof data === 'object') {
    return JSON.stringify(data, null, 2)
  } else {
    return String(data)
  }
}
