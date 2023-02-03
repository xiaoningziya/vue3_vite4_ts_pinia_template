//http.ts
import axios, { AxiosRequestConfig } from "axios"
import NProgress from "nprogress"

// 设置请求头和请求路径
axios.defaults.baseURL = "http://0.0.0.0:3001/api"
axios.defaults.timeout = 10000
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem("token")
    // console.log("请求拦截--config", config)
    if (token) {
      //@ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error) => {
    // console.log("请求拦截--error", error)
    return error
  }
)
// 响应拦截
axios.interceptors.response.use(
  (res) => {
    // if (res.data.code === 111) {
    //   sessionStorage.setItem("token", "")
    //   // token过期操作
    // }
    // eslint-disable-next-line no-console
    // console.log("响应拦截--response", res)
    if (res?.data?.code === -1 && res?.data?.message) {
      // console.log("弹窗", res.data.message)
      window.$message.warning(res?.data?.message || "请求失败，请稍后重试")
    }
    return res
  },
  (error) => {
    // console.log("响应拦截--error", error)
    return Promise.reject(error)
  }
)

export interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement("iframe")
    iframe.style.display = "none"
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
