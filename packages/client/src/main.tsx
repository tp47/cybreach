import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/components/App'
import { Provider } from 'react-redux'
// import { startServiceWorker } from '@/services/serviceWorker/serviceWorker'
import { setupStore } from './store/configure'
import { BrowserRouter } from 'react-router-dom'

// @ts-ignore
const preloadedState = window.__PRELOADED_STATE__
// @ts-ignore
delete window.__PRELOADED_STATE__

const store = setupStore(preloadedState)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// startServiceWorker()
