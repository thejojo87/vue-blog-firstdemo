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