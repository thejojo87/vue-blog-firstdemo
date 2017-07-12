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

- [ ]  book，最后一个元素，删除的时候undefined，哪个设置为active？(要是不设置貌似也没什么问题)
- [ ] 修改数据下载机制-现在是集中在用户登录之后，但是当用户关掉浏览器的时候，还在登陆，但是数据已经不见了。路由检测

- [x]  修改newBookListGear里，_开头的变量的用法。
- [x]  改名字肯定也错了。
- [x]  观察currentbook，然后每当这个改变的时候，同样保存文章
- [x]  一开始文集数量为0的时候，下方的新建文章没必要出现
- []  active_article，保存当前文章
- [x]  changeName 不能在gear里直接修改。(watch，currentbook)
- [x]  下方添加文章的时候，active依然为0，应该是倒数才对。
- [x]  删除文集的时候，应该把articles也全部删掉。

## 更新记录

2017-06-03 20:41:42 初始化
2017-06-05 11:36:00 添加了一个插件-用来初始化leancloud的AV
2017-06-05 23:17:34 注册与登陆功能完成
2017-06-17 13:56:33 chrome和firefox插件完成
2017-06-17 13:57:10 修改了time里呢，只显示登陆账号的timeline
2017-06-21 02:32:06 登陆的navbar里，修改了creat方法，不用再重复登陆了
2017-06-24 06:51:29 完成了博客页面的设计。从leancloud读取临时的数据。
2017-06-29 09:57:44 完成了新建文章的sidebar
2017-07-03 09:12:36 完成了新建文章的删除book，删除article等功能

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

##### new-note
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

##### navlist
在newArticleBar下面再弄一个组件吧。

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170630/055150434.png)
五个部件组成。
第一个图标，文件的。
第二个下面字数
第三个，标题。
第四个，内容的简写。
第五个 齿轮测试按钮。

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170630/055254029.png)

齿轮下面有这么几个选项。

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170630/055341358.png)
发布后并不是跳转链接，只不过又是一个白色界面罢了。

- 第一个，图标，貌似就是document这个图标

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170630/060120218.png)
简书里是有发布的选项的，一旦发布，那么图标就会变成另一个，其实就是加上一个check标志，换个颜色罢了。
但是这个对我来说并没有任何意义。
图标直接写上一个就可以了。

或许以后可以考虑个加密功能吧。

- 第二个， 字数。

这里遇到了问题，因为这个长度会和文章内容部分有冲突，结果会导致
竖排。

我在想要不要把这个脱离文档流呢？
但是如果这么做的话，字数后面的div元素也跟着乱起来了。
所以我在想，或许应该把字数放在最后面？


- 第三个，标题，第四个，内容
简写，因为如果不确定宽度的话，就无法省略号了。
因此我指定了宽度90%，高度60px，叠加在一起。
但是这样的话，就导致了，text居中了。
因为这两个都是被撑满了的。
因此需要在父元素的div里，text-align-left才可以。

可能需要重新修改下宽度。感觉并不正确。
或许用flex 1 更好？

不知道为什么百分比来指定宽度，会导致把gear元素顶出包裹的div。
所以采取了。
左边固定，gear固定。
中间的，采用 calc，计算，然后flex 1 的方法。

- 第五个 齿轮

这个也要不要做成另一个组件呢？
做成组件吧。代码比想象中多太多了。

齿轮里的设置，要做的只有两个。
一个是删除文章。
一个事移动文章。

#### 删除文集之后需要把文章也要删除 （Todo：）

为什么删除最后一个文集，完全没反应？

刷新blog之后，虽然第一个元素被设置为activebook，
但是articles并没有被选中。
currentbook和current_book_articles都是0
新建并不会改变article（或许这个是正常现象）
剩下两个book的时候，删除了一个book，另一个book的current_book并不会改变。

不知道为什么，当一个书，在选中为currentBook,
danshi current_book_articles没有反应。

名字为空的时候，很难点击book

- 1.bug-登陆后应该把第一个book作为激活的book
按道理应该是登陆后，或者页面created的时候，这么做。
登陆之后，book就已经放进store里了。

两个选择：
1. newarticle界面创造的时候这么做。
2. 观察currentbook，当这个变化的时候，重新输入。

