import { createApp } from "vue"
import router from "./router/index"
import "./style.css"
import App from "./App.vue"
import { create } from "naive-ui"
import { ComList } from "@/plugin/naive-ui"
import store from "@/store/index"
import * as buffer from "buffer"

// 声明顶层变量 避免代码报错
if (typeof (window as any).global === "undefined") {
  ;(window as any).global = window
}
if (typeof (window as any).Buffer === "undefined") {
  ;(window as any).Buffer = buffer.Buffer
}

const naive = create({
  components: ComList,
})
const app = createApp(App)
app.use(router)
app.use(store)
app.use(naive)
app.mount("#app")
