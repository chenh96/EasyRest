import { Dispatch, useEffect, useState } from 'react'
import localforage from 'localforage'
import { newRequest, DataType } from './request'

const Constraint = {
  RequestTimeout: {
    name: 'Config.RequestTimeout',
    default: 10000
  },
  MaxTabs: {
    name: 'Config.MaxTabs',
    default: 10
  },
  CodeFont: {
    name: 'Config.CodeFont',
    default: ''
  },
  Requests: {
    name: 'Request.Requests',
    default: [newRequest()]
  },
  ActiveIndex: {
    name: 'Request.ActiveIndex',
    default: 0
  },
  ActiveDataType: {
    name: 'Request.ActiveDataType',
    default: 'Params' as DataType
  },
  WrapResult: {
    name: 'Request.WrapResult',
    default: false
  }
}

type StoreKey = keyof typeof Constraint
type StoreValue<K extends StoreKey> = typeof Constraint[K]['default']

export function defaultOf<K extends StoreKey>(key: K): StoreValue<K> {
  return Constraint[key].default
}

export async function saveData<K extends StoreKey>(
  key: K,
  value: StoreValue<K>
): Promise<StoreValue<K>> {
  return await localforage.setItem<StoreValue<K>>(key, value)
}

export async function readData<K extends StoreKey>(key: K): Promise<StoreValue<K> | null> {
  return await localforage.getItem<StoreValue<K>>(key)
}

export async function expectData<K extends StoreKey>(key: K): Promise<StoreValue<K>> {
  return (await readData(key)) || (await saveData(key, Constraint[key].default))
}

export async function removeData(key: StoreKey) {
  localforage.removeItem(key)
}

export function useStore<K extends StoreKey>(
  key: K,
  onLoaded: () => void = () => {}
): [StoreValue<K>, Dispatch<React.SetStateAction<StoreValue<K>>>] {
  const [loading, setLoading] = useState<boolean>(true)
  const [value, setValue] = useState<StoreValue<K>>(defaultOf(key))

  useEffect(() => {
    if (!loading) {
      saveData(key, value)
    }
  }, [value])

  useEffect(() => {
    expectData(key)
      .then(setValue)
      .finally(() => {
        setLoading(false)
        onLoaded()
      })
  }, [])

  return [value, setValue]
}
