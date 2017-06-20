/**
 * Created by thejojo on 2017/6/6.
 */
import * as leancloud from '@/service/leancloud'
import * as dataChange from '@/service/timeline'
import Vue from 'vue'
// import * as test from '@/service/test'

const types = {
  GET_READLINEDATA: 'timeline/GET_READLINEDATA',
  GET_READLINETIME: 'timeline/GET_READLINETIME',
  INIT_CURRENT_TIMELINEDATE: 'timeline/INIT_CURRENT_TIMELINEDATE',
  DELETE_TIMELINE: 'timeline/DELETE_TIMELINE',
  CHANGE_TIMELINE: 'timeline/CHANGE_TIMELINE'
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
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      leancloud.getTimeline(userid, (backresult, result) => {
        if (result === 'success') {
          resolve(backresult)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('获取数据成功了')
      const result = dataChange.dateToTimelines(data)
      commit(types.GET_READLINETIME, result['days'])
      commit(types.GET_READLINEDATA, result['dates'])
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  },
  // 更改阅读状态
  actionChangeTimeline ({ commit }, timeline) {
    console.log(timeline)
    const promise = new Promise(function (resolve, reject) {
      leancloud.changeTimeline(timeline, (backresult, result) => {
        if (result === 'success') {
          resolve(timeline)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      let key = Vue.prototype.$formatDate(data.createdAt, 'yyyy-MM-dd')
      // 用循环的方式找到数据并且删除
      state.readTimelineDates[key].forEach(function (value) {
        if (data.id === value.id) {
          let timeline = {
            _key: key,
            _value: value
          }
          commit(types.CHANGE_TIMELINE, timeline)
        }
      })
    }, function (error) {
      console.log(error)
      console.log('修改状态出了什么错误')
    })
  },
  // 删除timeline
  actionDeleteTimeline ({ commit }, timeline) {
    const promise = new Promise(function (resolve, reject) {
      leancloud.deleteTimeline(timeline.id, (backresult, result) => {
        if (result === 'success') {
          resolve(timeline)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      // 这里要commit state里的数据
      let key = Vue.prototype.$formatDate(data.createdAt, 'yyyy-MM-dd')
      // 用循环的方式找到数据并且删除
      state.readTimelineDates[key].forEach(function (value) {
        if (data.id === value.id) {
          let timeline = {
            _key: key,
            _value: value
          }
          commit(types.CHANGE_TIMELINE, timeline)
        }
      })
    }, function (error) {
      console.log(error)
    })
  // })
  }
}

// mutations
const mutations = {
  [types.DELETE_TIMELINE] (state, timeline) {
    state.readTimelineDates[timeline._key] = state.readTimelineDates[timeline._key].filter(function (el) {
      return el.id !== timeline._value.id
    })
  },
  [types.CHANGE_TIMELINE] (state, timeline) {
    const tochange = state.readTimelineDates[timeline._key].filter(function (el) {
      return el.id === timeline._value.id
    })
    tochange[0].attributes.isFinished = !tochange[0].attributes.isFinished
  },
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
