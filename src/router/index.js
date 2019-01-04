import Vue from "vue"
import VueRouter from "vue-router"

// 引入组件

import login from '../page/login.vue'
import home from '../page/home.vue'
import notFound from '../page/404.vue'
import sub11 from '../page/admin/sub1.vue'
import sub12 from '../page/admin/sub2.vue'
import roleRights from '../page/admin/roleRights'
import sub21 from '../page/menu2/sub1.vue'
import managerRoles from '../page/admin/managerrole'
import managerInfo from '../page/admin/managerinfo'
import opCenter from '../page/member/opCenter'
import product from '../page/mall/product'
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    component: login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: notFound,
    name: '',
    hidden: true
  },
  {
    path: '/admin',
    component: home,
    name: '管理员管理',
    iconCls: 'el-icon-message', //图标样式class
    children: [
      {
        path: 'roleRights',
        component: roleRights,
        name: '设置角色权限'
      },
      {
        path: 'managerRoles',
        component: managerRoles,
        name: '设置管理员角色'
      },
      {
        path: 'managerInfo',
        component: managerInfo,
        name: '管理员信息'
      }
    ]
  },
  {
    path: '/member',
    component: home,
    name: '会员管理',
    iconCls: 'el-icon-message',
    children: [
      {
        path: 'sub1',
        component: sub21,
        name: '电商账户'
      },
      {
        path: 'opCenter',
        component: opCenter,
        name: '运营中心'
      },
      {
        path: 'sub3',
        component: sub21,
        name: '综合会员'
      },
      {
        path: 'sub4',
        component: sub11,
        name: '机构信息'
      },
      {
        path: 'sub5',
        component: sub12,
        name: '公众号信息'
      }
    ]
  },
  {
    path: '/mall',
    component: home,
    name: '商城管理',
    iconCls: 'el-icon-message',
    children: [
      {
        path: 'product',
        component: product,
        name: '商品管理'
      },
      {
        path: 'opCenter',
        component: opCenter,
        name: '提货管理'
      },
      {
        path: 'sub3',
        component: sub21,
        name: '商城评价管理'
      },
      {
        path: 'sub4',
        component: sub11,
        name: '代售管理'
      },
      {
        path: 'sub5',
        component: sub12,
        name: '快递公司管理'
      }
    ]
  }
];
var router = new VueRouter({
    routes
})
export default router;
