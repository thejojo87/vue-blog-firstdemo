/**
 * Created by thejojo on 2017/6/19.
 */
import Vue from 'vue'
// 这个是用来把从leancloud下载下来的数据，转换成需要的格式，存储到store里用的
export function dateToTimelines (data) {
  console.log(data)
  // 在此处把数据分成相同日期的字典
  // keys字典存放的是日期集合的字典，关键字就是日期
  // dates数组存放的是所有日期的集合
  // values字典存放的是真正的数据，关键字就是日期
  const keys = {}
  const dates = []
  const values = {}
  for (let i = data.length - 1; i >= 0; i--) {
    // 数组里首先取一个数，加工后获取它的日期
    const key = Vue.prototype.$formatDate(data[i].createdAt, 'yyyy-MM-dd')
    const value = keys[key]
    if (!value) {
      keys[key] = key
      dates.push(key)
      values[key] = []
      values[key].push(data[i])
    } else {
      values[key].push(data[i])
    }
  }
  // 这是要把字典日期给排序
  const keyAttr = Object.keys(keys).sort(function (a, b) {
    return new Date(b) - new Date(a)
  })
  return {
    'dates': values,
    'days': keyAttr
  }
}
