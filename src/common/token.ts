/**
 * @class 项目操作token的类
 */
class NestToken {
  // eslint-disable-next-line no-empty-function
  constructor(private tokenKey: string = "NestJS_Token") {}
  getToken(): string {
    const token = window.localStorage.getItem(this.tokenKey)
    return token || ""
  }
  setToken(value: string): void {
    window.localStorage.setItem(this.tokenKey, value)
  }
  clearToken(): void {
    window.localStorage.removeItem(this.tokenKey)
  }
}

export default new NestToken()
