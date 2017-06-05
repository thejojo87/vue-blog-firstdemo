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
  // 添加vue属性 第二种方式
  // Vue.prototype.$AVinit = function () {
  //   const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
  //   const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
  //   AV.init({ appId: avId, appKey: avKey })
  //   return AV
  // }
  Object.defineProperties(Vue.prototype, {
    $AVinit: {
      get () {
        console.log('asdf')
        return avInit
      }
    }
  })
}

export default MyPlugin
