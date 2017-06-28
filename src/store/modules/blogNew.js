/**
 * Created by thejojo on 2017/6/26.
 */

import * as blogNew from '@/service/blogNew'

const types = {
  CREATE_NEW_BOOK: 'blogNew/CREATE_NEW_BOOK',
  GET_BOOKS: 'blogNew/GET_BOOKS'
  // INIT_CURRENT_USER: 'login/INIT_CURRENT_USER'
}
const state = {
  books: []
  // currentUser: ''
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  getBooks: state => state.books
  // getCurrentUser: state => state.currentUser
}

// actions
const actions = {
  actionGetBooks ({ commit, rootState }) {
    console.log('要获取book的数据')
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      blogNew.getBooks(rootState.login.currentUser.id, (backresult, result) => {
        if (result === 'success') {
          resolve(backresult)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('获取book数据成功了')
      console.log(data)
      commit(types.GET_BOOKS, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  },
  // 在这里是要进行av的init，还有计算什么的。如果创建成功，那么就在本地也创造一个book
  actionCreateNewBook ({ commit, rootState }, bookname) {
    const promise = new Promise(function (resolve, reject) {
      const userid = rootState.login.currentUser.id
      blogNew.createNewBook(userid, bookname, (backresult, result) => {
        if (result === 'success') {
          resolve(backresult)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      // Todo：这里需要处理一下获取的数据,这个要不要加工成干净的数据呢？
      // Todo: 突然意识到，只要把饭回来的数据直接插入进去不久完了么？
      // 这个是创造本地数据
      commit(types.CREATE_NEW_BOOK, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  }
}

// mutations
const mutations = {
  // [types.SAVE_CURRENT_USER] (state, user) {
  //   state.currentUser = user
  // },
  [types.GET_BOOKS] (state, books) {
    console.log('97u98asudfioja isdfj')
    state.books = books
  },
  [types.CREATE_NEW_BOOK] (state, newbook) {
    state.books.unshift(newbook)
    console.log(state.books)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
