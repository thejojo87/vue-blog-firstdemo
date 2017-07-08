/**
 * Created by thejojo on 2017/7/7.
 */

import AV from 'leancloud-storage'

const av = avinit()

export function avinit () {
  const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  AV.init({ appId: avId, appKey: avKey })
  return AV
}

export function fileUpload (files, callback) {
  console.log('uploadmodule')
  console.log(files)
  console.log(files.name)
  const file = files
  const title = 'image-' + Date.now() + '.png'
  const avFile = new av.File(title, file)
  const Repo = av.Object.extend('pictures')
  const img = new Repo()
  let result
  img.set('title', title)
  img.set('owner', av.User.current())
  img.set('images', avFile)
  img.save().then(function (data) {
    console.log('成功了upload')
    // console.log(data)
    console.log(data.attributes.images.attributes.name)
    result = data.attributes.images.attributes
    callback(result, 'success')
  }, function (error) {
    console.log(error)
    console.log('失败了，不知道哪里出错了')
    callback(error, 'error')
  })
}
