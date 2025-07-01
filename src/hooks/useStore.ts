import { useEffect, useState } from 'react'
import { useTimelineStore, TimelineState } from '@/store/timelineStore'
import { shallow } from 'zustand/shallow'

// Hydration-safe wrapper for timeline store
export const useTimelineStoreHydrated = <T>(
  selector: (state: TimelineState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T | undefined => {
  const [hydrated, setHydrated] = useState(false)
  const [data, setData] = useState<T | undefined>(undefined)
  
  useEffect(() => {
    setHydrated(true)
  }, [])
  
  useEffect(() => {
    if (hydrated) {
      // Get initial data
      const initialData = selector(useTimelineStore.getState())
      setData(initialData)
      
      // Subscribe to changes
      const unsubscribe = useTimelineStore.subscribe((state) => {
        const newData = selector(state)
        setData(prevData => {
          const isEqual = equalityFn ? equalityFn(prevData as T, newData) : shallow(prevData, newData)
          return isEqual ? prevData : newData
        })
      })
      
      return unsubscribe
    }
  }, [hydrated, selector, equalityFn])
  
  return hydrated ? data : undefined
}