这个方法，貌似比我之前当新建和删除的时候的办法要好得多。
要放在newArticleBar呢？还是放在blogNew？

我之前采取的current——book-articles方法是错误的。
当我新建，删除的时候，采用数组操作的方式。
但是仔细一想，只有currentbook变化的时候，currentarticle才变化。
而currentbook只有在blogNew-newboooklist里才会出现。
我为什么不监控这个呢？
然后存入不久完了么

1. newBookList.vue里，currentbook。
// Todo: 这里要当变化的时候，current——article也要存进去

2. currentbook是什么时候出现的？
一个是登陆的时候，获取数据之后，把数据的第一条存进去。
还有一个是，当新建文集的时候，把建立好的文集放在最上面并且current
这里不需要任何新建文章
还有一个是删除之后，当前index作为currentbook
最后一个是点击之后，index

最后一个没有任何问题。
新建之后，文集也没有问题，有问题的是，active类，并没有转过去。
在这里应该要初始化index的

登陆之后应该需要保存currentbook
是在actionGetBooks之后进行的。
只要把第一个元素放进去就可以了。
最后一个是删除
删除应该表现为，index不变，然后list里消失。

删除有一个bug。
删book的时候会删除其他list。
到底 为什么？

问题的所在在于，当我新建文集的时候，不知道为什么，leancloud能生成，但是
本地返回不知道在哪里出错了。

如果删除最后一个元素的话，index就会变成undefined。

77 e6
11 20
22 aa
33 fa

0 是3
1 是2
如果新建一个book 4，那么
0 变成了4
1是3
2是2

如果先删除最后一个

newBookListGear这里有严重的bug存在。

_bookid，这些保存的是上一个数据，当新建的时候，按照index，数据并没有
被销毁，所以导致出错。

##### 3. bottom

做这个的时候遇到了个问题。
因为list里面有浮动元素，结果导致父元素高度为0

不知道为什么，把li的display flex删除就有高度了。

#### 新建文章栏 Todo：
发现了一个bug，新建之后，books数组里没有被更新
刷新后，book自动为第一个，但是filter数据需要时间，这个，并没有自动存进去articles
应该在book变化之后，自动启动更新，存入当前articles
article的变化只有两处。
一个事当currentbook变化的时候。
另一个是当getbook数据的时候。
b
首先是获取ook数据成功了-然后存入currentbook，然后触发条件。
更新currentarticles
这个逻辑没有问题，有问题的是，articles，获取会慢很多。

要不要监控articles？
当articles变化的时候，就这么做了。

- [x] 使用下面，新建文章，但是active始终是第一个。
- [x] 存入currentarticle，这个什么时候操作呢？是不是当index变化的时候？
初始化的时候，要不要监控currentBookArticles？
这个数组什么时候会变化？
还是说监控current——book？
还是说listcreated的时候插进去？

删除并没有把本地的articles给删除掉。
是否应该刷新一下？
还是说操作本地数据？

2017-07-02 13:02:09
Todo:
- [ ] 删除的时候，同时消除本地数据-要么更新-要么删除全部
- [x] currentArticleindex,在切换book的时候不变。
- [x] 新建的时候current_bookarticles新建-而其他不动
- [ ] 删除有两种一个是删除book-一个是删除article

思路：
要么设置一个变量，watch这个变量，当取反的时候，重新获取books和articles数据。

要么删除books的同时，去删除本地数组

新建的时候，不是应该增加articles这个是总数组么？
然后这个反应到current——book——articles

按道理应该是删除总的articles数组。

奇了怪了，为什么createarticle的时候传入rootstate里的article，
操作这个能增加，但是删除不可以呢？
问题有可能出在直接赋值是错误的。
但是unshift或者popup是可以的

就是对元素整体操作，赋值是无效的。
但是采用属性操作是可以的。
这样操作就可以了。

```javascript
    for (let i = data._articles.length - 1; i >= 0; i--) {
      if (data._articles[i].id === data._articleid) {
        data._articles.splice(i, 1)
      }
    }
```
只要删除总的articles
那么以改变，就能在newBookList里watch的getArticles方法。
带动actionSaveCurrentBookArticles，更改books里的article
同时更改newArticleList里面watch的getCurrentBookArticles


