/**
 * Created by thejojo on 2017/6/22.
 */
import AV from 'leancloud-storage'

const av = avinit()

export function avinit () {
  const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  AV.init({ appId: avId, appKey: avKey })
  return AV
}

export function getArticles (userid, callback) {
  const query = new av.Query('Articles')
  const ownerid = av.Object.createWithoutData('_User', userid)
  query.ascending('createdAt')
  query.limit(1000)
  query.equalTo('owner', ownerid)
  query.find().then((results) => {
    console.log('articles数据下载完毕')
    callback(results, 'success')
  }, function (error) {
    console.log(error)
    callback(error, 'error')
  })
}

export function getDisplayArticles (totalArticles, currentPage, pageSize) {
  const startNum = (currentPage - 1) * pageSize
  return totalArticles.slice(startNum, startNum + pageSize)
}
