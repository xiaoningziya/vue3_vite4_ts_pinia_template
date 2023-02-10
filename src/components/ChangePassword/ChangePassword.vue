<script setup lang="ts">
import { ref } from "vue"
import { useEventBus } from "@vueuse/core"
import { FormInst, FormItemInst, FormItemRule, FormRules } from "naive-ui"
import { APIUserUpdatePassword } from "@/api/user/user"
import { useRouter } from "vue-router"

const router = useRouter()
const showModal = ref<boolean>(false)
const BUS = useEventBus<string>("ChangePassword")
BUS.on((event, data) => {
  showModal.value = true
})
const formRef = ref<FormInst | null>(null)
const rules: FormRules = {
  old_password: [
    {
      required: true,
      message: "请输入原密码",
      trigger: ["input", "blur"],
    },
  ],
  new_password: [
    {
      required: true,
      message: "请输入新密码",
      trigger: ["input", "blur"],
    },
  ],
  new_password_again: [
    {
      required: true,
      message: "请再次输入新密码",
      trigger: ["input", "blur"],
    },
    {
      validator: validatePasswordStartWith,
      message: "两次密码输入不一致",
      trigger: "input",
    },
    {
      validator: validatePasswordSame,
      message: "两次密码输入不一致",
      trigger: ["blur", "password-input"],
    },
  ],
}
const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      updatePassword()
    } else {
      // console.log(errors)
    }
  })
}
function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
  return (
    !!model.value.new_password &&
    model.value.new_password.startsWith(value) &&
    model.value.new_password.length >= value.length
  )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === model.value.new_password
}
function handlePasswordInput() {
  if (model.value.new_password_again) {
    AgainPasswordFormItemRef.value?.validate({ trigger: "password-input" })
  }
}
const AgainPasswordFormItemRef = ref<FormItemInst | null>(null)
interface ModelType {
  old_password: string
  new_password: string
  new_password_again: string
}
const model = ref<ModelType>({
  old_password: "",
  new_password: "",
  new_password_again: "",
})
const submitLoading = ref<boolean>(false)
const updatePassword = () => {
  submitLoading.value = true
  const params = {
    new_password: model.value.new_password,
    old_password: model.value.old_password,
  }
  APIUserUpdatePassword(params).then((res) => {
    submitLoading.value = false
    if (res.code === 0) {
      window.$message.success("密码更新完成，请重新登录")
      setTimeout(() => {
        router.push("/login")
      }, 500)
    }
  })
}
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
      <n-form ref="formRef" :model="model" :rules="rules">
        <n-form-item path="old_password" label="原密码">
          <n-input
            v-model:value="model.old_password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="new_password" label="新密码">
          <n-input
            v-model:value="model.new_password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          first
          ref="AgainPasswordFormItemRef"
          path="new_password_again"
          label="再次输入新密码"
        >
          <n-input
            v-model:value="model.new_password_again"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-space justify="end">
          <n-button type="default" @click="() => (showModal = false)">
            取消
          </n-button>
          <n-button
            :disabled="
              model.old_password === '' ||
              model.new_password === '' ||
              model.new_password_again === ''
            "
            type="info"
            :loading="submitLoading"
            @click="handleValidateButtonClick"
          >
            更新密码
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
