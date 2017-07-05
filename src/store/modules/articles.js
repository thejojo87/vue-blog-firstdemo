/**
 * Created by thejojo on 2017/6/22.
 */
// 从service模块获取函数
import * as articles from '@/service/articles'

const types = {
  GET_ARTICLES: 'articles/GET_ARTICLES',
  GET_ARTICLES_COUNT: 'articles/GET_ARTICLES_COUNT',
  SAVE_CURRENT_PAGE: 'articles/SAVE_CURRENT_PAGE',
  SAVE_CURRENT_ARTICLE: 'articles/SAVE_CURRENT_ARTICLE'
}
const state = {
  articles: [],
  currentPage: 1,
  articles_per_page: 2,
  current_article: []
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  getArticles: state => state.articles,
  getCurrentPage: state => state.currentPage,
  getCurrentArticle: state => state.current_article
}

// actions
const actions = {
  // 保存博客里要查看的当前文章
  actionSaveCurrentArticle ({ commit }, article) {
    commit(types.SAVE_CURRENT_ARTICLE, article)
  },
  // 保存博客里浏览的当前页数
  actionSaveCurrentPage ({ commit }, page) {
    commit(types.SAVE_CURRENT_PAGE, page)
  },
  // 获取我的博客文章
  actionGetArticles ({ commit, rootState }, userid) {
    const promise = new Promise(function (resolve, reject) {
      // 这里编写异步代码
      articles.getArticles(rootState.login.currentUser.id, (backresult, result) => {
        if (result === 'success') {
          resolve(backresult)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('获取articles数据成功了')
      console.log(data)
      commit(types.GET_ARTICLES, data)
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
    })
  }

}

// mutations
const mutations = {
  [types.SAVE_CURRENT_ARTICLE] (state, article) {
    console.log(article)
    state.current_article = article
  },
  [types.GET_ARTICLES] (state, data) {
    state.articles = data
  },
  [types.SAVE_CURRENT_PAGE] (state, page) {
    state.currentPage = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
