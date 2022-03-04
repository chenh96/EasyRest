import localforage from 'localforage'

export type Key =
  | 'Requests'
  | 'ActiveIndex'
  | 'Timeout'
  | 'MaxTabs'
  | 'CodeFont'

export async function saveData<T>(key: Key, value: T): Promise<T | null> {
  try {
    return await localforage.setItem<T>(key, value)
  } catch (err) {
    await removeData(key)
    return null
  }
}

export async function readData<T>(key: Key): Promise<T | null> {
  try {
    return await localforage.getItem<T>(key)
  } catch (err) {
    return null
  }
}

export async function expectData<T>(key: Key, value: T): Promise<T> {
  let data = await readData<T>(key)
  if (data === null) {
    data = await saveData(key, value)
  }
  if (data === null) {
    data = await value
  }
  return data
}

export async function removeData(key: Key) {
  try {
    localforage.removeItem(key)
  } catch (err) {}
}
