/**
 * Created by thejojo on 2017/6/6.
 */

import AV from 'leancloud-storage'

const av = avinit()

export function avinit () {
  const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  AV.init({ appId: avId, appKey: avKey })
  return AV
}

export function getTimeline (userid, callback) {
  // const av = avinit()
  const query = new av.Query('ReadInfo')
  const ownerid = av.Object.createWithoutData('_User', userid)
  query.ascending('createdAt')
  query.limit(1000)
  query.equalTo('owner', ownerid)
  query.find().then((results) => {
    console.log('timeline数据下载完毕')
    callback(results, 'success')
  }, function (error) {
    console.log(error)
    callback(error, 'error')
  })
}

export function deleteTimeline (objId, callback) {
  // const av = avinit()
  let timeline = av.Object.createWithoutData('ReadInfo', objId)
  timeline.destroy().then(function (success) {
    // 删除成功
    console.log('成功了')
    callback(success, 'success')
  }, function (error) {
    // 删除失败
    console.log('不知哪里错误')
    callback(error, 'error')
  })
}

export function changeTimeline (timeline, callback) {
  console.log(timeline.attributes.isFinished)
  console.log(timeline.id)
  let _timeline = av.Object.createWithoutData('ReadInfo', timeline.id)
  _timeline.set('isFinished', !timeline.attributes.isFinished)
  _timeline.save().then(function (success) {
    // 修改成功
    console.log('成功了')
    callback(success, 'success')
  }, function (error) {
    // 删除失败
    console.log('修改不知哪里错误')
    callback(error, 'error')
  })
}
