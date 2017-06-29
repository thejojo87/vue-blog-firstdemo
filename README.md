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

5. vue 如何引用外部js文件？
不能把所有的js文件全部写在一起，所以需要模块化

```javascript
export default {

  sidebar_js: function () {
  /*
   在注释下方写下代码
   给按钮button绑定一个点击事件
   在事件处理函数中
   获取aqi-input输入的值，并显示在aqi-display中
   */
  // var value = document.getElementById("lists").value;
  alert('bbb');
  console.log('ccc')
  }
}


import { default as code } from '../../../static/js/todo/sidebar'

  methods: {
    ...mapActions([]),
    testaaa: function () {
      code.sidebar_js()
      console.log('test')
    }
  }
```

6. 在article.js文件里，想要初始化AV
但是this.$AVinit是在vue文件里绑定的，而article里是无法做到的。
那么就只能重新写一份初始化函数了

7. import export module 这具体是什么情况

http://www.jianshu.com/p/b1bf92f8e37f

8. promise异步操作怎么搞？

有两种方法：
一个是vuex-action里的

一个是 正常promise流程
下面有链接

9. 箭头函数是什么鬼？

https://75team.com/post/%E3%80%90%E7%BF%BB%E8%AF%91%E3%80%91%E8%A7%A3%E8%AF%BBecmascript-6%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0.html

http://www.infoq.com/cn/articles/es6-in-depth-arrow-functions



## todo

- [x] 1.头部导航栏

- [x] 2.导航栏注册与登陆
- [x] 3.我的足迹，timeline选项
- [ ] 4.我的图片功能
- [x] 5.timeline删除和改变状态
- [x] 6.cookie自动登录
- [x] 7.blog阅读功能
- [] 8.支持markdown
- [] 9.写作和编辑
- [] 10.文章详情界面

## bugTodo

- [ ] 1.修改数据下载机制-现在是集中在用户登录之后，但是当用户关掉浏览器的时候，还在登陆，但是数据已经不见了。路由检测

## 更新记录

2017-06-03 20:41:42 初始化
2017-06-05 11:36:00 添加了一个插件-用来初始化leancloud的AV
2017-06-05 23:17:34 注册与登陆功能完成
2017-06-17 13:56:33 chrome和firefox插件完成
2017-06-17 13:57:10 修改了time里呢，只显示登陆账号的timeline
2017-06-21 02:32:06 登陆的navbar里，修改了creat方法，不用再重复登陆了
2017-06-24 06:51:29 完成了博客页面的设计。从leancloud读取临时的数据。
2017-06-29 09:57:44 完成了新建文章的sidebar


## 流程和思路

### 注册和登陆

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
我直接把返回来的用户给保存在了本地state里。

#### api
leancloud使用sdk是可行的。
但是leancloud同时拥有restapi。
所有的应用里的数据，可以用restapi的方式可以获取。

https://leancloud.cn/docs/rest_api.html

### timeline-我的足迹
初衷很简单，有些页面如果用evernote保存，太笨重了。
比如说有些文章，想记录下来，回头再看看的。
弄到evernote就意味着基本上不会再看了。
但是偶尔会需要回头看的时候，保存到桌面，就太麻烦了。
想想就记录到leancloud，在博客里陈列吧。
用浏览器的插件保存网址和题目。
看到他已经做出来了。
正好我也学习一下，vue。

http://blog.iamtaoxin.com/#/

https://github.com/taosin/ixinyi_admin

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170606/114746918.png)

思路大概是：
当timeline这个页面生成的时候，启动js文件里的查询，送到结果里，

运行一个mutation，在state里
塞进去从leancloud里获取的timeline数据。

然后使用getters来，获取state里的数据，并且渲染。

js函数里初始化av，然后用return 返回结果。
然后在action部分，也就是在vuex的action里，importapi
用这个加上then经过处理，发送到mutation里。

按照这个流程，navbar里写的登陆和登出完全可以写在别的模块里。
问题在与，登陆之后，还需要后续操作，promise，这些绑定在this里了。
所以还是很不方便。只能用来数据处理。

