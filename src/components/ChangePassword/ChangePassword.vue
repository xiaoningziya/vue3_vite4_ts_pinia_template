<script setup lang="ts">
import { ref } from "vue"
import { useEventBus } from "@vueuse/core"

const showModal = ref<boolean>(false)
const BUS = useEventBus<string>("ChangePassword")
BUS.on((event, data) => {
  showModal.value = true
})
</script>
<template>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      class="cardwrap"
      title="修改密码"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    </n-card>
  </n-modal>
</template>
<style lang="scss" scoped>
.cardwrap {
  width: 600px;
}
</style>
