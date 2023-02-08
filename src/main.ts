import { createApp } from "vue"
import router from "./router/index"
import "./style.css"
import App from "./App.vue"
import { createPinia } from "pinia"
import {
  create,
  NButton,
  NDialogProvider,
  NTag,
  NDataTable,
  NPagination,
} from "naive-ui"
const naive = create({
  components: [NButton, NDialogProvider, NTag, NDataTable, NPagination],
})
const app = createApp(App)
app.use(router)
app.use(naive)
app.use(createPinia())
app.mount("#app")