第一步： 生成页面的时候获取数据
http://www.jianshu.com/p/b1bf92f8e37f

```javascript
import { default as article } from '@/service/article'
    created: function () {
      article.getReadInfos()
    },
```
但是这里有个问题，查询是异步的，如果生成的同时console，那么返回的return就是0
watch 来监视state里的readinfo吗？

源代码是使用https://github.com/vuejs/vuex/issues/258
这里第一个方法，用watch来监控。
但是难道没有更好的办法了吗？

第二步: 如何从函数return结果呢？

运行getReadinfos，返回数值是需要时间的。
如何才能运行这个成功之后才commit呢？

需要保证的是：获取数据之后，then commit state里。

使用了promise

http://www.html-js.com/article/Learn-JavaScript-every-day-to-understand-what-JavaScript-Promises

http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html

https://juejin.im/entry/56c46015c24aa800528da4d5

之前的操作是在Timeline.vue这个文件的created方法里
直接引用AV，然后等返回结果，再运行一个store操作。

现在是Timeline只有一行代码调用action函数。
action里操作逻辑。
貌似这个操作无法放在一个js文件里。

vuex也有个方法，可以回掉Timeline元素。
https://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions


第三步：远端的数据结构是怎么样的呢？
1. 日期-createTime
2. 标题-title
3. 网址-url
4. tag-可加可不加

日期对文章应该是1对多的关系。
但是现在这个阶段先不考虑了

当页面加载的时候获取了数据，并且存放到vuex
需要把数据提取并且加工展示。
当然随便复制一份数据也可以。
但是如果深度复制-意思就是，复制一份，a和b之间不能相互影响 但又不影响原来的数据，那就更好了。
那么就不用每次调用数据的时候都要从vuex获取数据了。
直接操作复制好的总数据。
发现深度复制并不是很容易的事情。
正常情况直接赋值就可以了。
但是对于数组，会改变b。为什么呢？
因为object类型存储的是对象的引用地址。

articles是数组，是所有的文章数据
data是字典，有start，limit-是state里获取的articles
使用concat方法和articles连接起来

原来的办法是使用了watch方法。
监视datas，一旦datas发生变化那么就更新页面数据，
但是我没有使用这个方式，采用的是，created里获取数据的方式。

那么vuex的数据什么时候复制到本地的data里呢？
我使用了watch选项。

#### 渲染数据

渲染数据第一步先把时间处理掉。
时间处理应该调用一个插件里的时间处理函数。
this.$xxx 这个无法在 {{}}里面调用
这个涉及到计算插值
"TypeError: this.$formatDate is not a function"

后来发现，并不是说模板里不能用方法，而是v-for里
数据就失效了。
该怎么做呢？
filter？
还是说另外写一个vue的组件专门来运算这个？
https://cn.vuejs.org/v2/guide/list.html
这里给了两个思路
但是我在写了第二个方法的时候，告诉我，return不能有赋值操作。

想了想是不是不适合呀？
还是不适合，让我在初始化之后，把时间格式修改算了
但是这又引发了一个问题：本地的空数组，已经和vuex里的数据结合在一起了。
修改这个导致，引发vuex里的原数据也被修改。

还是原来的思路-使用filter。不过用vue-moment库吧
{{ article.createdAt | moment("YYYY-MM-DD") }}

如果需要展示中文，再正八经使用moment库，然后自己制定filter
主要问题是，我不知道该把filter放哪里才算优雅。

数据不会是二位数组吧？
是怎么按日期分配的呢？
思来想去，与其下载下来，然后按照日期分类，我还是选择了新建了一个字段-day。
用来保存当前日期。
剩下的就是一个数组里，如何按照相同日期而各自分类成二维数组了
第一步： for循环，循环result数组。
第二步： 获取数组里createdAt字段，并且加工返回成日期格式
第三步： 从一个keys字典里，寻找用日期为关键字的数据，赋值给一个变量
第四步： 如果这个数据为空，那么意味着之前没有过这个日期的数据，
那么keys[key]=key，这个字典里，这个日期关键字的数据被赋值给这个日期
datas是一个本来是空数组，这里把日期给push进去
values这是一个空字典，key为日期，然后存入result里原始数据
如果这个变量不为空，那么意味着之前有过这个日期的数据，

