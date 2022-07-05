import json5 from 'json5'

export const formatJson = (str: string) => {
  try {
    return JSON.stringify(json5.parse(str), null, 2)
  } catch (_) {
    return str
  }
}

export const formatAny = (obj: any) => {
  if (typeof obj === 'string') {
    return formatJson(obj)
  }

  if (typeof obj === 'object') {
    return JSON.stringify(obj, null, 2)
  }

  return String(obj)
}