import { ReactNode } from 'react'

export type BasicType = string | number | boolean

export type VoidType = null | undefined

export type TsxChildren = ReactNode[] | ReactNode | BasicType | VoidType
