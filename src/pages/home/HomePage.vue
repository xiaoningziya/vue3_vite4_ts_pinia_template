<script lang="ts">
import { defineComponent, ref } from "vue"
import { darkTheme, NConfigProvider, NButton, NCard, NSpace } from "naive-ui"
import type { GlobalTheme } from "naive-ui"

const count = ref(0)

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
      count,
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
      </n-space>
    </n-card>
  </n-config-provider>
</template>

<style lang="scss" scoped>
h1 {
  color: $test-color;
}
</style>
