import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/components/App'
import './index.css'
import { Provider } from 'react-redux'
import { startServiceWorker } from '@/services/serviceWorker/serviceWorker'

startServiceWorker()
import { setupStore } from './store/configure'

const store = setupStore()

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