```javascript
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
        console.log(key)
      }
      // 这是要把字典日期给排序
      const keyAttr = Object.keys(keys).sort(function (a, b) {
        return new Date(b) - new Date(a)
      })
      commit(types.GET_READLINETIME, keyAttr)
      commit(types.GET_READLINEDATA, values)
```

timeline.vue文件获取了time和data全部数据。
该如何展示呢？

是不是应该嵌套v-for呢？
比如说先v-for time来表示时间。
按照时间寻找字典，再v-for？

第一轮v-for的结果是，分成了日期，和一个字典。
Timeline v-for="(days, index) in this.readTimelineDate" :key="index"
days是字典，就是一条条leancloud里的记录。
index就是加工过的日期 2017-06-06

现在的问题是如何实现days，这个。
我在想，这个问题，可以依靠新建另一个component来实现。
把days传过去，展示完毕，再发回来。
成功了。果然还是这个方法比较好。



下面有两个思路，但是都有问题，第一个太复杂了。
第二个，2个v-for会导致第一个分组失效。
https://segmentfault.com/q/1010000005817587

https://zhufengnodejs.github.io/doc/html/vue/Vue%E6%96%B9%E6%B3%95%E7%AF%87.html#t103.3%20%E5%B5%8C%E5%A5%97%E5%BE%AA%E7%8E%AF

timeline 我选择了iview里的。
里面的圆点和线条，用  .ivu-timeline-item-head   .ivu-timeline-item-tail
这两个自定义

最终完成的样式：

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170608/135429803.png)

#### 只让登陆用户的timeline显示
一个是，timeline数据里添加owner的point字段，表示用户。
然后修改了查询方法，查询的时候，发送objectId来查询。
再来，就是navbar里，登陆成功之后，调用查询，在state里存储用户数据。
最后，在timeline里，渲染的template里，使用state里数据来查询。
logout之后要清空state

#### 增加改变状态和删除按钮
首先增加样式：
删除很好办，直接增加就行了。
改变状态，我在想，用两种样式
一开始想的是v-bind 判断isFinished的值，来更改按钮样式。
但是发现，这个button没有value值。
使用了v-if v-else很方便

然后是删除操作。
我在这里涉及到模块化了。
两个选择。
一个是使用leancloud.js里，集成操作。
另一个是使用插件的方式。
我之前这两种都使用过。
貌似webpack就能模块化

模块化，面向对象

还有一个知识点是回调函数,
重点是把一个函数作为参数发过去，然后就在那里得到结果，运行。


```javascript
    test.deleteTimeline(function (aaa) {
      console.log('aaa')
      console.log(aaa)
    })
    
    export function deleteTimeline (callback) {
      const av = avinit()
      const query = new av.Query('ReadInfo')
      query.find().then(function (results) {
        console.log('test成功了' + results)
        callback(results)
        // 如果这样写，第二个条件将覆盖第一个条件，查询只会返回 priority = 1 的结果
      }, function (error) {
        console.log('貌似出了什么错误' + error)
      })
    }
```


要不要为了插件开发重新写一份repo呢？

插件repo地址

https://github.com/thejojo87/vue-blog-timeline-addons


#### 开发chrome插件
参考

https://segmentfault.com/a/1190000004360319

http://www.jianshu.com/p/5531e2169843

1. 登陆leancloud界面
2. 用快捷键或者图标的方式保存数据
3. 应该有个选项，默认的话，把全部的页面保存或者只保存一个
4. 能不能同时保存到evernote？

#### 开发firefox插件

参考copy urls export 这个插件
这个会在浏览器上有个图标，还有下拉菜单，
并且tab的右键添加一个选项，可以选择只保存这个网页或者保存整个用户组

#### cookie自动登录

貌似有token，session，cookie三种方式。
不过token和session都是需要和服务器加密才可以的。
我不知道leancloud是如何做到。
av.user.current?登陆后这个会自动保存用户资料
貌似chrome上的插件是打开后依然自动登录的。
我之前的登陆系统做错了。
就是缺少navbar生成时候的判断。
判断currentuser存在与否，如果存在，那么就该存储到store里才对。

