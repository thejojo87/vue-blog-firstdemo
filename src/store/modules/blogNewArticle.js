/**
 * Created by thejojo on 2017/6/29.
 */
import * as blogNewArticle from '@/service/blogNewArticle'

const types = {
  CREATE_NEW_ARTICLE: 'blogNewArticle/CREATE_NEW_ARTICLE'
  // GET_ARTICLES_COUNT: 'articles/GET_ARTICLES_COUNT',
  // SAVE_CURRENT_PAGE: 'articles/SAVE_CURRENT_PAGE',
  // SAVE_CURRENT_ARTICLE: 'articles/SAVE_CURRENT_ARTICLE'
}
const state = {
  // articles: [],
  current_new_article: []
}
// getters login需要处理的是登陆的用户id什么的，leancloud返回的资料
const getters = {
  // getArticles: state => state.articles,
  // getCurrentPage: state => state.currentPage,
  // getCurrentArticle: state => state.current_article
}

// actions
const actions = {
  // 新建一个article
  actionCreateNewArticle ({ commit, rootState }, bookid) {
    // 需要当前的bookid，当然在这里取也不是不可以。
    console.log(bookid)
    const promise = new Promise(function (resolve, reject) {
      const userid = rootState.login.currentUser.id
      const bookArticles = rootState.blogNew.current_book_articles
      blogNewArticle.createNewArticle(userid, bookid, (backresult, result) => {
        if (result === 'success') {
          const data = {
            _backresult: backresult,
            _book_articles: bookArticles
          }
          resolve(data)
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
  // 保存博客里要查看的当前文章
  // actionSaveCurrentArticle ({ commit }, article) {
  //   commit(types.SAVE_CURRENT_ARTICLE, article)
  // },
  // // 保存博客里浏览的当前页数
  // actionSaveCurrentPage ({ commit }, page) {
  //   commit(types.SAVE_CURRENT_PAGE, page)
  // },
  // // 获取我的博客文章
  // actionGetArticles ({ commit }, userid) {
  //   const promise = new Promise(function (resolve, reject) {
  //     // 这里编写异步代码
  //     articles.getArticles(userid, (backresult, result) => {
  //       if (result === 'success') {
  //         resolve(backresult)
  //       } else {
  //         reject(backresult)
  //       }
  //     })
  //   })
  //   promise.then(function (data) {
  //     console.log('获取articles数据成功了')
  //     console.log(data)
  //     // Todo：这里需要处理一下获取的数据,这个要不要加工成干净的数据呢？
  //     // 还是说直接赋值更好呢？先试一下直接复制吧。
  //     commit(types.GET_ARTICLES, data)
  //   }, function (error) {
  //     console.log(error)
  //     console.log('出了什么错误')
  //   })
  // }

}

// mutations
const mutations = {
  [types.CREATE_NEW_ARTICLE] (state, data) {
    state.current_new_article = data._backresult
    // Todo： 这里要把article放进current articles数组里才行
    // 但是有一个问题，得操作current_book_article是在其他模块里的。
    console.log(data._book_articles)
    data._book_articles.unshift(data._backresult)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  types
}
