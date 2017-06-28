/**
 * Created by thejojo on 2017/6/26.
 */

import * as blogNew from '@/service/blogNew'

const types = {
  CREATE_NEW_BOOK: 'blogNew/CREATE_NEW_BOOK',
  GET_BOOKS: 'blogNew/GET_BOOKS',
  CHANGE_BOOKNAME: 'blogNew/CHANGE_BOOKNAME',
  SAVE_CURRENT_BOOK: 'blog/SAVE_CURRENT_BOOK',
  DELETE_BOOK: 'blog/DELETE_BOOK'
  // INIT_CURRENT_USER: 'login/INIT_CURRENT_USER'
}
const state = {
  books: [],
  currentBook: []
  // currentUser: ''
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  getBooks: state => state.books,
  getCurrentBook: state => state.currentBook
}

// actions
const actions = {
  // 删除book
  actionDeleteBook ({ commit }, bookdata) {
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      blogNew.deleteBook(bookdata, (backresult, result) => {
        if (result === 'success') {
          resolve(bookdata.bookindex)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (bookindex) {
      console.log('删除book成功了')
      commit(types.DELETE_BOOK, bookindex)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  },
  // 保存当前的book
  actionSaveCurrentBook ({ commit }, book) {
    commit(types.SAVE_CURRENT_BOOK, book)
  },
  // 修改book的名字
  actionChangeBookname  ({ commit }, bookdata) {
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      blogNew.changeBookname(bookdata, (backresult, result) => {
        if (result === 'success') {
          resolve(bookdata)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('获取book名称成功了')
      console.log(data)
      commit(types.CHANGE_BOOKNAME, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  },
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
  [types.DELETE_BOOK] (state, bookindex) {
    // 这里要删除本地book，然后把相同indexbook作为currentbook
    // xian从数组里删除指定位置元素，然后赋值
    console.log(bookindex)
    state.books.splice(bookindex, 1)
    state.currentBook = state.books[bookindex]
  },
  [types.SAVE_CURRENT_BOOK] (state, book) {
    console.log(book)
    state.currentBook = book
  },
  [types.CHANGE_BOOKNAME] (state, newbookname) {
    state.currentBook.attributes.title = newbookname.bookname
  },
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
