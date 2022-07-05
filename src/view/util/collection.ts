export const range = (from: number, to: number, step: number = 1) => {
  const arr = []
  for (let i = from; i < to; i += step) {
    arr.push(i)
  }
  return arr
}

export const findIndex = <E>(arr: E[], find: (item: E) => boolean) => {
  for (let i = 0; i < arr.length; i++) {
    if (find(arr[i])) {
      return i
    }
  }
  return -1
}
