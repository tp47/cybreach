import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import bodyParser from 'body-parser'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

dotenv.config()

import express from 'express'
import * as path from 'path'
import compileTemplate from '@/ssr'
import { isDev } from '@/utils'
import { useRoutes } from '@/routes'
import { Comments, Reactions, Topics } from '@/models'


const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

async function startApp() {
  const app = express()
  const port = Number(process.env.SERVER_PORT) || 3001

  sequelize.addModels([Topics, Comments, Reactions])

  sequelize.sync().then(() => {
    console.log('DB connected')
  })

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
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
