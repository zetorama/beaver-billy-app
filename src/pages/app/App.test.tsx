import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '~/app/store'
import App from './App'

test('renders "my projects" page', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(screen.getByText(/my projects/i)).toBeInTheDocument()
})
