import { BASE_URL } from '@/constants/baseUrl'
import { User } from '@/types'
import { Password } from '@/types/user'

type ResponseData = {
  message?: string
  reason?: string
}

class Api {
  private _baseUrl: string

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl
  }

  private _setBaseOptions(method = 'GET', body = {}) {
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

  private async _getResponse<T = undefined>(res: Response): Promise<T> {
    if (res.ok) {
      const contentType = res.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        try {
          return (await res.json()) as T
        } catch (error) {
          throw new Error(`Error parsing JSON response: ${error}`)
        }
      } else {
        return {} as T
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

  async registerUser(userData: User) {
    return fetch(`${this._baseUrl}/auth/signup`, this._setBaseOptions('POST', userData)).then(
      (res) => this._getResponse<User>(res)
    )
  }

  async loginUser(loginData: Partial<User>) {
    return fetch(`${this._baseUrl}/auth/signin`, this._setBaseOptions('POST', loginData)).then(
      (res) => this._getResponse(res)
    )
  }

  async updateUserProfile(userData: Partial<User>) {
    return fetch(`${this._baseUrl}/user/profile`, this._setBaseOptions('PUT', userData)).then(
      (res) => this._getResponse<User>(res)
    )
  }

  async updateUserPassword(userData: Password): Promise<User> {
    return fetch(`${this._baseUrl}/user/password`, this._setBaseOptions('PUT', userData)).then(
      (res) => this._getResponse<User>(res)
    )
  }

  async updateUserAvatar(userData: FormData): Promise<User> {
    return fetch(
      `${this._baseUrl}/user/profile/avatar`,
      this._setBaseOptions('PUT', userData)
    ).then((res) => this._getResponse<User>(res))
  }

  async getUser() {
    return fetch(`${this._baseUrl}/auth/user`, this._setBaseOptions()).then((res) =>
      this._getResponse<User>(res)
    )
  }

  async logoutUser() {
    return fetch(`${this._baseUrl}/auth/logout`, this._setBaseOptions('POST')).then((res) =>
      this._getResponse(res)
    )
  }
}

const AuthApi = new Api({ baseUrl: BASE_URL })

export default AuthApi
