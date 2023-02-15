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
type TableRow = {
  no: number
  id: string
  uuid: string
  account: string
  nickname: string
  create_time: string
  update_time: string
  delete_time: string
}
export default defineComponent({
  name: "UserToken",
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
          title: "id",
          key: "id",
          minWidth: "80",
        },
        {
          title: "账号",
          key: "account",
          minWidth: "200",
        },
        {
          title: "昵称",
          key: "nickname",
          minWidth: "200",
        },
        {
          title: "注册时间",
          key: "create_time",
          minWidth: "400",
        },
        {
          title: "更新时间",
          key: "update_time",
          minWidth: "400",
        },
        {
          title: "token",
          key: "token",
          minWidth: "400",
        },
        {
          title: "uuid",
          key: "uuid",
          minWidth: "380",
        },
        {
          title: "操作",
          key: "actions",
          fixed: "right",
          render(row) {
            return [
              h(
                NButton,
                {
                  type: "warning",
                  size: "small",
                  onClick: () => {
                    offlineUser(row)
                  },
                },
                { default: () => "强制下线" }
              ),
            ]
          },
        },
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
      getTable() {
        loading.value = true
        const params = {
          pagesize: pagination.pageSize,
          pagenum: pagination.page,
        }
        API.APIGetLoginUser(params).then((res) => {
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
          content: `确定要下线用户『 ${actionUser.content.account} 』吗？`,
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            Methods.offlineUser()
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
          Methods.handleConfirmOffline()
        },
      }),
      pagination: pagination,
    }
  },
})
</script>

<template>
  <div class="UserToken_wrap">
    <n-data-table
      :loading="loading"
      :columns="columns"
      :data="tableData.list"
      :pagination="false"
      :bordered="true"
      :scroll-x="1800"
    />
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
.UserToken_wrap {
  .pagination {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
