import type { RootState } from '~/app/store'
import type { Project } from './Projects.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { uuid } from '~/app/utils'

export interface ProjectsState {
  // fetchState: 'idle' | 'loading' | 'failed'
  // fetchError?: string
  items: Project[]
  isNewProjectRequested?: boolean
}

const initialState: ProjectsState = {
  items: [],
  isNewProjectRequested: false,
}

export const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    toggleNewProjectRequest: (state, { payload: forceFlag }: PayloadAction<boolean | undefined>) => {
      state.isNewProjectRequested = typeof forceFlag === 'boolean' ? forceFlag : !state.isNewProjectRequested
    },
    createProject: (state, { payload: project }: PayloadAction<Omit<Project, 'id' | 'createdAt'>>) => {
      const newProject = {
        ...project,
        id: uuid(),
        createdAt: new Date().toISOString(),
      }

      // Note: we're adding new projects to the beginning of the array
      state.items.unshift(newProject)
    },
    updateProject: (state, { payload }: PayloadAction<Partial<Project> & { id: Project['id'] }>) => {
      const index = state.items.findIndex((p) => p.id === payload.id)
      if (index > -1) {
        const project = state.items[index]
        state.items[index] = { ...project, ...payload }
      }
    },
    deleteProject: (state, { payload: id }: PayloadAction<Project['id']>) => {
      const index = state.items.findIndex((p) => p.id === id)
      if (index > -1) {
        state.items.splice(index, 1)
      }
    },
  },
})

export const { toggleNewProjectRequest, createProject, updateProject, deleteProject } = slice.actions

export const selectProjectById = (state: RootState, id: Project['id']) => {
  return state.projects.items.find((p) => p.id === id)
}

export const selectIsNewProjectRequested = (state: RootState) => {
  return state.projects.isNewProjectRequested
}

export const selectAllProjects = (state: RootState) => {
  return state.projects.items
}

export default slice.reducer
