import projectsReducer, {
  ProjectsState,
  toggleNewProjectRequest,
  createProject,
  updateProject,
  deleteProject,
} from './Projects.state'

// eslint-disable-next-line jest/no-mocks-import
import mockedProjects from './__mocks__/projects-list.json'

describe('Projects state', () => {
  const initialState: ProjectsState = {
    items: mockedProjects,
    isNewProjectRequested: false,
  }
  it('should handle initial state', () => {
    expect(projectsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      isNewProjectRequested: false,
    })
  })

  it('should handle toggleNewProjectRequest', () => {
    let actual = projectsReducer(initialState, toggleNewProjectRequest())
    expect(actual.isNewProjectRequested).toEqual(true)

    actual = projectsReducer(actual, toggleNewProjectRequest())
    expect(actual.isNewProjectRequested).toEqual(false)

    actual = projectsReducer(actual, toggleNewProjectRequest(false))
    expect(actual.isNewProjectRequested).toEqual(false)

    actual = projectsReducer(actual, toggleNewProjectRequest(true))
    expect(actual.isNewProjectRequested).toEqual(true)
  })

  it('should handle createProject', () => {
    const actual = projectsReducer(initialState, createProject({ title: 'My Fancy Project' }))
    expect(actual.items.length).toEqual(initialState.items.length + 1)
    expect(actual.items[0].title).toEqual('My Fancy Project')
    expect(actual.items[0].id).toHaveLength(10)
  })

  it('should handle updateProject', () => {
    const id = '1'
    const actual = projectsReducer(initialState, updateProject({ id, title: 'My Fancy Project' }))
    expect(actual.items.length).toEqual(initialState.items.length)

    const index = actual.items.findIndex((item) => item.id === id)
    expect(actual.items[index].title).toEqual('My Fancy Project')
  })

  it('should handle deleteProject', () => {
    const id = '1'
    const actual = projectsReducer(initialState, deleteProject(id))
    expect(actual.items.length).toEqual(initialState.items.length - 1)

    const index = actual.items.findIndex((item) => item.id === id)
    expect(index).toEqual(-1)
  })
})
