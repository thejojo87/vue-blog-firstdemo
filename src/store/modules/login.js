/**
 * Created by thejojo on 2017/6/5.
 */

const types = {
  SAVE_CURRENT_USER: 'login/SAVE_CURRENT_USER',
  INIT_CURRENT_USER: 'login/INIT_CURRENT_USER'
}
const state = {
  currentUser: ''
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  getCurrentUser: state => state.currentUser
}

// actions
const actions = {
  actionSaveCurrentUser ({ commit }, user) {
    commit(types.SAVE_CURRENT_USER, user)
  },
  actionInitCurrentUser ({ commit }) {
    commit(types.INIT_CURRENT_USER)
  }
}

// mutations
const mutations = {
  [types.SAVE_CURRENT_USER] (state, user) {
    state.currentUser = user
  },
  [types.INIT_CURRENT_USER] (state) {
    state.currentUser = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
