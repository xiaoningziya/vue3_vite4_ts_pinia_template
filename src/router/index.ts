import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

// 注意这里文件引入要带上文件后缀.vue
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "HomePage",
    component: () => import("@/pages/home/HomePage.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/pages/login/LoginPage.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