todo:
```javascript
var user = AV.Object.createWithoutData('_User', 'xxxxxx');
user.fetch({
  success: function() {
    AV.User.become(user._sessionToken, {
      success: function() {
        console.log(AV.User.current())
      }
    });
  }, error: function() {
    console.log('err');
  }
});

```

#### 主页添加github链接

### 使用sass

http://www.jianshu.com/p/92dbc92e775d
http://www.jianshu.com/p/67f52071657d

第二步，写入地址在build里，webpack.base.conf.js

http://ithelp.ithome.com.tw/articles/10126905
教程

使用的时候，可以在script import './../../static/css/techs.scss';
也可以
```css
<style lang="sass" scoped>
</style>

<style lang="sass">
    @import './css/main.scss'
</style>
```


### blog模块
pages文件夹里，新建一个Blog.vue
然后作为组件，把sidebar插入进去。
参考的是hexo的next主题

http://theme-next.iissnan.com/theme-settings.html#author-sites

http://thejojo87.com/

逻辑大概是这个样子：
如果没登陆，那么不会触发获取articles的行为。
如果登陆成功，那么触发成功并且获取articles到vuex
当进入blog文章界面，那么有一个articles的空数组。
这个用来检测，mapgetters里，articlesde 数据。
watch，vuex的getArticles方法。如果有变化那么把本地数组复制就好了。

#### sidebar

sidebar,实际上有两个标签页组成。
当主页的时候，显示图像，姓名，link，友情链接等等。站点概览。
当进入文章的时候，显示文章目录，里面有链接，有markdown文章的目录树。

站点概览很好做。
目录树，貌似需要组件来完成？
next主题是怎么实现的呢？

我需要先看一下别人的代码是怎么实现的
https://github.com/taosin/ixinyi_admin

service里的articles.js文件里，写上了leancloud获取的各种方法。
然后在blogs.vue里，首先获取，再渲染。

sidebar，如果正常情况下是随着博客往下拉，会消失不见得。
如何固定住？
这就需要position:fixed
然后设置右边和高度。这样就能相对固定住了。


#### mainbar
mainbar，貌似里面的内容可以直接在文章页面重新使用啊。

mainbar里，只显示一部分文章。
原理是，在mainbar的content界面，写上高度160px
然后text-overflow ellipsis 或者overflow:hidden来溢出部分裁剪。
不知道为什么这个都没作用

blog的class 是v-for 来渲染的list
要把这个做一个hover的效果。
这样，鼠标在文章的时候就有效果了。

```css
      transform: translateY(-2%)
      box-shadow: 1px 4px 10px 2px #CCC
```

下一步就是搞个分页出来。
用element的？
还是用iview的？ 感觉iview里的好看很多
还是之前用的浏览器插件时候的？

思路是什么样的？
思路是，分页按钮，按的时候，getters，传送数据过来，赋值给本地，然后就联动刷新

state里新建一个currentPage项目，初始化为1.
然后每当blogs页面跳转到其他模块的时候，destory对吧。
这时候保存currentPage

也不是，其实一开始下载全部数据，
然后不用和store交互，直接渲染现在的数据不就完了吗？

一开始登陆之后，下载全部数据到store，这是没有错的。
然后，设置当前页和每一个页面显示的文章数。
新建一个空的用来放展示的数组。

页面调到其他navbar，比如timeline的时候，是重新经历一次毁灭。
所以在created的时候，从store里，获取保存的当前页数。
然后经过函数处理，从总数组里，取出对应页数的数据。

当分页按钮按下去之后，先把当前页保存到store里，然后重新计算出display的数组。

#### 文章详情-article页面

如果点击标题，或者阅读全文的话，应该要跳转到文章详细界面。
这个应该怎么做呢？
我的想法是，博客的背景完全不动，
就把main里的东西切换就可以了。
但是这会涉及到单个网址的变化。
如何在vue 代码里，跳转到另一个网址呢？
还有，如果使用objid，作为地址的一部分参数。
会不会不是很安全？
但是objid是唯一的，应该方便很多才对。
有没有加密解密的办法？

