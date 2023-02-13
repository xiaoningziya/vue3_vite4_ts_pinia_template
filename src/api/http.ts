//http.ts
import axios, { AxiosRequestConfig } from "axios"
import NProgress from "nprogress"
import { useRouter } from "vue-router"
import router from "../router/index"
// import NestToken from "@/common/token"
import store from "@/store/index"
import { useMainStore } from "@/store/main"

const MainStore = useMainStore(store)
// 设置请求头和请求路径
axios.defaults.baseURL = "http://172.16.1.165:3001/api"
axios.defaults.timeout = 10000
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    // console.log('config', config)
    // const token = NestToken.getToken()
    const token = MainStore.token
    // console.log("请求拦截--config", config)
    if (token) {
      //@ts-ignore
      config.headers.Authorization = `Bearer ${token}`
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
    // console.log("响应拦截--response", res)
    // if (res.data.code === 111) {
    //   sessionStorage.setItem("token", "")
    //   // token过期操作
    // }
    if (res?.data?.code === -1 && res?.data?.message) {
      // console.log("弹窗", res.data.message)
      window.$message.warning(res?.data?.message || "请求失败，请稍后重试")
    }
    return res
  },
  (error) => {
    // console.log("响应拦截--error", error)
    if (error.response.status === 401) {
      window.$message.warning("登录失效,请重新登录")
      // NestToken.clearToken()
      MainStore.clearUserMessage()
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } else if (error.response.status === 500) {
      // window.$message.warning("服务端错误，请稍后重试")
      router.push("/500")
    } else {
      // eslint-disable-next-line no-lonely-if
      if (error.response.data.code === -1 && error.response.data.message) {
        window.$message.warning(error.response.data.message)
      }
    }
    return Promise.resolve(error.response.data)
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
