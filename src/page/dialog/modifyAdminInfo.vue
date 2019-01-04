<template>
  <el-dialog title="管理员信息修改" :visible="showModifyAdminInfoVisible" width="30%" center :show-close="false">
    <el-form v-model="form">
      <el-form-item label="登录账户">
        <el-input v-model="form.LoginAccount" :disabled="true"/>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.Mobile"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.AccountStatus">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">冻结</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">确定</el-button>
      <el-button type="text" @click.prevent="showModifyAdminInfoVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from "../../store/mutation-types";
  export default {
    props: {
      showModifyAdminInfoDialog: {
        type: Boolean,
        default: false
      },
      adminInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        showModifyAdminInfoVisible: false,
        authTitle: '',
        form: {
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
    },
    computed: {
      ...mapGetters({
      })
    },
    methods: {
      ...mapActions({
      })
    },
    watch: {
      showModifyAdminInfoDialog: function () {
        this.form = this.adminInfo;
        this.showModifyAdminInfoVisible = true;
      }
    }
  }
</script>

<style scoped>
  .el-radio{
    margin-left: 30px;
  }
  .el-input{
    width:calc(100% - 80px);
  }
</style>
