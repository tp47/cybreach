import React from 'react'
import { renderToString } from 'react-dom/server'

export function render() {
  return renderToString(<h1>Hello world</h1>)
}
