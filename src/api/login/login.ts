import http from "@/api/http"
import * as T from "./types"
import * as HTTP from "@/api/http"

// export const loginApi: T.ILoginApi = {
//   login(params) {
//     return http.post("/login", params)
//   },
// }

// 认证登录
export const APIAuthLogin = (
  params: T.ILoginParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/auth/login", params)
}

// 用户注册
export const APIUserRegister = (
  params: T.IUserRegisterParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/register", params)
}

// 用户登出
export const APILoginOut = (params: {}): Promise<HTTP.ResType<any>> => {
  return http.post("/user/loginOut", params)
}

// 获取图片验证码
export const APIAuthAuthcode = (params: {}): Promise<HTTP.ResType<any>> => {
  return http.post("/auth/authcode", params)
}

// 验证图片验证码
export const APIAuthComparecode = (
  params: T.IAuthComparecodeParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/auth/comparecode", params)
}
