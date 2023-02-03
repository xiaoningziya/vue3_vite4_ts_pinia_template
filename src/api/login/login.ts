import http from "@/api/http"
import * as T from "./types"
import * as HTTP from "@/api/http"

// export const loginApi: T.ILoginApi = {
//   login(params) {
//     return http.post("/login", params)
//   },
// }

export const APIAuthLogin = (
  params: T.ILoginParams
): Promise<HTTP.ResType<any>> => {
  return http.post("/auth/login", params)
}
