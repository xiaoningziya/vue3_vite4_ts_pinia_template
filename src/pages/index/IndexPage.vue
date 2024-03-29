<script lang="ts">
import { h, ref, defineComponent, onMounted } from "vue"
import { RouterView, useRoute, useRouter } from "vue-router"
import {
  darkTheme,
  NConfigProvider,
  NButton,
  NCard,
  NSpace,
  useMessage,
} from "naive-ui"
import type { GlobalTheme } from "naive-ui"
import { NIcon, NLayout, NLayoutSider, NMenu } from "naive-ui"
import type { MenuOption } from "naive-ui"
import {
  BookmarkOutline,
  CaretDownOutline,
  PersonAddOutline,
  DocumentTextOutline,
  ServerOutline,
  KeyOutline,
} from "@vicons/ionicons5"
import { APILoginOut } from "@/api/login/login"
import HeaderNav from "@/components/HeaderNav/HeaderNav.vue"
import ChangePassword from "@/components/ChangePassword/ChangePassword.vue"
import SetNickname from "@/components/SetNickname/SetNickname.vue"
import SetAvatar from "@/components/SetAvatar/SetAvatar.vue"

export default defineComponent({
  name: "IndexPage",
  components: {
    HeaderNav,
    ChangePassword,
    SetNickname,
    SetAvatar,
    NLayout,
    NLayoutSider,
    NMenu,
    NSpace,
    RouterView,
    NCard,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    onMounted(() => {
      console.log("路由信息", route)
    })
    window.$message = useMessage()
    const menuOptions: MenuOption[] = [
      {
        label: "NodeJS 提供服务",
        key: "NestJS",
        setIcon: BookmarkOutline,
        children: [
          {
            type: "group",
            label: "MySql",
            key: "MySql",
            children: [
              {
                label: "注册表",
                key: "UserRegister",
                path: "/index/UserRegister",
                setIcon: PersonAddOutline,
              },
              {
                label: "登录表",
                key: "UserToken",
                path: "/index/UserToken",
                setIcon: DocumentTextOutline,
              },
            ],
          },
          {
            type: "group",
            label: "Redis",
            key: "Redis",
            children: [
              {
                label: "登录表",
                key: "RedisLogin",
                path: "/index/RedisLogin",
                setIcon: ServerOutline,
              },
              {
                label: "验证码",
                key: "RedisCode",
                path: "/index/RedisCode",
                setIcon: KeyOutline,
              },
            ],
          },
        ],
      },
    ]
    const name: string = route.name as string
    const DefaultKey = ref<string>(name || "UserRegister")
    const onUpdateMenu = (key: string, item: MenuOption): void => {
      // console.log(111, key, item)
    }

    return {
      DefaultKey,
      onUpdateMenu,
      theme: ref<GlobalTheme | null>(null),
      darkTheme,
      collapsed: ref(false),
      menuOptions,
      renderMenuLabel(option: MenuOption) {
        return h(
          "div",
          {
            onClick: (event: any) => {
              event?.stopPropagation()
              DefaultKey.value = option.key as string
              router.push(option.path as string)
            },
            // href: option.href, target: "_blank"
          },
          option.label as string
        )
      },
      renderMenuIcon(option: MenuOption) {
        // 渲染图标占位符以保持缩进
        // if (option.key === "sheep-man") return true
        // 返回 falsy 值，不再渲染图标及占位符
        // if (option.key === "food") return null
        return h(NIcon, null, {
          default: () => h(option.setIcon || BookmarkOutline),
        })
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) })
      },
    }
  },
})
</script>

<template>
  <div class="index_wrap">
    <n-space vertical>
      <HeaderNav></HeaderNav>
      <!-- <n-switch v-model:value="collapsed" /> -->
      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :height="1000"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            v-model:value="DefaultKey"
            :default-expand-all="true"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
            @on-update:value="onUpdateMenu"
          />
        </n-layout-sider>
        <n-layout class="main_content">
          <n-card hoverable class="card_main">
            <router-view></router-view>
          </n-card>
        </n-layout>
      </n-layout>
      <ChangePassword></ChangePassword>
      <SetNickname></SetNickname>
      <SetAvatar></SetAvatar>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: $test-color;
}
.index_wrap {
  height: 100%;
}

.n-space {
  height: 100%;
}
.n-layout,
.main_content {
  height: calc(100vh - 80px);
  box-sizing: border-box;
  background: #f8f8f8;
}
.card_main {
  padding: 16px;
  // margin: 6px;
  margin-left: 16px;
  margin-right: 10px;
  width: calc(100% - 26px);
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
