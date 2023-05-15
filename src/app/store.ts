import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import projectsReducer from '../features/projects/Projects.state'

const STORAGE_KEY = 'beaver-app-state'

const getStoredState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)?.trim()
    return (raw && JSON.parse(raw)) || undefined
  } catch (err) {
    console.warn('Error getting stored state', err)
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
  preloadedState: getStoredState(),
})

store.subscribe(() => {
  // Keep whole store in local storage
  const state = store.getState()
  const serializedState = JSON.stringify(state)
  localStorage.setItem(STORAGE_KEY, serializedState)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
