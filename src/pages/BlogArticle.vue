<template>
  <div class="blog_content">
    <sidebar></sidebar>
    <div class="main">
      <h1> 这里是 文章列表 </h1>
      <div class="blog">
        {{  this.getCurrentArticle.attributes.title  }}
        {{  this.getCurrentArticle.attributes.content  }}
        <!--&lt;!&ndash;Todo: 这里要添加博客内容&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="title">&ndash;&gt;-->
          <!--&lt;!&ndash;<p><a @click="goDetail(article)">{{article.attributes.title}}</a></p>&ndash;&gt;-->
          <!--&lt;!&ndash;<span>发布时间：{{$formatDate(article.createdAt, 'yyyy-MM-dd hh:mm')}}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="tags">&ndash;&gt;-->
          <!--&lt;!&ndash;<span>标签：</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<a v-if="article.attributes.tags">{{article.attributes.tags}}</a>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="content">&ndash;&gt;-->
          <!--&lt;!&ndash;<div>{{  article.attributes.content  }}</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from '@/components/blog/sidebar'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BlogArticle',
    components: {
      sidebar
    },
    created: function () {
      console.log('文章主页被创造出来了')
      console.log(this.getCurrentArticle)
      console.log(this.getCurrentArticle.length)
//      this.articles = this.getArticles
//      this.currentPage = this.getCurrentPage
//      this.displayArticles = service.getDisplayArticles(this.articles, this.currentPage, this.pageSize)
    },
    computed: {
      ...mapGetters({
        getCurrentArticle: 'getCurrentArticle'
      })
    },
    methods: {
      ...mapActions([
      ])
    }
  }
</script>

<style lang="sass" scoped>
  .blog_content
    /*display: flex*/
    flex: 1
    /*width: 700px*/
    min-height: 800px
    font-family: Lato,"Microsoft Jhenghei","Hiragino Sans GB","Microsoft YaHei",sans-serif
    font-size: 14px
    background-color: #ffffff
    padding: 30px 30px
    .main
      display: flex
      flex-direction: column
      width: calc(100% - 320px)
      min-height: 800px
      margin: 0 auto
      margin-bottom: 20px
      text-align: left
</style>
