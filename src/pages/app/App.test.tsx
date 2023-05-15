import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '~/app/store'
import App from './App'

describe('App', () => {
  it('renders "my projects" page', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    expect(screen.getByText(/my projects/i)).toBeInTheDocument()
  })

  it('handles "new project" button click', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    expect(store.getState().projects.isNewProjectRequested).toBe(false)
    const button = screen.getAllByRole('button', { name: /new project/i })[0]
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(store.getState().projects.isNewProjectRequested).toBe(true)

    expect(screen.getByPlaceholderText(/project name/i)).toBeInTheDocument()
  })
})
