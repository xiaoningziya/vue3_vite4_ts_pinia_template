import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "HomePage",
    component: () => import("@/pages/home/HomePage.vue"), // 注意这里文件引入要带上文件后缀.vue
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/pages/login/LoginPage.vue"),
  },
]

export default routes
