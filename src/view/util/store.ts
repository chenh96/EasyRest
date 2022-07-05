import { useEffect, useState } from 'react'
import localforage from 'localforage'
import { newRequest } from './request'
import { useCountDown } from './hooks'

const defaults = {
  requests: [newRequest()],
  activated: 0,
  font: 'monospace',
  timeout: 10000,
  wrap: false
}

export type StoreKey = keyof typeof defaults
export type StoreValue<K extends StoreKey> = typeof defaults[K]

export const saveData = async <K extends StoreKey, V extends StoreValue<K>>(key: K, value: V) =>
  await localforage.setItem(key, value)
export const readData = async <K extends StoreKey, V extends StoreValue<K>>(key: K) =>
  (await localforage.getItem<V>(key)) ?? defaults[key]

export const useStore = <K extends StoreKey>(key: K, onInit?: () => void) => {
  const [value, setValue] = useState(defaults[key])

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    readData(key).then((val) => {
      setValue(val)
      setInitialized(true)
      onInit?.()
    })
  }, [])

  useEffect(() => {
    initialized && saveData(key, value)
  }, [value])

  return [value, setValue] as const
}

export const useStores = () => {
  const [stores, setStores] = useState(defaults)
  const [initializing, countDownInit] = useCountDown(Object.keys(defaults).length)

  useEffect(() => {
    Object.keys(stores).forEach((key) =>
      readData(key as StoreKey).then((value) => {
        setStores((prev) => ({ ...prev, [key]: value }))
        countDownInit()
      })
    )
  }, [])

  const setStore = <K extends StoreKey>(key: K, value: StoreValue<K>) => {
    setStores((prev) => ({ ...prev, [key]: value }))
    saveData(key, value)
  }

  return [stores, setStore, initializing] as const
}