2017-07-03 01:30:14 
Todo: 

- [x] 删除article
- [x] 删除book
- [x] 移动功能article

- 思路
删除book的时候，只要删除总数组里关联的article，就可以了。
但是问题在于，删除book之后，需要删除leancloud上的article
article使用belongbook的pointer
首先按照pointer查询数据，查询之后回来的结果是个数组。
leancloud有批量操作功能。
用这个直接把数组全部删除就可以了。

```javascript
export function deleteBook (bookdata, callback) {
  const deletebook = av.Object.createWithoutData('books', bookdata.bookid)
  // 这里需要删除book相关的articles
  console.log('asdfkljaskldfj')
  const query = new av.Query('Articles')
  query.equalTo('belongbook', deletebook)
  query.find().then(function (articles) {
    // 删除成功
    av.Object.destroyAll(articles).then(function () {
      // 成功
    }, function (error) {
      // 异常处理
      console.log(error)
    })
    // articles.destroy()
    console.log('belongbook的articles删除成功了')
  }, function (error) {
    // 删除失败
    console.log(error)
  })
  deletebook.destroy().then(function (results) {
    // 删除成功
    callback(results, 'success')
  }, function (error) {
    // 删除失败
    callback(error, 'error')
  })
}
```

- 移动文章

界面没有什么难点。
但是简书的界面设计我觉得很不好。
书的名称目录列出来，然后选择之后就变黑。

这个效果很难看清楚。
我做个单选框算了。
使用v-for来渲染。

本来依然想使用iview里的radio单选框来解决问题。
发现组合使用的单选框有很大问题。
因为iview使用的基本单元是Radio,这个把默认的input的value覆盖掉了
本来应该是使用v-bind value来.
iview的value接口只有一个label，
但是label并不能把v-for里的index什么的识别为变量。

然后就使用了bootstrap的组件。

看到了stackoverflow的答案，受到启发

```vue
    <select v-model="testVal">
        <option v-for="item in test" :value="item">{{item}}</option>
    </select>

    data(){
        return{
          test: ['one', 'two', 'three'],
          testVal: null
        }
    },
```

```html
        <div  v-for="(book, index) in getBooks" >
          <label class="radio-inline">
            <input type="radio" v-model="transbookname" name="transbooknameSelect" :value="book.attributes.title">
            {{book.attributes.title}}
          </label>
        </div>
```
后来我突然想到，用v-bind，把label接口绑定不就完了么？
发现果然可以

代码减少到一行。

```html
        <Radio-group  vertical v-model="transbookname">
          <Radio v-for="(book, index) in getBooks" :label=book.attributes.title>{{book.attributes.title}}</Radio>
        </Radio-group>
```

再次改进了动作，不能让移动到现有的书上

```html
        <Radio-group  vertical v-model="transbookname">
          <div  v-for="(book, index) in getBooks" >
            <Radio v-show="book.id !== getCurrentBook.id" :label=book.attributes.title>
              {{book.attributes.title}}
            </Radio>
          </div>
        </Radio-group>
```

下一个就是动作了。
移动文章到另外一个book。实质应该是修改belongbook才对。
leancloud先修改。
然后修改本地article数组数据，
修改article数组会不会引发更改当前book更改呢？
应该达到的效果是不会更改当前文章，但是保持当前书。
只是文章消失不见了。也就是说，index并未更改。

首先按照objid查询。
然后按照book的objid生成pointer对象。
然后set。save就可以了。
下面来看本地数据修改。
简书中，移动的话，当前book不变。
当前articleindex不变。
当前article变化为index的article

我先修改下articles数组里的数据
pointer下面只有3个属性，当中一个是objid
是不是只要修改这个就可以了？
发现并不是，反而是删除更为符合表现。
删除后再插入貌似是更好的选择。

修改一个属性后返回来的并不是全部数据。
只包含着更新的数据。
因此不能用于重新保存，而是save之后使用then重新拿着id，查询一次再返回。
![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170704/013557431.png)


![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170704/013634318.png)

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170704/013622919.png)


#### 编辑文章

编辑这个部分，由不同的网址到不同的地址上的。

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170704/143409989.png)

这个还可以转到预览模式

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170704/143437653.png)

