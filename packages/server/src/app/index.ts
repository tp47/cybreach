import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

dotenv.config()

import express from 'express'
import * as path from 'path'
import compileTemplate from '@/ssr'
import { isDev } from '@/utils'
import { useRoutes } from '@/routes'

async function startApp() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001

  app.use(cors())
  useRoutes(app)

  let vite: ViteDevServer
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const clientSourcePath = path.dirname(require.resolve('client'))
  const clientModulePath = require.resolve('client/dist-ssr/importBuild.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientSourcePath,
      appType: 'custom',
    })

    app.use(vite.middlewares)

    app.use('*', (req, res, next) => {
      compileTemplate(req, res, next, vite, { distPath, clientModulePath, clientSourcePath })
    })
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
  })
}

export default startApp
