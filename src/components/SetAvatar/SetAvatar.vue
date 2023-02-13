<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from "vue"
import { useEventBus } from "@vueuse/core"
import { FormRules, InputInst, UploadFileInfo } from "naive-ui"
import { APIUserUpdateAvatar } from "@/api/user/user"
import { useMainStore } from "@/store/main"

const MainStore = useMainStore()
const showModal = ref<boolean>(false)
const BUS = useEventBus<string>("EventBus")
const Listener = (event: string, data: any) => {
  if (event === "SetAvatar") {
    uploadUrl.value = ""
    showModal.value = true
  }
}
BUS.on(Listener)
onBeforeUnmount(() => {
  BUS.off(Listener)
})

const showModalRef = ref<boolean>(false)
function handlePreview() {
  showModalRef.value = true
}
function handleFinish(file: any) {
  const response = file?.event.target.response
  if (response) {
    const url = JSON.parse(response).data.url
    uploadUrl.value = url
    previewImageUrl.value = url
  }
}
function handleRemove(file: UploadFileInfo) {
  uploadUrl.value = ""
  previewImageUrl.value = ""
}

const submitLoading = ref<boolean>(false)
const previewImageUrl = ref<string>("")
const beforeUpload = (data: {
  file: UploadFileInfo
  fileList: UploadFileInfo[]
}) => {
  if (data.file.file?.type !== "image/png") {
    window.$message.warning("只能上传png格式的图片文件，请重新上传")
    return false
  }
  return true
}
const uploadUrl = ref<string>("")
const updateAvatar = () => {
  submitLoading.value = true
  const params = {
    url: uploadUrl.value,
  }
  APIUserUpdateAvatar(params).then((res) => {
    submitLoading.value = false
    if (res.code === 0) {
      MainStore.setUserInfo(
        Object.assign({}, MainStore.userInfo, res.data.userInfo)
      )
      window.$message.success("头像更新完成")
      showModal.value = false
    }
  })
}
</script>
<template>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      class="cardwrap"
      title="设置头像"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-upload
        class="avatarUpload"
        :max="1"
        method="POST"
        action="http://0.0.0.0:3001/api/upload/avatar"
        list-type="image-card"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-finish="handleFinish"
        @before-upload="beforeUpload"
      />
      <n-button
        class="submitBtn"
        :disabled="uploadUrl === ''"
        type="info"
        block
        @click="updateAvatar"
      >
        更新头像
      </n-button>
    </n-card>
  </n-modal>
  <n-modal
    v-model:show="showModalRef"
    class="previewModel"
    preset="card"
    title="大图预览"
  >
    <img :src="previewImageUrl" class="previewImg" />
  </n-modal>
</template>
<style lang="scss" scoped>
.cardwrap {
  display: flex;
  justify-content: center;
  width: 260px;
  .submitBtn {
    margin-top: 30px;
  }
}
</style>
<style lang="scss">
.avatarUpload .n-upload-trigger {
  width: 180px !important;
  height: 180px !important;
}
.avatarUpload .n-upload-file {
  width: 180px !important;
  height: 180px !important;
}
.previewModel {
  width: 600px !important;
}
.previewImg {
  width: 100% !important;
}
</style>
