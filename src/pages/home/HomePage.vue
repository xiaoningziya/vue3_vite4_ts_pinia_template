<script lang="ts">
import { defineComponent, ref } from "vue"
import { darkTheme, NConfigProvider, NButton, NCard, NSpace } from "naive-ui"
import type { GlobalTheme } from "naive-ui"
import { useMainStore } from "@/store/main"

const mainStore = useMainStore()
const count = ref(0)

const Methods = {
  updateName: () => {
    // $patch 修改 store 中的数据
    mainStore.$patch({
      name: "名称被修改了,nameLength也随之改变了",
    })
  },
}

// eslint-disable-next-line no-console
console.log("VITE_APP_WEB_URL", import.meta.env.VITE_APP_WEB_URL)

export default defineComponent({
  name: "HomePage",
  components: {
    NButton,
    NCard,
    NSpace,
    NConfigProvider,
  },
  setup() {
    return {
      ...Methods,
      count,
      mainStore,
      theme: ref<GlobalTheme | null>(null),
      darkTheme,
    }
  },
})
</script>

<template>
  <h1>home.vue</h1>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme"> 深色 </n-button>
        <n-button @click="theme = null"> 浅色 </n-button>
        <h1>用户名：{{ mainStore.name }}</h1>
        <h1>用户名长度：{{ mainStore.nameLength }}</h1>
        <n-button @click="updateName"> 修改用户名 </n-button>
      </n-space>
    </n-card>
  </n-config-provider>
</template>

<style lang="scss" scoped>
h1 {
  color: $test-color;
}
</style>
