/**
 * Created by thejojo on 2017/6/6.
 */
import leancloud from './leancloud'

// 这个方法现在已经不用了，直接在action里处理掉了
export const getReadInfos = (data) => {
  // let result = []
  const AV = leancloud.AVinit()
  const query = new AV.Query('ReadInfo')
  query.descending('createdAt')
  query.find().then((results) => {
    console.log('timeline数据下载完毕')
    // console.log(results)
    data = results
  }, function (error) {
    console.log(error)
    data = error
  })
  return data
}
// export default getReadInfos
