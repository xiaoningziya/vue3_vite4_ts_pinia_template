import http from "@/api/http"
import * as T from "./types"
import * as HTTP from "@/api/http"

// 获取用户列表
export const APIGetUserList = (
  params: T.IGetUserListParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/getUserList", params)
}

// 删除单个用户
export const APIDeleteUser = (
  params: T.IDeleteUserParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/deleteUser", params)
}

// 恢复单个用户
export const APIRecoverUser = (
  params: T.IRecoverUserParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/recoverUser", params)
}

// 获取登录表数据 mysql
export const APIGetLoginUser = (
  params: T.IGetLoginUserParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/getLoginUser", params)
}

// 获取登录数据 redis
export const APIGetCatchLoginUser = (params: {}): Promise<
  HTTP.ResType<any>
> => {
  return http.post("/user/getCatchLoginUser", params)
}

// 获取登录数据 redis
export const APIGetCapcodeList = (params: {}): Promise<HTTP.ResType<any>> => {
  return http.post("/user/getCapcodeList", params)
}

// 下线单个用户
export const APIOfflineUser = (
  params: T.IOfflineUserParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/offlineUser", params)
}

// 下线所有用户
export const APIOfflineAllUser = (params: {}): Promise<HTTP.ResType<any>> => {
  return http.post("/user/offlineAllUser", params)
}

// 清空图片验证码
export const APIClearCapcodeList = (params: {}): Promise<HTTP.ResType<any>> => {
  return http.post("/user/clearCapcodeList", params)
}

// 修改密码
export const APIUserUpdatePassword = (
  params: T.IUserUpdatePasswordParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/updatePassword", params)
}

// 修改昵称
export const APIUserUpdateNickname = (
  params: T.IUserUpdateNicknameParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/user/updateNickname", params)
}
