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
  currentBook: [],
  current_book_articles: []
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
  actionDeleteBook ({ commit, rootState }, bookdata) {
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      blogNew.deleteBook(bookdata, (backresult, result) => {
        if (result === 'success') {
          const articles = rootState.articles.articles
          const data = {
            _articles: articles,
            _bookindex: bookdata.bookindex
          }
          resolve(data)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('删除book成功了')
      commit(types.DELETE_BOOK, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  },
  // 保存当前的book
  actionSaveCurrentBook ({ commit, rootState }, book) {
    const articles = rootState.articles.articles
    const data = {
      _articles: articles,
      _book: book
    }
    commit(types.SAVE_CURRENT_BOOK, data)
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
  [types.DELETE_BOOK] (state, data) {
    // 这里要删除本地book，然后把相同indexbook作为currentbook
    // xian从数组里删除指定位置元素，然后赋值
    state.books.splice(data._bookindex, 1)
    state.currentBook = state.books[data._bookindex]
    const tosave = data._articles.filter(function (el) {
      return el.attributes.belongbook.id === state.currentBook.id
    })
    state.current_book_articles = tosave
  },
  [types.SAVE_CURRENT_BOOK] (state, data) {
    state.currentBook = data._book
    // 保存，同时保存当前book里的articles
    const tosave = data._articles.filter(function (el) {
      return el.attributes.belongbook.id === state.currentBook.id
    })
    state.current_book_articles = tosave
  },
  [types.CHANGE_BOOKNAME] (state, newbookname) {
    state.currentBook.attributes.title = newbookname.bookname
  },
  [types.GET_BOOKS] (state, books) {
    state.books = books
  },
  [types.CREATE_NEW_BOOK] (state, newbook) {
    state.books.unshift(newbook)
    state.currentBook = newbook
    // 新建的时候，当前的文章数为0，所以没必要插入。
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
