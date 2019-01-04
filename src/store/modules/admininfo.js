import * as types from '../mutation-types.js'

//全局状态
const state = {
  adminInfo: []
}

//getters
const getters = {
  [types.ADMININFO]: state => {
    return state.adminInfo
  }
}

const mutations = {
  [types.ADMININFO] (state, menurole) {
    state.adminInfo = menurole
  }
}

const actions = {
  [types.ADMININFO]({commit}) {
    commit(types.ADMININFO, [
      {
        LoginID: 1,
        UserID: 1,
        LoginAccount: 'zk_admin',
        AccountType: 10,
        AccountStatus: 1,
        Mobile: '15013843457',
        CreateTime: '2018-12-12 11:11:08',
        UpdateTime: ''
      },
      {
        LoginID: 2,
        UserID: 2,
        LoginAccount: '999_admin',
        AccountType: 12,
        AccountStatus: 1,
        Mobile: '15013843457',
        CreateTime: '2018-12-12 11:11:08',
        UpdateTime: ''
      },
      {
        LoginID: 3,
        UserID: 3,
        LoginAccount: '901_admin',
        AccountType: 14,
        AccountStatus: 1,
        Mobile: '15013843457',
        CreateTime: '2018-12-12 11:11:08',
        UpdateTime: ''
      },
      {
        LoginID: 4,
        UserID: 4,
        LoginAccount: '888_admin',
        AccountType: 15,
        AccountStatus: 2,
        Mobile: '15013843457',
        CreateTime: '2018-12-12 11:11:08',
        UpdateTime: ''
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