预览模式还可以切换到写作模式

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170704/143559657.png)

2017-07-04 00:29:37

Todo: 

- [x] 编辑器的标题栏

- 思路：
编辑器-由div，包裹着一个form
我的BlogNew这里要引入一个new-edit-bar

我有点犹豫，要不要也做个form呢？
还是说，自己定制div？

决定自己定制div了。

border： none
outline： none

这样的话，input的框就没有了。

2017-07-05 06:28:15

- Todo
- [x] 保存title
- [x] 功能栏-图片
- [ ] 编辑栏

功能栏有好几个功能。
第一个图片，转换成云存储，
第二个撤销和重做。
第三个历史版本。

第四个保存。
第五个预览模式
第六个协作模式
第七个发布文章

这里有点困难，我想看看别人是怎么做的。

https://github.com/hinesboy/mavonEditor

图片的例子

https://github.com/xiaokaike/magic-upload-image

- 思路

title需要添加动作。
如果更改的话，需要保存到leancloud，同时保存到本地数据。
leancloud修改很简单。
本地的话，我应该修改哪个呢？
currentarticle的？
还是article数组的？article数组修改就可以了。


功能栏是一个toolbar，灰色的长条。
这里我看到是用ul下，li来排列的。
其实未必用这个吧。

![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170705/063200264.png)

