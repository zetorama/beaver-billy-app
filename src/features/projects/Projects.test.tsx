import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { reducer, store as emptyStore } from '~/app/store'
import Projects from './Projects'

// eslint-disable-next-line jest/no-mocks-import
import mockedProjects from './__mocks__/projects-list.json'

const formatDate = (date: string) =>
  new Date(date === 'now' ? Date.now() : date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

const store = configureStore({
  reducer,
  preloadedState: {
    projects: { items: mockedProjects },
  },
})

describe('Projects', () => {
  it('renders all my projects', () => {
    const { container } = render(
      <Provider store={store}>
        <Projects />
      </Provider>,
    )

    expect(container).toMatchSnapshot()
  })

  it('updates project name', async () => {
    const project = mockedProjects[0]

    render(
      <Provider store={store}>
        <Projects />
      </Provider>,
    )

    // get an edit project form
    const button = screen.getAllByRole('button', { name: /rename project/i })[0]
    expect(button).toBeInTheDocument()
    fireEvent.click(button)

    // type in project name
    const input = screen.getByRole('textbox', { name: /project name/i })
    expect(input).toHaveValue(project.title)
    fireEvent.change(input, { target: { value: 'My Fancy Project' } })

    // submit form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await screen.findByText(/my fancy project/i)

    // check there's a new project's name and not previous name
    expect(screen.getByText(/my fancy project/i)).toBeInTheDocument()
    expect(screen.queryByText(project.title)).not.toBeInTheDocument()
  })

  it('deletes project', async () => {
    const lastIndex = mockedProjects.length - 1
    const project = mockedProjects[lastIndex]

    render(
      <Provider store={store}>
        <Projects />
      </Provider>,
    )

    expect(screen.getAllByRole('button', { name: /delete project/i })).toHaveLength(mockedProjects.length)

    // click on delete button
    const button = screen.getAllByRole('button', { name: /delete project/i })[lastIndex]
    expect(button).toBeInTheDocument()
    fireEvent.click(button)

    // confirm deletion
    await screen.findByText(/are you sure/i)
    fireEvent.click(screen.getByRole('button', { name: /yes/i }))

    // check it's gone
    await waitForElementToBeRemoved(() => screen.queryByText(project.title))

    expect(screen.queryByText(project.title)).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /delete project/i })).toHaveLength(mockedProjects.length - 1)
  })

  it('creates a new project', async () => {
    render(
      <Provider store={emptyStore}>
        <Projects />
      </Provider>,
    )

    // get new project form
    const button = screen.getByRole('button', { name: /new project/i })
    expect(button).toBeInTheDocument()
    fireEvent.click(button)

    // type in project name
    const input = screen.getByPlaceholderText(/project name/i)
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'My Fancy Project' } })

    // submit form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))

    await screen.findByText(/my fancy project/i)

    // check project's name and creation date
    expect(screen.getByText(/my fancy project/i)).toBeInTheDocument()
    expect(screen.getByText(formatDate('now'))).toBeInTheDocument()
  })
})