还有如何获取并渲染当前的文章？
是保存到store里？还是说作为参数传送数据？

貌似vuex使用store里作为全局使用比较好。

如何跳转？
this.$router.push()

首先如何匹配动态路由？比如id？
https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html

如何把参数传递过去？
vue-router的文档里有。

#### 新建文章

我的想法是模仿键书的结构

http://www.jianshu.com/writer#/

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170625/150423018.png)

这里需要注意的是，主页面是writer。
但是每一个笔记，每一个文章都有自己的地址。
按照地址的不同，会刷新网址的。

新建文章的按钮，应该放在哪里呢？
是在navbar？还是说，在blog的界面里，固定一个button？
新建一个button固定住吧。
elemtnt的success按钮样式很不错。
最好跳转的时候，把用户的id传送过去。
如果用户登陆了那么就显示。

##### book的bar

简书里，当进入编辑模式的时候，navbar会消失，我要不要也要这么做？

第一个元素是回首页，我一开始以为这是个按钮，发现这是个i选项，加上border罢了。
这里使用了display:block，这就变成了块状元素，所以元素会被撑大。
但是我喜欢用flex，因此使用flex：1就一样了。

第二个元素是新建文章
按下这里的时候，简书会，向下滑动出现一个输入栏和提交，取消的表格。
这个滑动效果相当自然。应该用jquery对吧？
我vue应该怎么做？vue有自己的动画吗？

https://cn.vuejs.org/v2/guide/transitions.html
貌似有过度效果


至于隐藏和出现，应该是，v-on:click="isAddBook = !isAddBook"
默认一个本地变量为false就可以了。

提交按钮按下去之后，就不应该刷新页面。
所以需要v-on:submit.prevent="onSubmit"

然后新建一个本地变量，用来储存book的名字。
然后提交按钮，启动保存本地和新建leancloud的方法

新建book应该怎么做呢？
我想还是在vuex里做吧。
首先启动vuex的action，那里上传，成功后再返回来操作本地数据。
返回的数据直接存进store里就可以了。

在这里我遇到一个问题，vuex，我是分了模块的。
currentUser现在在login模块里。
虽然我在vue文件里，是可以拿到的。
但是我如果想在store的js文件想拿到的话，该怎么拿到呢？
rootstate？
https://stackoverflow.com/questions/41366388/vuex-access-state-from-another-module

```javascript
  actionCreateNewBook ({ commit, rootState }, bookname) {
    // console.log(bookname)
    console.log('新建开始了')
    console.log(rootState.login.currentUser)
```
可以用这种方式

在leancloud已经注册成功了。
之后需要在本地展示。
要么在本地加入数组，要么重新获取刷新一下。
但是这样的话，就涉及到获取数据，并展示了。
获取数据，果然还是需要在login之后做到。
还是说，在进入写文章的界面就可以？

有两种方法，一个是在login之后，统一初始化。
另一个是在blogNew界面，创建的时候，获取数据并且渲染。
只要监控就可以了。
我先选择了偷懒的办法，集中到一个界面里。

下一个部分就是列表了。
active，就是被选中的样子，这时候背景色会修改，而且出现一个齿轮。
还有个红色的border。
这个要不要做成组件？
还是说并不复杂，直接写在上面？
还是做一个组件吧。

列表active，一开始想的是，设置一个isactive的字段。
每次读取或者点击的时候就更新状态。
但是想想，这个状态，没必要保存在服务器上。
在本地的临时变量存储就好了。
因为一开始进入新建界面的时候，总是默认第一个book为active

写css的时候，遇到一个问题：
text-overflow: ellipsis; 无效。
结果是因为在flex布局，父元素没有宽度造成的。
这个解决办法是给父元素一个宽度。

http://www.westerndevs.com/css/Using-Overflow-Ellipsis-in-Inline-Flex/

下一步就是添加设置的图标了。
是放在哪里好呢
和span并行就可以了

