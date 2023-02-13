import { createApp } from "vue"
import router from "./router/index"
import "./style.css"
import App from "./App.vue"
import { create } from "naive-ui"
import { ComList } from "@/plugin/naive-ui"
import store from "@/store/index"

const naive = create({
  components: ComList,
})
const app = createApp(App)
app.use(router)
app.use(store)
app.use(naive)
app.mount("#app")
