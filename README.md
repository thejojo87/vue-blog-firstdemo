# vue-blog-firstdemo

> vue-blog-firstdemo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 个人安装
### vue-router
npm install vue-router

### vuex
npm install vuex --save
vuex 需要模块化
可以参考这里

http://ithelp.ithome.com.tw/articles/10186481

https://vuex.vuejs.org/zh-cn/modules.html

### bootstrap

```javascript
在index.html这里，引用地址
<link href="static/css/bootstrap.css" rel="stylesheet">
```
### 决定使用element和iview，可以一起使用

http://element.eleme.io/#/zh-CN/component/installation
npm i element-ui -S

```javascript
import iView from 'iview'
import 'iview/dist/styles/iview.css'   // 使用 CSS
// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(iView)
Vue.use(ElementUI)
```

https://www.iviewui.com/docs/guide/start

### 保存使用leancloud


## 问题

1. 头部导航栏？
遇到了个问题，该使用什么呢?
bootstrap? iview? element?

2. leancloud的av需要init，配置应该怎么做？
我想使用插件的方式，新建一个ext文件夹，新建一个js文件
https://cn.vuejs.org/v2/guide/plugins.html

3. 写vue插件的时候总是报错

```javascript
Uncaught TypeError: Cannot assign to read only property 'exports' of object '#Object'
  at Object.anonymous

原因如下：webpack 2中不允许混用import和module.exports

解决办法就是统一改成ES6的方式编写即可
export default MyPlugin
```

4. defineProperties 用这个来给Vue添加方法
这个的用法就是使用 this.$AVinit就返回了函数值
var AV = this.$AVinit这么来初始化leancloud的AV


```javascript
  Object.defineProperties(Vue.prototype, {
    $AVinit: {
      get () {
        console.log('asdf')
        return avInit
      }
    }
  })
```
## todo

- [x] 1.头部导航栏

- [ ] 2.导航栏注册与登陆

## 更新记录

2017-06-03 20:41:42 初始化
2017-06-05 11:36:00 添加了一个插件-用来初始化leancloud的AV

## 流程和思路

leancloud需要一个av，这个需要和初始化，之前写的时候每次都要引用很烦人。
所以这次使用插件的方式。

首先做注册和登陆。
使用element，弹窗。dialog
有个问题需要考虑，注册检测应该怎么做？
现在的考虑是注册的数据和data联系起来，
然后发送给一个检测的插件。
插件返回结果如果是true，那么进行loading，然后注册。
注册成功后提示消息。

第一，不知道插件注册怎么传递参数过去。
第二, 注册检测只使用一次，没必要做成一个全局，或许只做成一个模块，使用一次就足够了。
第三，发现element是有验证的表单的。
使用了element来登陆成功了。
然后该保存在vuex里。
但是该保存在login的module里面吗？
还是说保存在全部的store里？
还有AV.User.currentuser,应该怎么保存呢？


