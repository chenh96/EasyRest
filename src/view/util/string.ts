import { VoidType } from './types'

export const isBlank = (str: string | VoidType) => str === null || str === undefined || str.trim().length <= 0
export const isNotBlank = (str: string | VoidType) => !isBlank(str)
