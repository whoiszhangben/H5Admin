import * as types from '../mutation-types.js'

//全局状态
const state = {
  menuRole: []
}

//getters
const getters = {
  [types.MENUROLE]: state => {
    return state.menuRole
  }
}

const mutations = {
  [types.MENUROLE] (state, menurole) {
    state.menuRole = menurole
  }
}

const actions = {
  [types.MENUROLE]({commit}) {
    commit(types.MENUROLE, [
      {
        MenuID: 1,
        MenuName: '管理员管理',
        MenuURL: '',
        MenuLevel: 1,
        ParentID: 0,
        RoleID: 1,
        RoleName: '电商总管理员',
        MenuIcon: 'fa fa-shield'
      },
      {
        MenuID: 8,
        MenuName: '设置角色权限',
        MenuURL: '/Manage/RoleRights',
        MenuLevel: 2,
        ParentID: 1,
        RoleID: 1,
        RoleName: '电商总管理员',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 9,
        MenuName: '设置管理员角色',
        MenuURL: '/Manage/ManagerRole',
        MenuLevel: 2,
        ParentID: 1,
        RoleID: 1,
        RoleName: '电商总管理员',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 10,
        MenuName: '管理员信息',
        MenuURL: '/Manage/ManagerInfo',
        MenuLevel: 2,
        ParentID: 1,
        RoleID: 1,
        RoleName: '电商总管理员',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 2,
        MenuName: '香港代购',
        MenuURL: '',
        MenuLevel: 1,
        RoleID: 0,
        ParentID: 0,
        RoleName: '',
        MenuIcon: 'fa fa-shopping'
      },
      {
        MenuID: 11,
        MenuName: '客户管理',
        MenuURL: '/HK/Customer',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 2,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 12,
        MenuName: '商品管理',
        MenuURL: '/HK/Goods',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 2,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 13,
        MenuName: '供应商管理',
        MenuURL: '/HK/Vendor',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 2,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 14,
        MenuName: '采购管理',
        MenuURL: '/HK/Purchase',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 2,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 15,
        MenuName: '销售管理',
        MenuURL: '/HK/Sale',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 2,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 3,
        MenuName: '华信工作',
        MenuURL: '',
        MenuLevel: 1,
        RoleID: 0,
        ParentID: 0,
        RoleName: '',
        MenuIcon: 'fa fa-support'
      },
      {
        MenuID: 16,
        MenuName: '档案管理',
        MenuURL: '/HX/Profile',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 3,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 17,
        MenuName: '扩展功能',
        MenuURL: '/HX/Ext',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 3,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 4,
        MenuName: '会员管理',
        MenuURL: '',
        MenuLevel: 1,
        RoleID: 0,
        ParentID: 0,
        RoleName: '',
        MenuIcon: 'fa fa-user'
      },
      {
        MenuID: 18,
        MenuName: '电商账户',
        MenuURL: '/Member/ECAccount',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 4,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 19,
        MenuName: '运营中心',
        MenuURL: '/Member/OPCenter',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 4,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 20,
        MenuName: '综合会员',
        MenuURL: '/Member/GeneralMember',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 4,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 21,
        MenuName: '机构信息',
        MenuURL: '/Member/AreaInfo',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 4,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 22,
        MenuName: '公众号信息',
        MenuURL: '/Member/Wechat',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 4,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 23,
        MenuName: '手工兑换',
        MenuURL: '/Member/Exchange',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 4,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 5,
        MenuName: '商城管理',
        MenuURL: '',
        MenuLevel: 1,
        RoleID: 0,
        ParentID: 0,
        RoleName: '',
        MenuIcon: 'fa fa-laptop'
      },
      {
        MenuID: 24,
        MenuName: '客户资料',
        MenuURL: '/Mall/Customer',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 5,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 25,
        MenuName: '商品管理',
        MenuURL: '/Mall/Goods',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 5,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 26,
        MenuName: '评价管理',
        MenuURL: '/Mall/Comment',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 5,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 27,
        MenuName: '提货管理',
        MenuURL: '/Mall/Delivery',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 5,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 28,
        MenuName: '代售管理',
        MenuURL: '/Mall/Commission',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 5,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 29,
        MenuName: '快递管理',
        MenuURL: '/Mall/Express',
        MenuLevel: 2,
        RoleID: 0,
        ParentID: 5,
        RoleName: '',
        MenuIcon: 'fa fa-circle-o'
      },
      {
        MenuID: 6,
        MenuName: '报表查询',
        MenuURL: '',
        MenuLevel: 1,
        RoleID: 0,
        ParentID: 0,
        RoleName: '',
        MenuIcon: 'fa fa-bar-chart'
      },
      {
        MenuID: 7,
        MenuName: '个人点滴',
        MenuURL: '',
        MenuLevel: 1,
        RoleID: 0,
        ParentID: 0,
        RoleName: '',
        MenuIcon: 'fa fa-edit'
      }
    ])
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
