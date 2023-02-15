export interface IGetUserListParams {
  pagesize: number
  pagenum: number
  keyword: string
}

export interface IDeleteUserParams {
  id: string
}

export interface IRecoverUserParams {
  id: string
}

export interface IGetLoginUserParams {
  pagesize: number
  pagenum: number
}

export interface IOfflineUserParams {
  id: string
}

export interface IUserUpdatePasswordParams {
  old_password: string
  new_password: string
}

export interface IUserUpdateNicknameParams {
  nickname: string
}

export interface IUserUpdateAvatarParams {
  url: string
}
