<template>
  <div class="container-box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="运营中心信息" name="first">
        <div class="pull-right">
          <el-button size="mini" class="el-button--primary" style="margin-left: 1em;margin-bottom: 15px;" @click="addOPCenter">新增运营中心</el-button>
        </div>
        <div class="table-content">
          <el-table :data="getOPCenter" size="mini" border style="width: 100%">
            <el-table-column prop="UserNo" label="运营中心编号"></el-table-column>
            <el-table-column prop="UserName" label="会员名称"></el-table-column>
            <el-table-column prop="" label="会员类型" :formatter="getConstName"></el-table-column>
            <el-table-column prop="CardType" label="证件类型" :formatter="getCardName" ></el-table-column>
            <el-table-column prop="CardNo" label="证件号码" ></el-table-column>
            <el-table-column prop="UserAccount" label="管理员账号" ></el-table-column>
            <el-table-column prop="Contact" label="联系人" ></el-table-column>
            <el-table-column prop="ContactTel" label="联系电话" ></el-table-column>
            <el-table-column prop="CreateTime" label="开户时间"></el-table-column>
          </el-table>
          <pagination
            @sendPageSize="receivePageSize"
            @sendCurrentPage="receiveCurrentPage"
            :totalPage="totalPage"
          ></pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运营中心账户" name="second">运营中心账户</el-tab-pane>
    </el-tabs>
    <add-op-center :showAddOPCenterDialog="showAddOPCenterDialog"></add-op-center>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from "../../store/mutation-types";
  import pagination from "common/pagination";
  import addOpCenter from '../../page/dialog/addOPCenter';

  export default {
    data() {
      return {
        totalPage: 0,
        activeName: 'first',
        showAddOPCenterDialog: false
      };
    },
    created () {
      if (this.getOPCenter.length === 0) {
        this.fetchOPCenter();
      }
      this.totalPage = this.getOPCenter.length;
    },
    computed: {
      ...mapGetters({
        getOPCenter: types.OPCENTER
      })
    },
    methods: {
      ...mapActions({
        fetchOPCenter: types.OPCENTER
      }),
      handleClick(tab, event) {
        console.log(tab, event);
      },
      receivePageSize (val) {
        console.log(val);
      },
      receiveCurrentPage (val) {
        console.log(val);
      },
      addOPCenter () {
        this.showAddOPCenterDialog = !this.showAddOPCenterDialog;
      },
      getCardName (row, column, value) {
        if (!value) {
          return '--';
        } else if (value === 1) {
          return '身份证';
        } else if (value === 2) {
          return '机构代码';
        } else if (value === 3) {
          return '营业执照';
        } else if (value === 4) {
          return '统一社会信用代码';
        } else if (value === 5) {
          return '其他'
        }
      },
      getConstName (row, column, value) {
        return '运营中心';
      }
    },
    components: {
      pagination,
      addOpCenter
    },
    watch: {
      'activeName' (nVal) {

      }
    }
  };
</script>

<style lang="css">
</style>
