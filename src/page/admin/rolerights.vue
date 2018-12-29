<template>
  <div class="container-box">
    <div class="form-box">
      <el-row class="input-box" :gutter="20">
        <el-col :span="6" class="input-label">
          <el-col :span="6" class="label">角色名称：</el-col>
          <el-col :span="12">
            <el-input placeholder="请输入角色名称" size="mini" v-model="input2"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button size="mini" class="el-button--primary" style="margin-left: 1em;">新增角色</el-button>
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-table
      :header-cell-style="tableHeaderColor"
      :data="tableData"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column prop="date" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.prevent="authRoleRights">角色授权</el-button>
          <el-button type="text" size="small">权限详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <auth-rights :show-auth-rights-dialog="showAuthRightsDialog"></auth-rights>
    <pagination
      @sendPageSize="receivePageSize"
      @sendCurrentPage="receiveCurrentPage"
      :totalPage="totalPage"
    ></pagination>
  </div>
</template>
<script>
  import pagination from "common/pagination";
  import AuthRights from  '../dialog/authRights';

  export default {
    data() {
      return {
        totalPage: 300,
        showAuthRightsDialog: false,
        tableData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ],
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ],
        value: "",
        input2: "",
        DateValue: ""
      };
    },
    methods: {
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
      authRoleRights () {
        debugger
        this.showAuthRightsDialog = !this.showAuthRightsDialog;
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
