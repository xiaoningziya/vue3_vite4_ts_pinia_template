import { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index", // 入口主页面
    name: "IndexPage",
    component: () => import("@/pages/index/IndexPage.vue"),
  },
  {
    path: "/home",
    name: "HomePage",
    component: () => import("@/pages/home/HomePage.vue"),
  },
  {
    path: "/login", // 登录页面
    name: "LoginPage",
    component: () => import("@/pages/login/LoginPage.vue"),
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/pages/error/401.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/pages/error/500.vue"),
  },
  {
    path: "/:pathMatch(.*)*", // 404页面
    name: "404",
    component: () => import("@/pages/error/404.vue"),
  },
]

export default routes
