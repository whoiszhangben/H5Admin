import * as types from '../mutation-types.js'
import utils from '../../utils';

//全局状态
const state = {
  user: Object.assign(JSON.parse(decodeURIComponent(atob(localStorage.getItem('a_b_c_d_e_f_g') || '')) || null) || {}, {isLogin: false}) || {isLogin: false},
  lockScreen: Object.assign(utils.localStorageUtil.getItem('h_i_j_k_l_m_n') || {
    startTime: new Date(),
    isLocked: false,
    takeEffectInterval: 15
  })
}

//getters
const getters = {
  [types.USER]: state => state.user,
  [types.LOCKSCREEN]: state => state.lockScreen
}

const mutations = {
  [types.USER] (state, data) {
    localStorage.setItem('a_b_c_d_e_f_g', btoa(encodeURIComponent(JSON.stringify(data || {})) || ''));
    state.user = data
  },
  [types.LOCKSCREEN] (state, data) {
    state.lockScreen.startTime = data.startTime ? data.startTime : state.lockScreen.startTime;
    state.lockScreen.isLocked = data.isLocked;
  }
}

export default {
  state,
  mutations,
  getters
}
