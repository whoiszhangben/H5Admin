import * as types from '../mutation-types.js'

//全局状态
const state = {
  roleInfo: []
}

//getters
const getters = {
  roleInfo: state => {
    return state.roleInfo
  }
}

const mutations = {
  [types.SET_ROLE] (state, roleinfo) {
    state.roleInfo = roleinfo
  }
}

export default {
  state,
  mutations,
  getters
}
