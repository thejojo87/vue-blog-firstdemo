/**
 * Created by thejojo on 2017/6/4.
 */

import AV from 'leancloud-storage'

const MyPlugin = {}
MyPlugin.install = function (Vue) {
  function avInit () {
    const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
    const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
    AV.init({ appId: avId, appKey: avKey })
    return AV
  }
  // 日期格式化
  var formatDate = function (input, format) {
    if (!input || !format) {
      return ''
    }
    input = new Date(new Date(input).getTime())
    var date = {
      'M+': input.getMonth() + 1,
      'd+': input.getDate(),
      'h+': input.getHours(),
      'm+': input.getMinutes(),
      's+': input.getSeconds(),
      'q+': Math.floor((input.getMonth() + 3) / 3),
      'S+': input.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (input.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      }
    }
    return format
  }
  // 用原声JS实现对象的深度克隆
  function deepCopy (oldObj) {
    // 定义一个新的空对象
    let newObject = {}
    if (oldObj) {
      if (oldObj.constructor === Object) {
        newObject = new oldObj.constructor()
      } else {
        newObject = new oldObj.constructor(oldObj.valueOf())
      }
      // 遍历克隆原对象属性
      for (const key in oldObj) {
        if (key) {
          if (newObject[key] !== oldObj[key]) {
            if (typeof (oldObj[key]) === 'object') {
              // 对象内部的子对象
              newObject[key] = deepCopy(oldObj[key])
            } else {
              newObject[key] = oldObj[key]
            }
          }
        }
      }
      // 克隆原对象常用的方法
      newObject.toString = oldObj.toString
      newObject.valueOf = oldObj.valueOf

      return newObject
    }
  }
  // 添加vue属性 第二种方式
  // Vue.prototype.$AVinit = function () {
  //   const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  //   const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  //   AV.init({ appId: avId, appKey: avKey })
  //   return AV
  // }
  Object.defineProperties(Vue.prototype, {
    $deepCopy: {
      get () {
        return deepCopy
      }
    },
    $formatDate: {
      get () {
        console.log('formatDate开始了')
        return formatDate
      }
    },
    $AVinit: {
      get () {
        return avInit
      }
    }
  })
}

export default MyPlugin
