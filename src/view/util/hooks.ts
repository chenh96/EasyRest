import { useMemo, useState } from 'react'

/**
 * @param count Count
 * @returns [count > 0, Count down function]
 */
export const useCountDown = (count: number) => {
  const [state, setState] = useState(count)
  return [useMemo(() => state > 0, [state]), () => setState((prev) => prev - 1)] as const
}
