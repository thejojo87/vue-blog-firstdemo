/**
 * Created by thejojo on 2017/6/6.
 */

import AV from 'leancloud-storage'

export default {
  AVinit: function () {
    const avId = 'f6K7k15zgkjKOxUJu8TocNjG-gzGzoHsz'
    const avKey = 'HEEepvNy6lifQnA9EqltAmqt'
    AV.init({ appId: avId, appKey: avKey })
    return AV
  }
}