功能有，图片，这个只是个样子而已。
![mark](http://oc2aktkyz.bkt.clouddn.com/markdown/20170705/063228324.png)

撤销，重做。
历史版本。

保存。
切换到预览模式，切换到协作模式，发布文章。

这里使用iview的Tooltip很简单。
但是原来限制了宽度max为250.
所以把这个改成500了。

下一步就是制作toolbar的图片功能如何实现？
只要把图片粘贴过去，就自动上传，并且转换成markdown链接。
如何做到这一点？

还有下一步就是undo，redo。
这个要保存article的所有状态。
如何做到这一点？

https://stackoverflow.com/questions/42878329/going-back-to-states-like-undo-redo-on-vue-js-vuex/44865208#44865208

https://vuex.vuejs.org/zh-cn/api.html

先从简单的开始吧。
先把编辑栏做好。

图片粘贴实质上就是在textarea，如何粘贴图片。
检测后上传到云，转换成外链。
问题要清楚，越具体越好。

貌似编辑器的原理是，v-model，textarea，然后做各种事情。

2017-07-06 03:56:21

- Todo

- [x] textarea
- [ ] 图片处理
- [ ] 编辑栏

今天先做textarea栏先写一下

textarea paste别人的代码是使用了mixin的方式插入。

分为两个部分：
一个是拖拽，一个是粘贴。

拖拽使用DragEvent。

https://segmentfault.com/a/1190000008503338


先写一下粘贴吧。
粘贴我也使用mixin？
还是只是写一个js文件弄成函数？
我不想让这个成为全局函数，因为只需要在editor里使用。

还是说以后在写作模式或者其他模式的时候也要用到？

首先新建一个js模块吧。
service文件夹是放主要的leancloud的地方。
放在ext里。

发现了一个问题。
复制的图片，从粘贴板上获取。
是只限于从网页复制或者截图的。
如果是硬盘的图片复制，你在textarea里粘贴是完全没反应的。

http://www.cnblogs.com/djuny/p/5254626.html


遇到一个问题：
使用getAsFile 获取了文件。
但是想要改名字的时候说
Cannot assign to read only property 'name' of object '#<File>' 
没找到合理办法。
我在想要不上传的时候，重命名就好了吧。

上传的时候，有个问题，数据结构我该怎么做？
是设置创建者？
还是说谁都可以读取写？

为了以后当拖拽的时候也可以用，我写了upload模块。

但是上传并且返回url是有延迟的，
所以写了promise。好繁琐。

有没有更好的办法？
貌似是使用了ajax。
我需要学会ajax么？

mixin的方式，在js里，设置了插件。
然后当事情遇到的时候，往父组件里发送通知。


2017-07-07 18:59:26 

- Todo

- [x] 图片拖拽和上传
- [ ] undo,redo
- [ ] 编辑栏

- 思路
图片拖拽有着api
别人的代码里，并没有在textarea设置监控。
而是在父亲div里，设置的。

```javascript
        @drop="handleDrag"  
        @dragover="handleDragover"
        @dragleave="handleDragleave"
```

一共3个方法，第一个我发现拖动并且释放就可以了。
第二个和第三个有什么必要呢？
第二个是当拖拽的元素在目标上面的时候。
第三个是拖拽的元素在目标上面离开的时候。
感觉第二个和第三个并没有什么必要啊。

元素列表里是元素。
我在想，要不要试一下插件的方式？
还学习一下ajax？

还是嵌套了promise。
剩下的问题是，如何在上传的时候，出现一个上传中这个图标。
虽然不是很好看，还有一个图标并不能完全覆盖的bug，但是总算是完成了图片功能。
因为其他写文章什么的，是一边修改云端，一边本地修改。很快就能完成。
但是图片上传，并且返回地址需要一些时间，大概5秒左右。


2017-07-08 17:40:55

- Todo:

- [ ] undo和redo

- 思路

如果只用快捷键可不可以？
textarea已经默认为ctrl z是撤销了。
我需要做的只是，图标按下，就启动ctrl z
就可以了。
或者说真的要储存state状态么？

https://github.com/iischajn/iischajn.github.com/issues/1

大致思路应该是，设置一个堆栈。
然后如果value变化的话，那么就存进去现在的状态。


2017-07-09 13:37:24

- Todo:

- [x] 修改了标题上传方式-debounce

- 思路

我一直在困惑，假如每当输入一次input就修改储存的话，
这个消耗也太大了点吧。
在vue的官方文档里，看到markdown editor。
这里使用了debounce

就是在一定时间内只触发一次。
https://jsfiddle.net/chrisvfritz/rdjjpc7a/?utm_source=website&utm_medium=embed&utm_campaign=rdjjpc7a

https://www.youtube.com/watch?v=xz_TxQBI7Mk
从这个视频看到，这个视频的思路是，使用filter，
引用一个已经写好的marked.js文件。

这样的话，事实上，就没必要写很复杂的了。

2017-07-10 16:47:57

- Todo:

- [ ] undo和redo

- 思路

有个叫menote貌似做的不错。


code mirror（或者ace editor）作为编辑器，marked负责解析md，highlight负责高亮代码之类

学习一下

首先工具栏它是生成的，而不是写进去的。
图标是a链接，所以设置title，就会出现说明。
keybinding文件写入。
不过我没看明白，tooltip是干什么用的。


2017-07-11 22:18:56 

决定使用ace editor了。
虽然单纯的 textarea 或许也可以。
但是我要追求的是输入像代码一般的效果。

https://github.com/ajaxorg/ace-builds/
这里下载安装包然后在index.html里引入

2017-07-12 05:41:10

在使用ace editor的时候，纠结了半天。
第一步需要在index.html里引用script。
然后需要使用-创建ace的实例。
这个其实是
var editor = window.ace.edit('newEditMainbar')
这样才可以的。
因为并不是npm 安装包，所以不能用import

ace 在mounted的时候创造。
因为ace是在一个div插入一个textarea
所已不能像之前一样使用v-model。
但是ace editor 自然就可以使用vim mode。
还有编辑器行数什么的，非常好用。

问题在于div里绑定方法是不能成功的。

div 并没有相应的api

我该怎么办呢？
如何才能给ace editor 绑定函数和方法呢

dom 元素的事件列表在这里

https://developer.mozilla.org/zh-CN/docs/Web/Events

按道理说v-on 是可以绑定的。
发现paste是可以的。
但是在drop 这个在div 里发现始终是有毛病的。
在textarea里drop是没问题的。
但是因为使用的ace editor，所以我只能把拖拽功能放到上面的div

有一个方式是，生成editor之后。
我运行一个addeventlistener
给div。试一下拖拽。
但是这个就涉及到纯粹的js了。
这样合适吗？
没办法，这样做代码只需要几行就可以了。
如果用html-v绑定不成功，那么就用js，getelementbyid
然后添加drop行动。

下一步就是，粘贴之后，会selection，要把这个改掉
然后修改字体大小。

paste如果是文字，那么也会上传到图片。

还有，拖拽的如果不是一个图片，那么应该显示警告。

还有要设置自动换行。







