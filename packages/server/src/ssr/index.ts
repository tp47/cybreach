import * as fs from 'fs'
import * as path from 'path'
import { isDev } from '@/utils'
import type { NextFunction, Request, Response } from 'express'
import type { ViteDevServer } from 'vite'
import serialize from 'serialize-javascript';

type Paths = {
  distPath: string
  clientSourcePath: string
  clientModulePath: string
}

async function compileTemplate(
  request: Request,
  response: Response,
  next: NextFunction,
  vite: ViteDevServer,
  { distPath, clientSourcePath, clientModulePath }: Paths
) {
  const url = request.originalUrl

  try {
    let template: string

    if (!isDev()) {
      template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
    } else {
      template = fs.readFileSync(path.resolve(clientSourcePath, 'index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
    }

    let render: (arg0: string, arg1: any) => Promise<string>

    if (!isDev()) {
      render = (await import(clientModulePath)).render
    } else {
      render = (await vite.ssrLoadModule(path.resolve(clientSourcePath, 'ssr.tsx'))).render
    }

    const initialState = {
      isLoading : 'false'
    }

    const stateMarkup = `<script>window.__PRELOADED_STATE__=${serialize(initialState)}</script>`;

    const appHtml = await render(url, initialState)

    const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(`<!--store-outlet-->`, stateMarkup)

    response.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (e) {
    if (isDev()) {
      vite.ssrFixStacktrace(e as Error)
    }
    next(e)
  }
}

export default compileTemplate
