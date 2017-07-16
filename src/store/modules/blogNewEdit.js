/**
 * Created by thejojo on 2017/7/5.
 */
import * as blogNewEdit from '@/service/blogNewEdit'

const types = {
  SAVE_CURRENT_EDIT_TITLE: 'blogNewEdit/SAVE_CURRENT_EDIT_TITLE',
  SAVE_CURRENT_EDIT_CONTENT: 'blogNewEdit/SAVE_CURRENT_EDIT_CONTENT',
  SAVE_CURRENT_EDIT_CONTENT_PREVIEW: 'blogNewEdit/SAVE_CURRENT_EDIT_CONTENT_PREVIEW',
  SAVE_PREVIEW_MODE: 'blogNewEdit/SAVE_PREVIEW_MODE',
  SAVE_ISBACK_FROM_VIEW_MODE: 'blogNewEdit/SAVE_ISBACK_FROM_VIEW_MODE',
  SAVE_CURRENT_EDIT_CONTENT_SCROLLRATIO: 'blogNewEdit/SAVE_CURRENT_EDIT_CONTENT_SCROLLRATIO',
  SAVE_CURRENT_EDIT_PREVIEW_SCROLLRATIO: 'blogNewEdit/SAVE_CURRENT_EDIT_PREVIEW_SCROLLRATIO'
  // SAVE_CURRENT_USER: 'login/SAVE_CURRENT_USER',
  // INIT_CURRENT_USER: 'login/INIT_CURRENT_USER'
}
const state = {
  isPreview: false,
  isBackFromViewMode: false,
  markdown: '',
  scrollRatio: 0,
  previewScrollRatio: 0
  // currentUser: ''
}
const getters = {
  getScrollRatio: state => state.scrollRatio,
  getPreviewScrollRatio: state => state.previewScrollRatio,
  getIsPreview: state => state.isPreview,
  getMarkdown: state => state.markdown,
  getIsBackFromViewMode: state => state.isBackFromViewMode
}

// actions
const actions = {
  actionSavePreviewScrollRatio ({ commit }, ratio) {
    commit(types.SAVE_CURRENT_EDIT_PREVIEW_SCROLLRATIO, ratio)
  },
  actionSaveScrollRatio ({ commit }, ratio) {
    commit(types.SAVE_CURRENT_EDIT_CONTENT_SCROLLRATIO, ratio)
  },
  actionSavePreviewMode ({ commit }, isPreviewMode) {
    commit(types.SAVE_PREVIEW_MODE, isPreviewMode)
  },
  actionSaveIsBackFromViewMode ({ commit }, isBackFromViewMode) {
    commit(types.SAVE_ISBACK_FROM_VIEW_MODE, isBackFromViewMode)
  },
  // 保存markdown
  actionSaveCurrentEditContentPreview ({ commit }, markdown) {
    commit(types.SAVE_CURRENT_EDIT_CONTENT_PREVIEW, markdown)
  },
  // 保存正在编辑的文章内容
  actionSaveCurrentEditContent ({ commit, rootState }, contentdata) {
    const promise = new Promise(function (resolve, reject) {
      blogNewEdit.saveCurrentEditContent(contentdata, (backresult, result) => {
        if (result === 'success') {
          const articles = rootState.articles.articles
          const data = {
            _articles: articles,
            _articleid: contentdata.articleid,
            _articlecontent: contentdata.articlecontent,
            _backresult: backresult
          }
          resolve(data)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      commit(types.SAVE_CURRENT_EDIT_CONTENT, data)
    }, function (error) {
      console.log(error)
    })
  },
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
  [types.SAVE_CURRENT_EDIT_PREVIEW_SCROLLRATIO] (state, ratio) {
    state.previewScrollRatio = ratio
  },
  [types.SAVE_CURRENT_EDIT_CONTENT_SCROLLRATIO] (state, ratio) {
    state.scrollRatio = ratio
  },
  [types.SAVE_PREVIEW_MODE] (state, isPreviewMode) {
    state.isPreview = isPreviewMode
  },
  [types.SAVE_CURRENT_EDIT_CONTENT_PREVIEW] (state, markdown) {
    state.markdown = markdown
  },
  [types.SAVE_ISBACK_FROM_VIEW_MODE] (state, isBackFromViewMode) {
    state.isBackFromViewMode = isBackFromViewMode
  },
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
  },
  [types.SAVE_CURRENT_EDIT_CONTENT] (state, contentdata) {
    console.log(contentdata)
    for (let i = contentdata._articles.length - 1; i >= 0; i--) {
      if (contentdata._articles[i].id === contentdata._articleid) {
        contentdata._articles[i].attributes.content = contentdata._articlecontent
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
