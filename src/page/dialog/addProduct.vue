<template>
  <el-dialog title="新增商品" :visible="showAddProductVisible" width="45%" center :show-close="false">
    <div>
      <el-form v-model="form" label-position="right" label-width="150px">
        <el-form-item label="商品编码" class="el-form-item--mini">
          <el-input v-model="form.ProductCode" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" class="el-form-item--mini">
          <el-input v-model="form.ProductName" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="品牌" class="el-form-item--mini">
          <el-input v-model="form.Brand" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="商品简称" class="el-form-item--mini">
          <el-input v-model="form.ProductShortName" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" class="el-form-item--mini">
          <el-input v-model="form.MarketPrice" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" class="el-form-item--mini">
          <el-input v-model="form.ShopPrice" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="库存" class="el-form-item--mini">
          <el-input v-model="form.Inventory" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="小图" class="el-form-item--mini">
          <el-upload class="avatar-uploader" :class="{disabled: uploadDisabled}" :action="logoImageUploadUrl" list-type="picture-card" :file-list="imagelist" name="logoImage" :on-success="handleUploadSuccess" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="中图" class="el-form-item--mini">
          <img src="" alt="点击上传图片" />
        </el-form-item>
        <el-form-item label="大图" class="el-form-item--mini">
          <img src="" alt="点击上传图片" />
        </el-form-item>
        <el-form-item label="商品规格" class="el-form-item--mini">
          <img src="" alt="点击上传图片"/>
        </el-form-item>
        <el-form-item label="商品描述" class="el-form-item--mini">
          <el-input type="textarea"
                    :rows="3"
                    class="el-input--small"
                    v-model="form.ProductDesc"></el-input>
        </el-form-item>
        <el-form-item label="规格名称" class="el-form-item--mini">
          <el-input v-model="form.Specification" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="是否热销" class="el-form-item--mini">
          <el-radio-group v-model="form.IsHot">
            <el-radio :value="1" label="是"></el-radio>
            <el-radio :value="0" label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品类型" class="el-form-item--mini">
          <el-radio-group v-model="form.ProductType">
            <el-radio :value="1" label="绿茶"></el-radio>
            <el-radio :value="2" label="红茶"></el-radio>
            <el-radio :value="3" label="黑茶"></el-radio>
            <el-radio :value="4" label="青茶"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动类型" class="el-form-item--mini">
          <el-radio-group>
            <el-radio :value="1" label="上新"></el-radio>
            <el-radio :value="2" label="热销"></el-radio>
            <el-radio :value="3" label="活动"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产地" class="el-form-item--mini">
          <el-input v-model="form.ProduceArea" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="材质" class="el-form-item--mini">
          <el-input v-model="form.Material" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" class="el-form-item--mini">
          <el-radio-group v-model="form.ProductStatus">
            <el-radio :value="1" label="显示"></el-radio>
            <el-radio :value="2" label="不显示"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示顺序" class="el-form-item--mini">
          <el-input v-model="form.DisplayOrder" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="费用类别" class="el-form-item--mini">
          <el-input v-model="form.DisplayOrder" class="el-input--small"></el-input>
        </el-form-item>
        <el-form-item label="是否默认规格" class="el-form-item--mini">
          <el-radio-group>
            <el-radio :value="1" label="默认"></el-radio>
            <el-radio :value="0" label="不默认"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="折扣" class="el-form-item--mini">
          <el-input v-model="form.Discount" class="el-input--small"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">确定</el-button>
      <el-button type="text" @click.prevent="showAddProductVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from "../../store/mutation-types";
  export default {
    props: {
      showAddPoductDialog: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showAddProductVisible: false,
        form: {
          type: ''
        },
        uploadDisabled: false,
        logoImageUploadUrl: '',
        imagelist: []
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
      }),
      uploadImg () {

      },
      handleUploadSuccess () {},
      handleRemove () {},
      handlePictureCardPreview () {}
    },
    watch: {
      showAddPoductDialog: function () {
        this.showAddProductVisible = true;
      }
    }
  }
</script>

<style scoped>
  .el-input, .el-textarea{
    width:calc(100% - 65px);
  }
  .disabled .el-upload--picture-card {
    display: none;
  }
</style>
