<template>
  <div class="container-box">
    <div class="form-box">
      <el-row class="input-box" :gutter="20">
        <el-col :span="6" class="input-label">
          <el-col :span="6" class="label">角色名称：</el-col>
          <el-col :span="12">
            <el-input placeholder="请输入角色名称" size="mini" v-model="roleName"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" class="el-button--primary" style="margin-left: 1em;" @click="addRole">新增角色</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-table
      :header-cell-style="tableHeaderColor"
      :data="this.getRoles"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column prop="RoleID" label="角色编号"></el-table-column>
      <el-table-column prop="RoleName" label="角色名称"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.prevent="authRoleRights(scope.row)">角色授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <auth-rights :show-auth-rights-dialog="showAuthRightsDialog" :roleID="currentRoleID"></auth-rights>
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
  import AuthRights from  '../dialog/authRights';
  import * as types from "../../store/mutation-types";

  export default {
    data() {
      return {
        totalPage: 300,
        showAuthRightsDialog: false,
        currentRoleID: 0,
        value: "",
        roleName: "",
        DateValue: ""
      };
    },
    created () {
      if (this.getRoles.length === 0) {
        this.fetchRoles();
      }
      this.totalPage = this.fetchRoles.length;
    },
    computed: {
      ...mapGetters({
        getRoles: types.ROLE
      })
    },
    methods: {
      ...mapActions({
        fetchRoles: types.ROLE
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
      }
    },
    watch: {
      DateValue(newval, oldval) {
        console.log(newval);
        console.log(oldval);
      }
    },
    components: {
      AuthRights,
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
