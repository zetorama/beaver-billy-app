import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as StateProvider } from 'react-redux'
import { store } from './app/store'
import App from './pages/app/App'

import 'antd/dist/reset.css'
import './index.scss'
import { ConfigProvider as ThemeProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ThemeProvider
      theme={{
        token: {
          fontFamily: 'inherit',
          fontSize: 16,
          borderRadius: 0,
          borderRadiusSM: 0,
          borderRadiusLG: 0,
        },
      }}
    >
      <StateProvider store={store}>
        <App />
      </StateProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
