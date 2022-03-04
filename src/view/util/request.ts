import axios from 'axios'
import { expectData } from './store'
import { RequestDetails } from '../page/Request/const'

export async function doRequest(request: RequestDetails): Promise<string> {
  const timeout = await expectData<number>('Timeout', 10000)

  return new Promise<string>((resolve) => {
    const params: { [key: string]: string } = {}
    request.params
      .filter((pair) => pair[0].length > 0)
      .forEach((pair) => (params[pair[0]] = pair[1]))

    const headers: { [key: string]: string } = {}
    request.headers
      .filter((pair) => pair[0].length > 0)
      .forEach((pair) => (headers[pair[0]] = pair[1]))

    axios
      .request<any>({
        url: request.url,
        method: request.method,
        params,
        headers: { 'Content-Type': 'application/json', ...headers },
        data: request.body,
        withCredentials: false,
        timeout
      })
      .then((data) => {
        if (data.status === 200) {
          resolve(toString(data.data))
        } else {
          resolve(toString(data))
        }
      })
      .catch((err) => {
        resolve(toString(err.message))
      })
  })
}

export function toString(data: any): string {
  // if (data === undefined || data === null) {
  //   return ''
  // }

  if (typeof data === 'object') {
    return JSON.stringify(data, undefined, 2)
  }

  // if (typeof data === 'string') {
  //   return data
  // }

  // if (
  //   typeof data === 'number' ||
  //   typeof data === 'bigint' ||
  //   typeof data === 'boolean'
  // ) {
  //   return `${data}`
  // }

  return String(data)
}
