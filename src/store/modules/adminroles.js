import * as types from '../mutation-types.js'

//全局状态
const state = {
  adminRole: []
}

//getters
const getters = {
  [types.ADMINROLE]: state => {
    return state.adminRole
  }
}

const mutations = {
  [types.ADMINROLE] (state, menurole) {
    state.adminRole = menurole
  }
}

const actions = {
  [types.ADMINROLE]({commit}) {
    commit(types.ADMINROLE, [
      {
        LoginID: 1,
        LoginAccount: 'zk_admin',
        RoleID: 1,
        RoleName: '电商总管理员'
      },
      {
        LoginID: 1,
        LoginAccount: 'zk_admin',
        RoleID: 1,
        RoleName: '电商总管理员'
      },
      {
        LoginID: 1,
        LoginAccount: 'zk_admin',
        RoleID: 1,
        RoleName: '电商总管理员'
      },
      {
        LoginID: 1,
        LoginAccount: 'zk_admin',
        RoleID: 1,
        RoleName: '电商总管理员'
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
