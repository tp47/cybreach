import { BASE_URL } from '@/constants/baseUrl'
import { User } from '@/types'
import { Password } from '@/types/user'
import { BaseAPI } from './baseAPI'

type OAuthResponse = {
  service_id: string
}

class Api extends BaseAPI {
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

  async getServiceId() {
    return fetch(`${this._baseUrl}/oauth/yandex/service-id`, this._setBaseOptions()).then((res) =>
      this._getResponse<OAuthResponse>(res)
    )
  }

  async oauthLogin(data: { code: string }) {
    return fetch(`${this._baseUrl}/oauth/yandex`, this._setBaseOptions('POST', data)).then((res) =>
      this._getResponse(res)
    )
  }
}

const AuthApi = new Api({ baseUrl: BASE_URL })

export default AuthApi
