import { BASE_URL } from '@/constants/baseUrl'

type User = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

type ResponseData = {
  message: string
}

class Api {
  private _baseUrl: string

  constructor({ baseUrl }: { baseUrl: string }) {
    this._baseUrl = baseUrl
  }

  private async _getResponse<T>(res: Response): Promise<T> {
    const response = await res.json()
    if (res.ok) {
      return response as T
    }
    throw new Error((response as ResponseData).message)
  }

  registerUser(userData: User): Promise<User> {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }

  loginUser(credentials: { email: string; password: string }): Promise<User> {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }

  updateUserProfile(userData: Partial<User>): Promise<User> {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse<User>(res))
  }

  getUser(): Promise<User> {
    return fetch(`${this._baseUrl}/user`, {
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }

  logoutUser(): Promise<User> {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => this._getResponse<User>(res))
  }
}

const AuthApi = new Api({ baseUrl: BASE_URL })

export default AuthApi
