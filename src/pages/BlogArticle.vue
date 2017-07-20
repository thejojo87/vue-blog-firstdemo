<template>
  <div class="blog_content">
    <sidebar></sidebar>
    <div class="main">
      <div class="blog">
        <div class="title">
          <h1>{{  getCurrentArticle.attributes.title  }}</h1>
        </div>
        <div class="descriptions">
          <span>发布时间：{{$formatDate(getCurrentArticle.createdAt, 'yyyy-MM-dd hh:mm')}}</span>
          <span>&nbsp; | &nbsp;</span>
          <span>标签：</span>
          <a v-if="getCurrentArticle.attributes.tags"><el-tag type="primary">{{getCurrentArticle.attributes.tags}}</el-tag></a>
        </div>
        <div class="content">
          <div v-html="changeMarkdownStyle(getCurrentArticle.attributes.content)"></div>
        </div>
      </div>
      <el-button v-if="getCurrentUser" @click="goback" id="back_button" type="success" icon="edit">返回</el-button>
    </div>
  </div>
</template>

<script>
  import sidebar from '@/components/blog/sidebar'
  import { mapGetters, mapActions } from 'vuex'
  import markdown from '@/ext/markdown'
  export default {
    name: 'BlogArticle',
    components: {
      sidebar
    },
    created: function () {
      console.log('askldf')
      console.log('askldf')
      console.log('askldf')
      console.log('askldf')
      console.log('askldf')
      console.log('askldf')
    },
    computed: {
      ...mapGetters({
        getCurrentArticle: 'getCurrentArticle',
        getCurrentUser: 'getCurrentUser'
      })
    },
    methods: {
      ...mapActions([
      ]),
      // 转换成markdown格式
      changeMarkdownStyle (article) {
        return markdown.render(article)
      },
      goback () {
        history.go(-1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .blog_content
    /*display: flex*/
    flex: 1
    width: calc(100% - 320px)
    overflow: hidden
    min-height: 1000px
    font-family: Lato,"Microsoft Jhenghei","Hiragino Sans GB","Microsoft YaHei",sans-serif
    font-size: 14px
    background-color: #36465d
    padding: 100px 30px
    .main
      display: flex
      color: #444444
      background-color: #dedede
      flex-direction: column
      width: 80%
      min-height: 800px
      margin: 0 auto
      margin-bottom: 20px
      padding: 40px
      text-align: left
      .blog
        font-weight: bold
        background-color: #dedede
        /*margin: 30px 30px*/
        /*padding: 30px 30px*/
      .title
        text-align: center
        height: 70px
        color: #444444
        //<!--margin-bottom: -20px-->
      p
        a
          color: #444444
          cursor: pointer
      a:hover
        text-decoration: none
        border-bottom: 2px solid
      .descriptions
        /*margin-left: 40px*/
        text-align: center
        color: #000000
        margin-bottom: 20px
      .content
        margin-top: 30px
        font-family: Lato, "PingFang SC", "Microsoft YaHei", sans-serif
        font-size: 16px
        line-height: 2
        color: #555
        font-weight: normal
        min-height: 600px
        width: 100%
        /*display: block*/
        word-break: break-all
        word-wrap: break-word
        max-width: 100%
        /*margin-bottom: 100px*/
        clear: both

    #back_button
      position: fixed
      top: 80px
      left: 30px
</style>
