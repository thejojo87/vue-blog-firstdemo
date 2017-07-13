/**
 * Created by thejojo on 2017/7/8.
 */
import AV from 'leancloud-storage'

const av = avinit()

export function avinit () {
  const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  AV.init({ appId: avId, appKey: avKey })
  return AV
}

export function hasImage (fileList) {
  let list = []
  // 查看这几个list元素有哪些是图片
  for (let i = 0; i < fileList.length; i++) {
    console.log(fileList[i])
    if (/^image/.test(fileList[i].type)) {
      list.unshift(fileList[i])
    }
  }
  if (list.length === 0) {
    return false
  } else {
    return true
  }
}

export function handleImageDrag (fileList, callback) {
  // event.preventDefault()
  let listToUpload = []
  // 查看这几个list元素有哪些是图片
  for (var i = 0; i < fileList.length; i++) {
    console.log(fileList[i])
    if (/^image/.test(fileList[i].type)) {
      listToUpload.unshift(fileList[i])
    }
  }
  if (listToUpload.length > 0) {
    // 上传，有没有批量操作？如果是单个图片还好说。
    // 如果是好多个图片
    const promise = new Promise(function (resolve, reject) {
      uploadImages(listToUpload, (backresult, result) => {
        if (result === 'success') {
          resolve(backresult)
        } else {
          reject(backresult)
        }
      })
    })
    promise.then(function (data) {
      console.log('获取图片数据成功了')
      console.log(data)
      callback(data, 'success')
      return data
    }, function (error) {
      console.log(error)
      console.log('出了什么错误')
      callback(error, 'error')
    })
  } else {
    callback(listToUpload.length, 'error')
  }
}

function uploadImages (data, callback) {
  const dataUpdate = []
  const NewImage = av.Object.extend('pictures')
  for (let i = 0; i < data.length; i++) {
    let _newImage = new NewImage()
    const avFile = new av.File(data[i].name, data[i])
    _newImage.set('title', data[i].name)
    _newImage.set('owner', av.User.current())
    _newImage.set('images', avFile)
    dataUpdate.push(_newImage)
  }
  av.Object.saveAll(dataUpdate).then(function (data) {
    console.log(data)
    // result = data.attributes.images.attributes
    callback(data, 'success')
  }, function (error) {
    console.log(error)
    console.log('失败了，不知道哪里出错了')
  })
}
