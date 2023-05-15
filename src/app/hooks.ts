import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useEffect, useState } from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

/**
 * Check/update if CSS Media Query matches right now
 */
export const useMediaQuery = (query: string) => {
  // Get the initial value of the media query
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)

  // Add a listener for changes and update the state accordingly
  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handleChange = (event: MediaQueryListEvent) => setMatch(event.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return match
}

export const useIsMobile = () => !useMediaQuery('(min-width: 576px)')
