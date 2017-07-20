/* eslint-disable no-unexpected-multiline */
/**
 * Created by thejojo on 2017/6/26.
 */

import * as blogNew from '@/service/blogNew'

const types = {
  CREATE_NEW_BOOK: 'blogNew/CREATE_NEW_BOOK',
  GET_BOOKS: 'blogNew/GET_BOOKS',
  CHANGE_BOOKNAME: 'blogNew/CHANGE_BOOKNAME',
  SAVE_CURRENT_BOOK: 'blog/SAVE_CURRENT_BOOK',
  SAVE_CURRENT_BOOKINDEX: 'blog/SAVE_CURRENT_BOOKINDEX',
  DELETE_BOOK: 'blog/DELETE_BOOK',
  SAVE_CURRENT_BOOK_ARTICLES: 'blog/SAVE_CURRENT_BOOK_ARTICLES',
  SAVE_CHANGE_BOOKS_INDEX: 'blog/SAVE_CHANGE_BOOKS_INDEX',
  SAVE_IS_CHANGE_BOOK_ARTICLE: 'blog/SAVE_IS_CHANGE_BOOK_ARTICLE'
  // INIT_CURRENT_USER: 'login/INIT_CURRENT_USER'
}
const state = {
  books: [],
  currentBook: [],
  current_book_articles: [],
  current_book_index: 0,
  isChangeBookArticle: false
  // currentUser: ''
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  getBooks: state => state.books,
  getIsChangeBookArticle: state => state.isChangeBookArticle,
  // getSortedBooks: state => {
  //   return state.books.sort((a, b) => a.attributes.sort - b.attributes.sort)
  // },
  getCurrentBook: state => state.currentBook,
  getCurrentBookArticles: state => state.current_book_articles,
  getCurrentBookIndex: state => state.current_book_index
}
// actions
const actions = {
  actionSaveIsChangeBookArticle ({ commit }, isChange) {
    commit(types.SAVE_IS_CHANGE_BOOK_ARTICLE, isChange)
  },
  // 更换两者的sort值，然后更换leancloud的
  actionSaveChangeBooksIndex ({ commit }, bookindexdata) {
    commit(types.SAVE_CHANGE_BOOKS_INDEX, bookindexdata)
  },
  // 删除book
  actionDeleteBook ({ commit, rootState }, bookdata) {
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      console.log('开始删除')
      console.log(bookdata)
      blogNew.deleteBook(bookdata, (backresult, result) => {
        if (result === 'success') {
          const articles = rootState.articles.articles
          const data = {
            _articles: articles,
            _bookindex: bookdata.bookindex,
            _bookid: bookdata.bookid
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
  // 保存当前的bookindex
  actionSaveCurrentBookIndex ({ commit }, bookindex) {
    commit(types.SAVE_CURRENT_BOOKINDEX, bookindex)
  },
  // 保存当前book的文章
  actionSaveCurrentBookArticles ({ commit, rootState }) {
    const articles = rootState.articles.articles
    commit(types.SAVE_CURRENT_BOOK_ARTICLES, articles)
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
    console.log(data)
    // xian从数组里删除指定位置元素，然后赋值
    state.books.splice(data._bookindex, 1)
    // 如果是最后一个元素，那么index将减少1
    if (state.books[data._bookindex]) {
      state.currentBook = state.books[data._bookindex]
    } else {
      state.currentBook = state.books[data._bookindex - 1]
      state.current_book_index = data._bookindex - 1
    }
    for (let i = data._articles.length - 1; i >= 0; i--) {
      if (data._articles[i].attributes.belongbook.id === data._bookid) {
        data._articles.splice(i, 1)
      }
    }
  },
  [types.SAVE_CURRENT_BOOK] (state, data) {
    // console.log(data)
    state.currentBook = data._book
    // 保存，同时保存当前book里的articles
  },
  [types.SAVE_CURRENT_BOOK_ARTICLES] (state, articles) {
    const tosave = articles.filter(function (el) {
      return el.attributes.belongbook.id === state.currentBook.id
    })
    state.current_book_articles = tosave
  },
  [types.SAVE_CURRENT_BOOKINDEX] (state, bookindex) {
    // console.log(bookindex)
    state.current_book_index = bookindex
  },
  [types.CHANGE_BOOKNAME] (state, newbookname) {
    state.currentBook.attributes.title = newbookname.bookname
  },
  [types.SAVE_IS_CHANGE_BOOK_ARTICLE] (state, isChange) {
    state.isChangeBookArticle = isChange
  },
  [types.SAVE_CHANGE_BOOKS_INDEX] (state, indexs) {
    // 在这里遇到个问题，就是会出现警告说不能再mutation以外操作
    // 原因可能是需要deepcopy，又或者是因为draggable的问题？
    // 太奇怪了吧，为什么变其他的属性如title就没问题，但是变这个属性就出错？
    // 发现还是sort的问题
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    console.log('8888888888888888888')
    let indexnum = state.books[indexs.oldIndex].attributes.sort
    state.books[indexs.oldIndex].attributes.sort = state.books[indexs.newIndex].attributes.sort
    state.books[indexs.newIndex].attributes.sort = indexnum
    var tmp = state.books[indexs.oldIndex]
    state.books[indexs.oldIndex] = state.books[indexs.newIndex]
    state.books[indexs.newIndex] = tmp
    console.log(tmp)
    console.log(tmp)
    console.log(tmp)
    console.log(tmp)
    console.log(tmp)
    // let arr = state.books
    // let x
    // let y
    // if (indexs.oldIndex < indexs.newIndex) {
    //   x = indexs.oldIndex
    //   y = indexs.newIndex
    // } else {
    //   y = indexs.oldIndex
    //   x = indexs.newIndex
    // }
    // arr.splice(x - 1, 1, ...arr.splice(y - 1, 1, arr[x - 1]))
    // [state.books[indexs.newIndex], state.books[indexs.oldIndex]] = [state.books[indexs.oldwIndex], state.books[indexs.newIndex]]
  },
  [types.GET_BOOKS] (state, books) {
    state.books = books
    // 这里获取数据之后默认为0的currentbook设置一下。aaa
    state.currentBook = books[0]
  },
  [types.CREATE_NEW_BOOK] (state, newbook) {
    state.books.unshift(newbook)
    state.currentBook = newbook
    // 新建的时候，当前的文章数为0，所以没必要插入。
    // 但是需要保存bookindex，用来保证active类正确
    state.current_book_index = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
