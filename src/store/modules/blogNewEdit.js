/**
 * Created by thejojo on 2017/7/5.
 */
import * as blogNewEdit from '@/service/blogNewEdit'

const types = {
  SAVE_CURRENT_EDIT_TITLE: 'blogNewEdit/SAVE_CURRENT_EDIT_TITLE'
  // SAVE_CURRENT_USER: 'login/SAVE_CURRENT_USER',
  // INIT_CURRENT_USER: 'login/INIT_CURRENT_USER'
}
const state = {
  // currentUser: ''
}
const getters = {
  // getCurrentUser: state => state.currentUser
}

// actions
const actions = {
  actionSaveCurrentEditTitle ({ commit, rootState }, titledata) {
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      blogNewEdit.saveCurrentEditTitle(titledata, (backresult, result) => {
        if (result === 'success') {
          const articles = rootState.articles.articles
          const data = {
            _articles: articles,
            _articleid: titledata.articleid,
            _articletitle: titledata.articletitle,
            _backresult: backresult
          }
          resolve(data)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('保存editTitle数据成功了')
      console.log(data)
      commit(types.SAVE_CURRENT_EDIT_TITLE, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  }
}

// mutations
const mutations = {
  [types.SAVE_CURRENT_EDIT_TITLE] (state, titledata) {
    console.log('要修改本地名称')
    console.log(titledata)
    for (let i = titledata._articles.length - 1; i >= 0; i--) {
      if (titledata._articles[i].id === titledata._articleid) {
        console.log(titledata._articles[i])
        console.log(titledata._articles[i].attributes.title)
        titledata._articles[i].attributes.title = titledata._articletitle
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
