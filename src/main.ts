import { createApp } from "vue"
import router from "./router/index"
import "./style.css"
import App from "./App.vue"
import { createPinia } from "pinia"
import { create } from "naive-ui"
import { ComList } from "@/plugin/naive-ui"

const naive = create({
  components: ComList,
})
const app = createApp(App)
app.use(router)
app.use(naive)
app.use(createPinia())
app.mount("#app")
