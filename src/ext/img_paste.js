/**
 * Created by thejojo on 2017/7/6.
 */
import * as upload from './img_upload'

export function handleImagePaste (event, callback) {
  let image
  if (event.clipboardData && event.clipboardData.items) {
    console.log(event.clipboardData)
    console.log(event.clipboardData.length)
    console.log(event.clipboardData.items)
    console.log(event.clipboardData.items.length)
    image = isImage(event.clipboardData.items)
    if (image) {
      // event.preventDefault()
      let file = image.getAsFile()
      // file.name = 'sdakfjlkasdfj'
      console.log(getFilename(event) || 'image-' + Date.now() + '.png')
      console.log(file)
      console.log([file])
      // 这里需要promise，要不然会变成undefined
      const promise = new Promise(function (resolve, reject) {
        upload.fileUpload(file, (backresult, result) => {
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
      // let result = upload.fileUpload(file)
      // console.log(result)
      // console.log(upload.fileUpload(file))
      // return 'ccccc'
      // return this.fileUpload([file])
    }
  }
}

function isImage (items) {
  var i = 0
  var item
  while (i < items.length) {
    item = items[i]
    if (item.type.indexOf('image') !== -1) {
      return item
    }
    i++
  }
  return false
}

function getFilename (e) {
  var value
  if (window.clipboardData && window.clipboardData.getData) {
    value = window.clipboardData.getData('Text')
  } else if (e.clipboardData && e.clipboardData.getData) {
    value = e.clipboardData.getData('text/plain')
  }
  value = value.split('\r')
  return value[0]
}
