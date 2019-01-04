<template>
  <el-dialog :title="authTitle" :visible="showAuthRightsVisible" width="30%" center :show-close="false">
    <div>
      <el-tree
        :data="currentRoleRights"
        :default-checked-keys="currentCheckedNode"
        :default-expanded-keys="currentCheckedNode"
        :props="defaultProps"
        :show-checkbox="true"
        node-key="id">
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">确定</el-button>
      <el-button type="text" @click.prevent="showAuthRightsVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as types from "../../store/mutation-types";
  export default {
    props: {
      showAuthRightsDialog: {
        type: Boolean,
        default: false
      },
      roleID: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        showAuthRightsVisible: false,
        authTitle: '',
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
      if (this.getMenuRoles.length === 0) {
        this.fetchMenuRoles();
      }
    },
    computed: {
      ...mapGetters({
        getRoles: types.ROLE,
        getMenuRoles: types.MENUROLE
      })
    },
    methods: {
      ...mapActions({
        fetchRoles: types.ROLE,
        fetchMenuRoles: types.MENUROLE
      })
    },
    watch: {
      showAuthRightsDialog: function () {
        let currentRole = this.getRoles.find(item => {
          return item.RoleID === this.roleID;
        })
        this.authTitle = '角色授权(' + currentRole.RoleName + ')'

        let arr = [], checkedArr = [];
        let topMenu = this.getMenuRoles.filter(item => {
          return item.MenuLevel === 1 && item.ParentID === 0
        })
        topMenu.forEach(item => {
          let subMenu = this.getMenuRoles.filter(subitem => {
            return subitem.MenuLevel === 2 && subitem.ParentID === item.MenuID
          })
          let current = {
            id: item.MenuID,
            label: item.MenuName,
            children: []
          }
          subMenu.forEach(item => {
            if(item.RoleID) {
              checkedArr.push(item.MenuID);
            }
            current.children.push({
              id: item.MenuID,
              label: item.MenuName
            })
          });
          arr.push(current);
        })
        this.currentRoleRights = arr;
        this.currentCheckedNode = checkedArr;
        console.log(checkedArr);
        console.log(this.currentCheckedNode);
        this.showAuthRightsVisible = true;
      }
    }
  }
</script>
