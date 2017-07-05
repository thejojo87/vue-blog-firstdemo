/**
 * Created by thejojo on 2017/6/26.
 */

import AV from 'leancloud-storage'

const av = avinit()

export function avinit () {
  const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  AV.init({ appId: avId, appKey: avKey })
  return AV
}

export function deleteBook (bookdata, callback) {
  const deletebook = av.Object.createWithoutData('books', bookdata.bookid)
  // 这里需要删除book相关的articles
  console.log('asdfkljaskldfj')
  const query = new av.Query('Articles')
  query.equalTo('belongbook', deletebook)
  query.find().then(function (articles) {
    // 删除成功
    av.Object.destroyAll(articles).then(function () {
      // 成功
    }, function (error) {
      // 异常处理
      console.log(error)
    })
    // articles.destroy()
    console.log('belongbook的articles删除成功了')
  }, function (error) {
    // 删除失败
    console.log(error)
  })
  deletebook.destroy().then(function (results) {
    // 删除成功
    callback(results, 'success')
  }, function (error) {
    // 删除失败
    callback(error, 'error')
  })
}

export function changeBookname (bookdata, callback) {
  console.log('changeBookname')
  const newName = av.Object.createWithoutData('books', bookdata.bookid)
  newName.set('title', bookdata.bookname)
  newName.save().then((results) => {
    console.log('新建book完毕了')
    callback(results, 'success')
  }, function (error) {
    console.log(error)
    callback(error, 'error')
  })
}

export function createNewBook (userid, bookname, callback) {
  console.log(userid)
  console.log(bookname)
  const NewBook = av.Object.extend('books')
  const _newbook = new NewBook()
  _newbook.set('title', bookname)
  // _newbook.set('isActive', true)
  _newbook.set('owner', av.User.current())
  _newbook.save().then((results) => {
    console.log('新建book完毕了')
    callback(results, 'success')
  }, function (error) {
    console.log(error)
    callback(error, 'error')
  })
}

export function getBooks (userid, callback) {
  console.log(userid)
  const query = new av.Query('books')
  const ownerid = av.Object.createWithoutData('_User', userid)
  query.descending('createdAt')
  query.limit(1000)
  query.equalTo('owner', ownerid)
  query.find().then((results) => {
    console.log('books数据下载完毕')
    callback(results, 'success')
  }, function (error) {
    console.log(error)
    callback(error, 'error')
  })
}
