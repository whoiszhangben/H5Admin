<template>
  <el-dialog title="角色授权" :visible="showAuthRightsVisible" width="30%" center :show-close="false">
    <div>
      <el-tree
        :data="currentRoleRights"
        :props="defaultProps"
        :show-checkbox="true"
        node-key="MenuID"
        :default-expand-all="true">
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">确定</el-button>
      <el-button type="text" @click.prevent="showAuthRightsVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      showAuthRightsDialog: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showAuthRightsVisible: false,
        currentRoleRights: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      showAuthRightsDialog: function () {
        this.showAuthRightsVisible = true;
      }
    }
  }
</script>
