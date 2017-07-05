<template>
  <div class="blog_content">
    <div class="main">
      <div class="blog" v-if="articles" v-for="article in this.displayArticles">
        <div class="title">
          <p><a @click="goDetail(article)">{{article.attributes.title}}</a></p>
          <span>发布时间：{{$formatDate(article.createdAt, 'yyyy-MM-dd hh:mm')}}</span>
        </div>
        <div class="tags">
          <span>标签：</span>
          <a v-if="article.attributes.tags"><el-tag type="primary">{{article.attributes.tags}}</el-tag></a>
        </div>
        <div class="content">
          <div>{{  article.attributes.content  }}</div>
        </div>
        <div id="read">
          <a @click="goDetail(article)">阅读全文</a>
        </div>
      </div>
    <!--Todo： 这里应该添加分页效果-->
      <div class="blog_page">
        <Page :total="this.getArticles.length" :current="this.currentPage" :page-size="this.pageSize" @on-change="handleSizeChange" show-elevator show-total></Page>
      </div>
      <el-button v-if="getCurrentUser" @click="goNewArticle" id="new_article" type="success" icon="edit">写文章</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as service from '@/service/articles'
  export default {
    name: 'mainbar',
    data () {
      return {
        articles: [],
        currentPage: 1,
        pageSize: 2,
        displayArticles: []
      }
    },
    created: function () {
      console.log('mainbar被创造出来了')
      this.articles = this.getArticles
      this.currentPage = this.getCurrentPage
      this.displayArticles = service.getDisplayArticles(this.articles, this.currentPage, this.pageSize)
    },
    watch: {
      getArticles: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        console.log('blog里article变化了' + val)
        console.log(val)
        this.articles = val
        this.displayArticles = service.getDisplayArticles(this.articles, this.currentPage, this.pageSize)
//        this.actionGetArticles(val.id)
      }
    },
    computed: {
      ...mapGetters({
        // 获取文章数目
        getArticles: 'getArticles',
        getCurrentPage: 'getCurrentPage',
        getCurrentUser: 'getCurrentUser'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentPage',
        'actionSaveCurrentArticle'
      ]),
      // 跳转到详情页
      goDetail (article) {
        console.log(article)
        const url = '/blog/articles/' + article.id
        console.log(url)
        this.actionSaveCurrentArticle(article)
        this.$router.push(url)
      },
      // 跳转到新建文章界面
      goNewArticle () {
        const url = '/blog/new/'
//        console.log(url)
//        this.actionSaveCurrentArticle(article)
        this.$router.push(url)
      },
      // 当前页改变了
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.currentPage = val
        console.log(this.articles.length)
        // Todo: 首先savecurrentPage的数据
        this.actionSaveCurrentPage(val)
        this.displayArticles = service.getDisplayArticles(this.articles, this.currentPage, this.pageSize)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .blog_content
    /*display: flex*/
    flex: 1
    /*width: 700px*/
    /*min-height: 800px*/
    font-family: Lato,"Microsoft Jhenghei","Hiragino Sans GB","Microsoft YaHei",sans-serif
    font-size: 14px
    background-color: #36465d
    /*padding: 30px 30px*/
    .main
      display: flex
      flex-direction: column
      width: 80%
      /*min-height: 800px*/
      margin: 0 auto
      margin-bottom: 20px
      text-align: left
    .blog
      display: flex
      flex-direction: column
      background-color: #dedede
      margin: 30px 30px
      padding: 30px 30px
      .title
        height: 70px
        color: #444444
        margin-bottom: -20px
      p
        a
          color: #444444
          cursor: pointer
      a:hover
        text-decoration: none
        border-bottom: 2px solid
      span
        color: #333333
        font-size: 12px
      .tags
        color: #000000
        margin-bottom: 20px
      .content
        clear: both
        overflow: hidden
        color: #333333
        /*text-overflow: ellipsis*/
        height: 180px
      #read
        margin: 30px 0
        display: flex
        a
          display: flex
          padding: 10px 30px
          text-decoration: none
          color: #000000
          border: 2px solid #e3e3e3
          cursor: pointer
        a:hover
          color: #747d85
          border-color: #747d85
          outline: 0
          -webkit-transition: all .5s linear
    .blog:hover
      transform: translateY(-2%)
      box-shadow: 1px 4px 10px 2px #CCC
      -webkit-box-shadow: 1px 4px 10px 2px #CCC
      -webkit-transition: all .4s
  .blog_page
    margin: 0 auto
    color: #dddddd
  #new_article
    position: fixed
    top: 80px
    left: 30px
</style>
