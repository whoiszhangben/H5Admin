<template>
  <el-dialog title="新增运营中心" :visible="showAddOPCenterVisible" width="30%" center :show-close="false">
    <div>
      <el-form v-model="form" label-position="right" label-width="150px">
        <el-form-item label="运营中心编号" class="el-form-item--mini">
          <el-input v-model="form.UserNo" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="运营中心名称" class="el-form-item--mini">
          <el-input v-model="form.UserName" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" class="el-form-item--mini">
          <el-select size="small" v-model="form.CardType">
            <el-option label="身份证" value="1"></el-option>
            <el-option label="机构代码" value="2"></el-option>
            <el-option label="营业执照" value="3"></el-option>
            <el-option label="统一社会信用代码" value="4"></el-option>
            <el-option label="其他" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" class="el-form-item--mini">
          <el-input v-model="form.CardNo" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="管理员账号" class="el-form-item--mini">
          <el-input v-model="form.UserAccount" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" class="el-form-item--mini">
          <el-input v-model="form.UserPassword" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="联系人" class="el-form-item--mini">
          <el-input v-model="form.Contact" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" class="el-form-item--mini">
          <el-input v-model="form.ContactTel" class="el-input--small"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">确定</el-button>
      <el-button type="text" @click.prevent="showAddOPCenterVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from "../../store/mutation-types";
  export default {
    props: {
      showAddOPCenterDialog: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showAddOPCenterVisible: false,
        form: {
          type: ''
        }
      }
    },
    created () {
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
      showAddOPCenterDialog: function () {
        this.showAddOPCenterVisible = true;
      }
    }
  }
</script>

<style scoped>
  .el-input{
    width:calc(100% - 65px);
  }
</style>
