/**
 * Created by thejojo on 2017/6/29.
 */
import * as blogNewArticle from '@/service/blogNewArticle'

const types = {
  CREATE_NEW_ARTICLE: 'blogNewArticle/CREATE_NEW_ARTICLE',
  SAVE_CURRENT_BOOK_ARTICLE: 'blogNewArticle/SAVE_CURRENT_BOOK_ARTICLE',
  SAVE_CURRENT_BOOK_ARTICLE_INDEX: 'blogNewArticle/SAVE_CURRENT_BOOK_ARTICLE_INDEX',
  DELETE_ARTICLE: 'blogNewArticle/DELETE_ARTICLE',
  TRANS_ARTICLE: 'blogNewArticle/TRANS_ARTICLE'
}
const state = {
  // articles: [],
  current_new_article: [],
  current_article_index: 0
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  getCurrentNewArticle: state => state.current_new_article,
  getCurrentArticleIndex: state => state.current_article_index
}

// actions
const actions = {
  // 移动article所属的book
  actionTransArticle ({ commit, rootState }, articledata) {
    const promise = new Promise(function (resolve, reject) {
      blogNewArticle.transArticle(articledata, (backresult, result) => {
        if (result === 'success') {
          const articles = rootState.articles.articles
          const currentArticlesLength = rootState.blogNew.current_book_articles.length
          const data = {
            _articles: articles,
            _bookid: articledata.bookid,
            _articleid: articledata.articleid,
            _backresult: backresult,
            _current_articles_length: currentArticlesLength
          }
          resolve(data)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('transbook成功了')
      commit(types.TRANS_ARTICLE, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  },
  // 删除article
  actionDeleteArticle ({ commit, rootState }, articledata) {
    const promise = new Promise(function (resolve, reject) {
      blogNewArticle.deleteArticle(articledata, (backresult, result) => {
        if (result === 'success') {
          const articles = rootState.articles.articles
          const currentArticlesLength = rootState.blogNew.current_book_articles.length
          const data = {
            _articles: articles,
            _bookindex: articledata.articleindex,
            _articleid: articledata.articleid,
            _current_articles_length: currentArticlesLength
          }
          resolve(data)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('删除article')
      commit(types.DELETE_ARTICLE, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  },
  // 保存当前的article
  actionSaveCurrentBookArticle ({ commit, rootState }, article) {
    commit(types.SAVE_CURRENT_BOOK_ARTICLE, article)
  },
  actionSaveCurrentBookArticleIndex ({ commit }, index) {
    commit(types.SAVE_CURRENT_BOOK_ARTICLE_INDEX, index)
  },
  // 新建一个article
  actionCreateNewArticle ({ commit, rootState }, data) {
    // 需要当前的bookid，当然在这里取也不是不可以。
    const promise = new Promise(function (resolve, reject) {
      const userid = rootState.login.currentUser.id
      const articles = rootState.articles.articles
      blogNewArticle.createNewArticle(userid, data._bookid, (backresult, result) => {
        if (result === 'success') {
          const _data = {
            _backresult: backresult,
            _articles: articles,
            _isTop: data._isTop,
            _currnt_book_articles_length: data._currnt_book_articles_length
          }
          resolve(_data)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      // 这个是创造本地数据
      commit(types.CREATE_NEW_ARTICLE, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  }
}

// mutations
const mutations = {
  [types.TRANS_ARTICLE] (state, data) {
    console.log(data)
    for (let i = data._articles.length - 1; i >= 0; i--) {
      if (data._articles[i].id === data._articleid) {
        data._articles.splice(i, 1)
        data._articles.push(data._backresult)
        // 这里当最后一个元素的时候currentArticleindex是不会变化的。要手动设置一下
        // 更新index，如果是最后一个元素，更新index是不会启动的，所以要在这里启动。
        if (data._current_articles_length > 1 && data._current_articles_length - 1 === state.current_article_index) {
          state.current_article_index = state.current_article_index - 1
        }
      }
    }
  },
  [types.DELETE_ARTICLE] (state, data) {
    // 需要删除article，currentarticle，bookarticle，articles
    // 先删除articles的数据吧。
    // index
    // bookarticles
    for (let i = data._articles.length - 1; i >= 0; i--) {
      if (data._articles[i].id === data._articleid) {
        data._articles.splice(i, 1)
      }
    }
    // 更新index，如果是最后一个元素，更新index是不会启动的，所以要在这里启动。
    if (data._current_articles_length > 1 && data._current_articles_length - 1 === state.current_article_index) {
      state.current_article_index = state.current_article_index - 1
    }
  },
  [types.CREATE_NEW_ARTICLE] (state, data) {
    state.current_new_article = data._backresult
    if (data._isTop) {
      state.current_article_index = 0
      data._articles.unshift(data._backresult)
    } else {
      state.current_article_index = data._currnt_book_articles_length
      data._articles.push(data._backresult)
    }
  },
  [types.SAVE_CURRENT_BOOK_ARTICLE_INDEX] (state, index) {
    state.current_article_index = index
  },
  [types.SAVE_CURRENT_BOOK_ARTICLE] (state, article) {
    state.current_new_article = article
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
