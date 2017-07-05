/**
 * Created by thejojo on 2017/6/29.
 */

import AV from 'leancloud-storage'

const av = avinit()

export function avinit () {
  const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  AV.init({ appId: avId, appKey: avKey })
  return AV
}

export function transArticle (articledata, callback) {
  const transarticle = av.Object.createWithoutData('Articles', articledata.articleid)
  const _transbook = av.Object.createWithoutData('books', articledata.bookid)
  transarticle.set('belongbook', _transbook)
  transarticle.save().then(function () {
    const query = new av.Query('Articles')
    query.get(articledata.articleid).then((results) => {
      callback(results, 'success')
    }, function (error) {
      console.log(error)
      callback(error, 'error')
    })
  })
  // 如果直接使用饭回来的result，它只有更新的属性。
}

export function deleteArticle (articledata, callback) {
  const deletearticle = av.Object.createWithoutData('Articles', articledata.articleid)
  deletearticle.destroy().then(function (results) {
    // 删除成功
    callback(results, 'success')
  }, function (error) {
    // 删除失败
    callback(error, 'error')
  })
}

export function createNewArticle (userid, bookid, callback) {
  const NewArticle = av.Object.extend('Articles')
  const _newarticle = new NewArticle()
  const _belongbook = av.Object.createWithoutData('books', bookid)
  _newarticle.set('title', '无标题文章')
  _newarticle.set('owner', av.User.current())
  _newarticle.set('tags', '无任何标签')
  _newarticle.set('content', '')
  _newarticle.set('belongbook', _belongbook)
  _newarticle.save().then((results) => {
    callback(results, 'success')
  }, function (error) {
    console.log(error)
    callback(error, 'error')
  })
}
