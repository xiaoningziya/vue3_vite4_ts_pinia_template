<script lang="ts">
import { h, ref, defineComponent, reactive, onMounted, watch } from "vue"
import {
  NButton,
  useMessage,
  NDataTable,
  NPagination,
  NTag,
  useDialog,
  NAvatar,
} from "naive-ui"
import type { DataTableColumns } from "naive-ui"
import * as API from "@/api/user/user"
import { APIUserExportExcel } from "@/api/user/user"
type TableRow = {
  no: number
  id: string
  account: string
  nickname: string
  avatar: string
  create_time: string
  update_time: string
  delete_time: string
}

export default defineComponent({
  name: "UserRegister",
  components: {
    NDataTable,
    NPagination,
  },
  setup() {
    const createColumns = ({
      deleteUser,
      recoverUser,
    }: {
      deleteUser: (row: TableRow) => void
      recoverUser: (row: TableRow) => void
    }): DataTableColumns<TableRow> => {
      return [
        {
          title: "序号",
          key: "no",
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
          title: "头像",
          key: "avatar",
          render(row) {
            if (!row.avatar) {
              return []
            }
            return [
              h(
                NAvatar,
                {
                  bordered: true,
                  size: "small",
                  src: row.avatar,
                  fallbackSrc:
                    "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
                },
                {}
              ),
            ]
          },
        },
        {
          title: "昵称",
          key: "nickname",
        },
        {
          title: "账号",
          key: "account",
        },
        {
          title: "注册时间",
          key: "create_time",
        },
        {
          title: "更新时间",
          key: "update_time",
        },
        {
          title: "uuid",
          key: "id",
        },
        {
          title: "操作",
          key: "actions",
          render(row) {
            return [
              h(
                NButton,
                {
                  tertiary: true,
                  type: row.delete_time ? "info" : "warning",
                  // strong: true,
                  // tertiary: true,
                  size: "small",
                  onClick: () => {
                    row.delete_time ? recoverUser(row) : deleteUser(row)
                  },
                },
                { default: () => (row.delete_time ? "恢复用户" : "删除用户") }
              ),
              // h(
              //   NButton,
              //   {
              //     type: "info",
              //     style: {
              //       marginLeft: "10px",
              //     },
              //     // strong: true,
              //     // tertiary: true,
              //     size: "small",
              //     onClick: () => changePassword(row),
              //   },
              //   { default: () => "修改密码" }
              // ),
            ]
          },
        },
      ]
    }
    const tableData = reactive({
      count: 0,
      list: [],
    })
    const searchVal = ref<string>("")
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
          keyword: searchVal.value || "",
          pagesize: pagination.pageSize,
          pagenum: pagination.page,
        }
        API.APIGetUserList(params).then((res) => {
          if (res.code === 0) {
            const { list, count } = res.data
            tableData.count = count
            tableData.list = list
            pagination.itemCount = count
          }
          loading.value = false
        })
      },
      LikeSearch() {
        // if (!searchVal.value.length || searchVal.value.length < 2) {
        //   window.$message.warning("最少输入两位检索")
        //   return
        // }
        pagination.page = 1
        Methods.getTable()
      },
      exportExcel() {
        APIUserExportExcel({
          keyword: searchVal.value || "",
          pagesize: pagination.pageSize,
          pagenum: pagination.page,
        }).then((res) => {
          if (res.code === 0) {
            const { content, filename } = res.data
            Methods.saveFile(content.data, filename)
          }
        })
      },
      saveFile(file: any, filename: string) {
        const fileBinary = Buffer.from(file, "binary")
        const blob = new Blob([fileBinary], {
          type: "application/vnd.ms-excel",
        })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, filename)
        } else {
          const href = URL.createObjectURL(blob) // 创建新的URL表示指定的blob对象
          const a = document.createElement("a") // 创建a标签
          a.style.display = "none"
          a.href = href // 指定下载链接
          a.download = `${filename}.xlsx` // 指定下载文件名
          a.click() // 触发下载
          URL.revokeObjectURL(a.href) // 释放URL对象
        }
      },
      deleteUser() {
        const params = {
          id: actionUser.content.id,
        }
        API.APIDeleteUser(params).then((res) => {
          if (res.code === 0) {
            message.success(`用户『 ${actionUser.content.account} 』已删除`)
            Methods.getTable()
          }
        })
      },
      recoverUser() {
        const params = {
          id: actionUser.content.id,
        }
        API.APIRecoverUser(params).then((res) => {
          if (res.code === 0) {
            message.success(`用户『 ${actionUser.content.account} 』已恢复`)
            Methods.getTable()
          }
        })
      },
      onUpdatePage(page: number): void {
        Methods.getTable()
      },
      handleConfirmDelete() {
        dialog.warning({
          title: "警告",
          content: `确定要删除用户『 ${actionUser.content.account} 』吗？`,
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            Methods.deleteUser()
          },
          onNegativeClick: () => {
            // message.error("不确定")
          },
        })
      },
      handleConfirmRecover() {
        dialog.info({
          title: "提示",
          content: `确定要恢复用户『 ${actionUser.content.account} 』吗？`,
          positiveText: "确定",
          negativeText: "取消",
          onPositiveClick: () => {
            Methods.recoverUser()
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
        id: "",
        account: "",
      },
    })
    const message = useMessage()
    const dialog = useDialog()
    return {
      ...Methods,
      searchVal,
      loading,
      tableData,
      columns: createColumns({
        deleteUser(row: TableRow) {
          actionUser.content = row
          Methods.handleConfirmDelete()
          // console.log("deleteUser", row)
        },
        recoverUser(row: TableRow) {
          actionUser.content = row
          Methods.handleConfirmRecover()
          // console.log("recoverUser", row)
        },
      }),
      pagination: pagination,
    }
  },
})
</script>

<template>
  <div class="UserRegister_wrap">
    <n-space justify="space-between" align="center">
      <n-input-group class="likeSearch">
        <n-button type="primary" :disabled="true"> 模糊检索账号 </n-button>
        <n-input
          v-model:value="searchVal"
          clearable
          :maxlength="11"
          placeholder="请输入..."
        />
        <n-button type="primary" ghost @click="LikeSearch"> 查询 </n-button>
      </n-input-group>
      <n-button type="info" size="small" dashed @click="exportExcel">
        导出当前页数据
      </n-button>
    </n-space>
    <n-data-table
      :loading="loading"
      :columns="columns"
      :data="tableData.list"
      :pagination="false"
      :bordered="true"
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
.UserRegister_wrap {
  .pagination {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
  .likeSearch {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
}
</style>
