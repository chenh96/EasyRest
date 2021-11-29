export type ParamType = 'Params' | 'Body' | 'Header'
export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

export type Pair = [string, string]

export interface RequestDetails {
  id: string
  url: string
  method: RequestMethod
  params: Pair[]
  headers: Pair[]
  body: string
  result: string
  time?: string
  duration?: number
}
