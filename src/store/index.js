/**
 * Created by thejojo on 2017/6/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// root
import * as getters from './getters'

// modules-举例子
// import count from './modules/count'
import login from './modules/login'
import timeline from './modules/timeline'

Vue.use(Vuex)

export default new Vuex.Store({
  // root
  getters,
  // 將整理好的 modules 放到 vuex 中組合
  modules: {
    // count,
    login,
    timeline
  },
  // 嚴格模式，禁止直接修改 state
  strict: true
})
