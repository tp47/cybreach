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
      if (res.status === 200) {
        return {} as T
      }
      const response = await res.json()
      return response as T
    } else {
      const response = await res.json()
      throw new Error((response as ResponseData).reason)
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
