type ResponseData = {
  message?: string
  reason?: string
}

export class BaseAPI {
  protected _baseUrl: string

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl
  }

  protected _setBaseOptions(method = 'GET', body = {}) {
    if (method === 'GET' || method === 'DELETE') {
      return {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' as RequestCredentials,
        method: method,
      }
    }

    const contentBody = body instanceof FormData ? body : JSON.stringify(body)

    const headers: {
      [key: string]: any
    } = {}

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }
    return {
      headers,
      credentials: 'include' as RequestCredentials,
      method: method,
      body: contentBody,
    }
  }

  protected async _getResponse<T = undefined>(res: Response): Promise<T> {
    if (res.ok) {
      const contentType = res.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        try {
          return (await res.json()) as T
        } catch (error) {
          throw new Error(`Error parsing JSON response: ${error}`)
        }
      } else {
        return true as T
      }
    } else {
      let errorResponse: ResponseData
      try {
        errorResponse = await res.json()
      } catch (error) {
        throw new Error(`Error parsing error response: ${error}`)
      }
      throw new Error((errorResponse as ResponseData).reason)
    }
  }
}
