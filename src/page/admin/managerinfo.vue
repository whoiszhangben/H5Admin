<template>
  <div class="container-box">
    <el-table
      :header-cell-style="tableHeaderColor"
      :data="this.getAdminInfo"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column prop="LoginAccount" label="登录账号"></el-table-column>
      <el-table-column prop="AccountType" label="账号类型" :formatter="formatAccountType"></el-table-column>
      <el-table-column prop="AccountStatus" label="状态" :formatter="formatAccountStatus"></el-table-column>
      <el-table-column prop="Mobile" label="电话号码"></el-table-column>
      <el-table-column prop="CreateTime" label="开户时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.prevent="modifyAdminInfo(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click.prevent="resetPwd(scope.row)">密码重置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <modify-admin-info :showModifyAdminInfoDialog="showModifyAdminInfoDialog" :adminInfo="currentAdminInfo"></modify-admin-info>
    <pagination
      @sendPageSize="receivePageSize"
      @sendCurrentPage="receiveCurrentPage"
      :totalPage="totalPage"
    ></pagination>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import pagination from "common/pagination";
  import ModifyAdminInfo from  '../dialog/modifyAdminInfo';
  import * as types from "../../store/mutation-types";

  export default {
    data() {
      return {
        totalPage: 300,
        showModifyAdminInfoDialog: false,
        currentAdminInfo: {
        }
      };
    },
    created () {
      if (this.getAdminInfo.length === 0) {
        this.fetchAdminInfo();
      }
      this.totalPage = this.getAdminInfo.length;
    },
    computed: {
      ...mapGetters({
        getAdminInfo: types.ADMININFO
      })
    },
    methods: {
      ...mapActions({
        fetchAdminInfo: types.ADMININFO
      }),
      receivePageSize(val) {
        console.log(val);
      },
      receiveCurrentPage(val) {
        console.log(val);
      },
      // 修改table header的背景色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return "background-color: #F7F6Fd;color: #B6B5C2;font-weight: 500;";
        }
      },
      authRoleRights (item) {
        this.currentRoleID = item.RoleID;
        this.showAuthRightsDialog = !this.showAuthRightsDialog;
      },
      addRole () {
        if (this.roleName.trim() === '' || this.roleName.trim().length === 0) {
          this.$alert('请输入角色名称');
          return
        }
        if (this.getRoles.find(item => {
            return item.RoleName === this.roleName.trim()
          })) {
          this.$alert('您输入的角色已存在,请重新输入');
          this.roleName = '';
          return
        }

        this.getRoles.push({
          RoleID: this.getRoles.length + 1,
          RoleName: this.roleName.trim()
        })
        this.$store.commit(types.ROLE, this.getRoles);
      },
      // 修改管理员信息
      modifyAdminInfo (item) {
        this.currentAdminInfo = item;
        this.showModifyAdminInfoDialog = !this.showModifyAdminInfoDialog;
      },
      // 重置密码
      resetPwd (item) {
        this.$confirm('此操作将重置' + item.LoginAccount + '的密码，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonClass: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '密码重置成功'
          })
        }).catch(err => {

        })
      },
      formatAccountType (row, column, value) {
        if (!value) {
          return '--'
        } else if (value === 10) {
          return '会员超级管理员'
        } else if (value === 11) {
          return '会员普通管理员'
        } else if (value === 12) {
          return '电商超级管理员'
        } else if (value === 13) {
          return '电商普通管理员'
        } else if (value === 14) {
          return '机构管理员'
        } else if (value === 15) {
          return '运营中心超级管理员'
        } else if (value === 16) {
          return '运营中心普通管理员'
        } else {
          return '未知类型'
        }
      },
      formatAccountStatus (row, column, value) {
        if (value === 1) {
          return '正常'
        } else {
          return '冻结'
        }
      }
    },
    watch: {
      DateValue(newval, oldval) {
        console.log(newval);
        console.log(oldval);
      }
    },
    components: {
      ModifyAdminInfo,
      pagination
    }
  };
</script>

<style scoped lang="scss">
  @import "../../assets/css/them.scss";
  .container-box {
    .form-box {
      padding: 10px 20px;
      border-bottom: 1px solid #ccc;
      .input-box {
        margin-bottom: 20px;
      }
      .input-label div {
        padding: 0px !important;
      }
      .input-label .label {
        margin-top: 4px;
      }
    }
    .button-box {
      margin: 50px;
    }
  }
</style>
