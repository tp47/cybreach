import { BASE_URL } from '@/constants/baseUrl'
import { User } from '@/types'

type ResponseData = {
  message?: string
  reason?: string
}

class Api {
  private _baseUrl: string

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl
  }

  private async _getResponse<T>(res: Response): Promise<T> {
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

  registerUser(userData: User): Promise<User> {
    return fetch(`${this._baseUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }

  loginUser(credentials: Partial<User>): Promise<User> {
    return fetch(`${this._baseUrl}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }

  updateUserProfile(userData: User): Promise<User> {
    return fetch(`${this._baseUrl}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }

  getUser(): Promise<User> {
    return fetch(`${this._baseUrl}/auth/user`, {
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }

  logoutUser(): Promise<null> {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => this._getResponse<null>(res))
  }
}

const AuthApi = new Api({ baseUrl: BASE_URL })

export default AuthApi
