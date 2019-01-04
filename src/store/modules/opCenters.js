import * as types from '../mutation-types.js'

//全局状态
const state = {
  opCenters: []
}

//getters
const getters = {
  [types.OPCENTER]: state => {
    return state.opCenters
  }
}

const mutations = {
  [types.OPCENTER] (state, opcenters) {
    state.opCenters = opcenters
  }
}

const actions = {
  [types.OPCENTER]({commit}) {
    commit(types.OPCENTER, [
      {
        UserNo: '555',
        UserName: '555运营',
        CardType: 1,
        CardNo: '429001198410055637',
        UserAccount: '101559',
        UserPassword: '123456',
        Contact: '张三',
        ContactTel: '15013843457',
        CreateTime: '2018/12/15 10:40:10'
      },
      {
        UserNo: '555',
        UserName: '555运营',
        CardType: 2,
        CardNo: '429001198410055637',
        UserAccount: '101559',
        UserPassword: '123456',
        Contact: '张三',
        ContactTel: '15013843457',
        CreateTime: '2018/12/15 10:40:10'
      },
      {
        UserNo: '555',
        UserName: '555运营',
        CardType: 3,
        CardNo: '429001198410055637',
        UserAccount: '101559',
        UserPassword: '123456',
        Contact: '张三',
        ContactTel: '15013843457',
        CreateTime: '2018/12/15 10:40:10'
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
