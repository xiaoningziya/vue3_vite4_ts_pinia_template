<script lang="ts">
import { h, ref, defineComponent, reactive, onMounted } from "vue"
import {
  DataTableColumns,
  NButton,
  NTag,
  useDialog,
  useMessage,
} from "naive-ui"
import * as API from "@/api/user/user"
import router from "@/router"
type TableRow = {
  no: number
  KEY: string
  VALUE: string
  uuid: string
  account: string
  token: string
}

export default defineComponent({
  name: "RedisLogin",
  components: {},
  setup() {
    const createColumns = ({
      offlineUser,
    }: {
      offlineUser: (row: TableRow) => void
    }): DataTableColumns<TableRow> => {
      return [
        {
          title: "序号",
          key: "no",
          fixed: "left",
          render(row, index) {
            return [
              h(
                NTag,
                {
                  type: "info",
                  size: "small",
                },
                {
                  default: () => {
                    const NUM =
                      pagination.pageSize * (pagination.page - 1) + index + 1
                    return `NO.${NUM}`
                  },
                }
              ),
            ]
          },
        },
        {
          title: "KEY",
          key: "KEY",
          minWidth: "80",
        },
        {
          title: "VALUE",
          key: "VALUE",
          minWidth: "80",
        },
        {
          title: "uuid",
          key: "uuid",
          minWidth: "380",
        },
        {
          title: "账号",
          key: "account",
          minWidth: "200",
        },
        {
          title: "token",
          key: "token",
          minWidth: "400",
        },
        // {
        //   title: "操作",
        //   key: "actions",
        //   fixed: "right",
        //   render(row) {
        //     return [
        //       h(
        //         NButton,
        //         {
        //           type: "warning",
        //           size: "small",
        //           onClick: () => {
        //             offlineUser(row)
        //           },
        //         },
        //         { default: () => "强制下线" }
        //       ),
        //     ]
        //   },
        // },
      ]
    }
    const tableData = reactive({
      count: 0,
      list: [],
    })
    const pagination = reactive({
      page: 1,
      pageSize: 10,
      itemCount: 0,
    })
    const loading = ref<boolean>(false)
    const Methods = {
      offlineAllUser() {
        // loading.value = true
        const params = {}
        API.APIOfflineAllUser(params).then((res) => {
          if (res.code === 0) {
            message.warning("登录失效，请重新登录")
            setTimeout(() => {
              router.push("/login")
            }, 800)
          }
        })
      },
      getTable() {
        loading.value = true
        const params = {}
        API.APIGetCatchLoginUser(params).then((res) => {
          if (res.code === 0) {
            const { list, count } = res.data
            tableData.count = count
            tableData.list = list
            pagination.itemCount = count
          }
          loading.value = false
        })
      },
      offlineUser() {
        const params = {
          id: actionUser.content.uuid,
          account: actionUser.content.account,
        }
        API.APIOfflineUser(params).then((res) => {
          if (res.code === 0) {
            message.success(`用户『 ${actionUser.content.account} 』已下线`)
            Methods.getTable()
          }
        })
      },
      onUpdatePage(page: number): void {
        Methods.getTable()
      },
      handleConfirmOffline() {
        dialog.warning({
          title: "提示",
          content: `确定要下线所有登录的用户吗？`,
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            Methods.offlineAllUser()
          },
          onNegativeClick: () => {
            // message.error("不确定")
          },
        })
      },
    }
    // watch(pagination, (newVal) => {
    //   console.log("newVal", newVal)
    // })
    onMounted(() => {
      Methods.getTable()
    })
    const actionUser = reactive({
      content: {
        uuid: "",
        account: "",
      },
    })
    const message = useMessage()
    const dialog = useDialog()
    return {
      ...Methods,
      loading,
      tableData,
      columns: createColumns({
        offlineUser(row: TableRow) {
          actionUser.content = row
          // Methods.handleConfirmOffline()
        },
      }),
      pagination: pagination,
    }
  },
})
</script>

<template>
  <div class="RedisLogin_wrap">
    <div class="actionHeader">
      <n-button size="small" type="warning" @click="handleConfirmOffline">
        下线所有用户
      </n-button>
    </div>
    <n-data-table
      :loading="loading"
      :columns="columns"
      :data="tableData.list"
      :pagination="false"
      :bordered="true"
      :scroll-x="1800"
    >
      <template #empty> <div>Redis暂不实现分页查询</div> </template>
    </n-data-table>
    <n-pagination
      v-model:page="pagination.page"
      class="pagination"
      :prefix="() => `共 ${pagination.itemCount} 条数据`"
      :item-count="pagination.itemCount"
      :on-update-page="onUpdatePage"
    />
  </div>
</template>

<style lang="scss" scoped>
.RedisLogin_wrap {
  .actionHeader {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .pagination {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
