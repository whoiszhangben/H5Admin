<template>
  <div class="container-box">
    <div class="form-box">
      <el-row class="input-box" :gutter="20">
        <el-col :span="6" class="input-label">
          <el-col :span="8" class="label">商品编码：</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入商品编码" size="mini" v-model="input2"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6" class="input-label">
          <el-col :span="8" class="label">商品名称：</el-col>
          <el-col :span="16">
            <el-input placeholder="请输入商品名称" size="mini" v-model="input2"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-button class="el-button--mini el-button--primary">查询</el-button>
          <el-button class="el-button--mini el-button--default">重置</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: right;">
          <el-button class="el-button--mini el-button--primary" @click="addProduct">新增商品</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :header-cell-style="tableHeaderColor"
      :data="getProducts"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column prop="ProductCode" label="商品编码"></el-table-column>
      <el-table-column prop="ProductName" label="商品名称"></el-table-column>
      <el-table-column prop="ProductShortName" label="商品简称"></el-table-column>
      <el-table-column prop="Brand" label="品牌"></el-table-column>
      <el-table-column prop="MarketPrice" label="市场价格"></el-table-column>
      <el-table-column prop="ShopPrice" label="商品价格"></el-table-column>
      <el-table-column prop="Inventory" label="库存"></el-table-column>
      <el-table-column prop="Inventory" label="费用类别"></el-table-column>
      <el-table-column prop="Specification" label="规格名称"></el-table-column>
    </el-table>
    <add-product :showAddPoductDialog="showAddPoductDialog"></add-product>
    <pagination
      @sendPageSize="receivePageSize"
      @sendCurrentPage="receiveCurrentPage"
      :totalPage="totalPage"
    ></pagination>
  </div>
</template>
<script>
  import pagination from "common/pagination";
  import {mapGetters, mapActions} from 'vuex';
  import * as types from "../../store/mutation-types";
  import addProduct from '../dialog/addProduct'
  export default {
    data() {
      return {
        totalPage: 300,
        value: "",
        input2: "",
        DateValue: "",
        showAddPoductDialog: false
      };
    },
    created () {
      if (this.getProducts.length === 0) {
        this.fetchProducts();
      }
      this.totalPage = this.getProducts.length;
    },
    computed: {
      ...mapGetters({
        getProducts: types.PRODUCT
      })
    },
    methods: {
      ...mapActions({
        fetchProducts: types.PRODUCT
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
      addProduct () {
        this.showAddPoductDialog = !this.showAddPoductDialog;
      }
    },
    watch: {
      DateValue(newval, oldval) {
        console.log(newval);
        console.log(oldval);
      }
    },
    components: {
      pagination,
      addProduct
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
