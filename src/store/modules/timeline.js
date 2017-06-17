/**
 * Created by thejojo on 2017/6/6.
 */
import leancloud from '@/service/leancloud'
import Vue from 'vue'

const types = {
  GET_READLINEDATA: 'timeline/GET_READLINEDATA',
  GET_READLINETIME: 'timeline/GET_READLINETIME',
  INIT_CURRENT_TIMELINEDATE: 'login/INIT_CURRENT_TIMELINEDATE'
}
const state = {
  readTimelineDates: [],
  readTimelineTimes: []
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  getTimelineDates: state => state.readTimelineDates,
  getTimelineTimes: state => state.readTimelineTimes
}

// actions
const actions = {
  // 退出之后初始化state里的数据
  actionInitCurrentTimelineDate ({ commit }) {
    commit(types.INIT_CURRENT_TIMELINEDATE)
  },
  // 获取我的足迹
  actionGetTimelineDates ({ commit }, userid) {
    var promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      const AV = leancloud.AVinit()
      const query = new AV.Query('ReadInfo')
      const ownerid = AV.Object.createWithoutData('_User', userid)
      query.ascending('createdAt')
      query.limit(1000)
      query.equalTo('owner', ownerid)
      query.find().then((results) => {
        console.log('timeline数据下载完毕')
        console.log(results.length)
        resolve(results)
      }, function (error) {
        console.log(error)
        reject(error)
      })
    })
    promise.then(function (data) {
      console.log('获取数据成功了')
      console.log(typeof data)
      console.log(data)
      // 在此处把数据分成相同日期的字典
      // keys字典存放的是日期集合的字典，关键字就是日期
      // dates数组存放的是所有日期的集合
      // values字典存放的是真正的数据，关键字就是日期
      const keys = {}
      const dates = []
      const values = {}
      for (let i = data.length - 1; i >= 0; i--) {
        // 数组里首先取一个数，加工后获取它的日期
        const key = Vue.prototype.$formatDate(data[i].createdAt, 'yyyy-MM-dd')
        const value = keys[key]
        if (!value) {
          keys[key] = key
          dates.push(key)
          values[key] = []
          values[key].push(data[i])
        } else {
          values[key].push(data[i])
        }
        console.log(key)
      }
      // 这是要把字典日期给排序
      const keyAttr = Object.keys(keys).sort(function (a, b) {
        return new Date(b) - new Date(a)
      })
      commit(types.GET_READLINETIME, keyAttr)
      commit(types.GET_READLINEDATA, values)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  }
}

// mutations
const mutations = {
  [types.INIT_CURRENT_TIMELINEDATE] (state) {
    state.readTimelineTimes = []
    state.readTimelineDates = []
  },
  [types.GET_READLINEDATA] (state, timelinedates) {
    state.readTimelineDates = timelinedates
  },
  [types.GET_READLINETIME] (state, times) {
    state.readTimelineTimes = times
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
