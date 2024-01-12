// Required for vite-ssr-plugin
// DO NOT RENAME this file

import React from 'react'
import App from './src/components/App'
import { renderToString } from 'react-dom/server'
import { setupStore } from 'client/src/store/configure'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'

export function render(url: string, initialState) {
  const store = setupStore(initialState)

  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )
}
