<template>
  <div class="container-box">
    <el-table
      :header-cell-style="tableHeaderColor"
      :data="this.getAdminRoles"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column prop="LoginAccount" label="登录账号"></el-table-column>
      <el-table-column prop="RoleName" label="角色名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.prevent="modifyRole(scope.row)">修改角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <modify-admin-role :showModifyAdminRoleDialog="showModifyAdminRoleDialog" :loginAccount="loginAccount"></modify-admin-role>
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
  import ModifyAdminRole from  '../dialog/modifyAdminRole';
  import * as types from "../../store/mutation-types";

  export default {
    data() {
      return {
        totalPage: 300,
        showModifyAdminRoleDialog: false,
        loginAccount: ''
      };
    },
    created () {
      if (this.getAdminRoles.length === 0) {
        this.fetchAdminRoles();
      }
      this.totalPage = this.getAdminRoles.length;
    },
    computed: {
      ...mapGetters({
        getAdminRoles: types.ADMINROLE
      })
    },
    methods: {
      ...mapActions({
        fetchAdminRoles: types.ADMINROLE
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
      modifyRole (item) {
        debugger
        this.loginAccount = item.LoginAccount;
        this.showModifyAdminRoleDialog = !this.showModifyAdminRoleDialog;
      }
    },
    watch: {
      DateValue(newval, oldval) {
        console.log(newval);
        console.log(oldval);
      }
    },
    components: {
      ModifyAdminRole,
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
