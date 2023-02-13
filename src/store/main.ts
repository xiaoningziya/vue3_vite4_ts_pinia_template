import { defineStore } from "pinia"

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    name: "超级管理员",
    token: "",
    userInfo: {
      account: "",
      avatar: "",
      nickname: "",
    },
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      // await doAjaxRequest(data);
      this.name = data
    },
    async setToken(payload: string) {
      this.token = payload
    },
    async setUserInfo(payload: any) {
      this.userInfo = payload
    },
    async clearUserMessage() {
      this.token = ""
      this.userInfo = {
        account: "",
        avatar: "",
        nickname: "",
      }
    },
  },
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [
      {
        key: "NestJS_Pinia", // 设置存储的key
        storage: localStorage, //表示存储在localStorage
        // paths: ["id"], // 指定要长久化的字段
      },
    ],
  },
})
