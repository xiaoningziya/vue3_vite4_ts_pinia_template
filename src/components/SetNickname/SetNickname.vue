<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue"
import { useEventBus } from "@vueuse/core"
import { FormInst, FormItemInst, FormItemRule, FormRules } from "naive-ui"
import { APIUserUpdateNickname } from "@/api/user/user"
import { useRouter } from "vue-router"

const router = useRouter()
const showModal = ref<boolean>(false)
const BUS = useEventBus<string>("EventBus")
const Listener = (event: string, data: any) => {
  if (event === "SetNickname") {
    showModal.value = true
  }
}
BUS.on(Listener)
onBeforeUnmount(() => {
  BUS.off(Listener)
})
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
  nickname: [
    {
      required: true,
      message: "请输入昵称",
      trigger: ["input", "blur"],
    },
  ],
}
const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      updateNickname()
    } else {
      // console.log(errors)
    }
  })
}
interface ModelType {
  nickname: string
}
const model = ref<ModelType>({
  nickname: "",
})
const submitLoading = ref<boolean>(false)
const updateNickname = () => {
  submitLoading.value = true
  const params = {
    nickname: model.value.nickname,
  }
  APIUserUpdateNickname(params).then((res) => {
    submitLoading.value = false
    if (res.code === 0) {
      window.$message.success("昵称更新完成")
      showModal.value = false
    }
  })
}
</script>
<template>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      class="cardwrap"
      title="设置昵称"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="nickname" label="用户昵称">
          <n-input v-model:value="model.nickname" @keydown.enter.prevent />
        </n-form-item>
        <n-space justify="end">
          <n-button type="default" @click="() => (showModal = false)">
            取消
          </n-button>
          <n-button
            :disabled="model.nickname === ''"
            type="info"
            :loading="submitLoading"
            @click="handleValidateButtonClick"
          >
            更新昵称
          </n-button>
        </n-space>
      </n-form>
    </n-card>
  </n-modal>
</template>
<style lang="scss" scoped>
.cardwrap {
  width: 600px;
}
</style>
