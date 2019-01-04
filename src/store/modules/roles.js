import * as types from '../mutation-types.js'

//全局状态
const state = {
  roleInfo: []
}

//getters
const getters = {
  [types.ROLE]: state => {
    return state.roleInfo
  }
}

const mutations = {
  [types.ROLE] (state, roleinfo) {
    state.roleInfo = roleinfo
  }
}

const actions = {
  [types.ROLE]({commit}) {
    commit(types.ROLE, [
      {
        RoleID: 1,
        RoleName: '电商总管理员'
      },
      {
        RoleID: 2,
        RoleName: '会员超级管理员'
      },
      {
        RoleID: 3,
        RoleName: '机构管理员'
      },
      {
        RoleID: 4,
        RoleName: '运营中心管理员'
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