还遇到一个bug-就是bootstrap，select的时候会有蓝色边框。
就是我选中了一个book
然后当我鼠标离开的时候也就是blur的时候
selected的元素下面就出现了蓝色边框
按道理应该是当blur的时候就启动覆盖蓝色border
发现原因了，因为我按照简书的源代码，套了一层a标签，
href="javascript:void(0)"
这就导致了，当离开后，这个变成了网址。
所以有了蓝色的底部
把href删除就没有了。

设置的齿轮，我发现简书用的就是iview的图标。
一模一样呢。

下一步就是点击齿轮，就要出现一个提示，要么删除，要么修改名字

popover弹出窗了。poptip -iview里。
首先用poptip包住齿轮元素

这个需要一个slot组件。
我在想要不要再做一个组件？
1. 再做一个组件。
2. 直接在上面写

写一个组件吧，干净一点。
遇到了一个问题。
标题和content里，iview源代码里设置是不一样的。
content里，多包裹了一层div。
这导致了修改文集名，这个我实现了和简书效果一样。
但是下面的删除就效果不一样了。
实在没办法，修改了父元素的padding

- 修改文集

修改文集后的功能就只有一个输入框
并不是跳转链接，只是一个弹窗很大100%罢了。
![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170628/133144322.png)

感觉是对话框

https://www.iviewui.com/components/modal

这里提供了header和tooter的slot，可以自由定义。

这就涉及到从booklist，传送过来书的名字了。
没什么难的，就是传送数据使用 :bookname="book.attributes.title"
这个v-bind 方式。才能传送过来。

还需要传送book的id。

```javascript
    props: {
      bookname: String,
      bookid: String
    },
```

但是如果直接把bookname作为变量的话，就会改变mutation，而产生冲突。
因此还是赋值一个本地变量，create的时候直接赋值，用这个来操作。

action只接受一个参数，所以应包装起来。

```javascript
        const newbookname = {
          bookid: this.bookid,
          bookname: this._bookname
        }
        this.actionChangeBookname(newbookname)
```

在leancloud修改完了之后，就是需要在本地修改。
有两种思路，一个是，直接在books数组里搜索。
另一个是新建一个currentbook，专门保存这个，然后修改这个。
第二个方法感觉比较好。

肯定以后有需要当前book的地方，所以用这个方式比较好。

#### articleBar
这里是文章的创造地点。

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170629/113427354.png)

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170629/113446461.png)

你会看到新建文章的时候，最右边的模块会被渲染。

这个部分由note-list 组成。
3个部分。
1. new-note
2. nav-list
3. new-note-bottom

- new-note
高度固定了，只有一个图标加文字。
@click的动作应该是新建一个article，
然后插入本地的article。
按照currentbook，筛选article数组才对。
要考虑到下方新建文章，流程是一样的。
要不要加一个参数判断？还是说代码足够简单，新建一个方法？

还是新建一个方法算了。简单明了。
为此新建一个store的module。

新建完毕之后，需要保存到本地列表。
下面就渲染这个列表就可以了。
getArticles已经用在了博客浏览的界面。保存着全部的article。
是从这里按照currentbook，筛选全部的article呢？
还是说，当选择book的时候，就已经筛选出来。
新建只是添加就完了呢？

选择book的时候，就更新currentbook，还有新建的时候也是。
只有两处，应该在这个时候，也自动更新current_new_articles。
这样的话，新建了article的时候，就只要存进去就可以了。
同时为了下次编辑文章的时候着想，有必要生成一个变量保存当前的文章。
这个变量是要在blogNewArticles里了。

数组过滤该怎么做？

```javascript
    const tochange = state.readTimelineDates[timeline._key].filter(function (el) {
      return el.id === timeline._value.id
    })
```
遇到了一个bug，不知道为什么，owner查询的aricle出了问题。
过一会又自动好了。

现在是我在blogNew 模块里，设置了一个current_book_articles用来存储现有的书的文章。
我新建文章是在blogNewArticle里。
我需要新建一个文章之后插入到数组里。
我如何做呢？

只好在action里，使用rootState，并且把数据传送到mutation里操作了。



#### 编辑文章



