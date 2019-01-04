<template>
  <el-dialog :title="authTitle" :visible="showModifyAdminRoleVisible" width="30%" center :show-close="false">
    <div>
      <el-form v-model="form">
        <el-form-item label="角色名称">
          <el-radio-group v-model="form.type">
            <el-radio :label="item.RoleID" :key="item.RoleID" v-for="item in this.getRoles">{{item.RoleName}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">确定</el-button>
      <el-button type="text" @click.prevent="showModifyAdminRoleVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from "../../store/mutation-types";
  export default {
    props: {
      showModifyAdminRoleDialog: {
        type: Boolean,
        default: false
      },
      loginAccount: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showModifyAdminRoleVisible: false,
        authTitle: '',
        form: {
          type: ''
        },
        currentRoleRights: [],
        currentCheckedNode: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    created () {
      if (this.getRoles.length === 0) {
        this.fetchRoles();
      }
      if (this.getAdminRoles.length === 0) {
        this.fetchAdminRoles();
      }
    },
    computed: {
      ...mapGetters({
        getRoles: types.ROLE,
        getAdminRoles: types.ADMINROLE
      })
    },
    methods: {
      ...mapActions({
        fetchRoles: types.ROLE,
        fetchAdminRoles: types.ADMINROLE
      })
    },
    watch: {
      showModifyAdminRoleDialog: function () {
        debugger
        let currentAdminRole = this.getAdminRoles.find(item => {
          return item.LoginAccount === this.loginAccount;
        })
        this.authTitle = '登录账户' + currentAdminRole.LoginAccount + '角色修改';
        this.form.type = currentAdminRole.RoleID;
        this.showModifyAdminRoleVisible = true;
      }
    }
  }
</script>

<style scoped>
  .el-radio{
    margin-left: 30px;
  }
</style>
