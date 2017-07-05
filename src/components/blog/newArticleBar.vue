<template>
<div class="newArticleBar">
  <div class="new_article">
    <div class="new_article_header"  @click="createNewArticle(true)"  >
      <Icon type="plus-circled" />
      <i class=""></i> 新建文章
    </div>
    <new-article-list></new-article-list>
    <div v-if="getCurrentBookArticles.length !== 0" class="new_article_footer"  @click="createNewArticle(false)"  >
      <Icon type="plus-circled" />
      <i class=""></i> 在下方新建文章
    </div>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NewArticleList from './newArticleList'
  export default {
    components: {NewArticleList},
    name: 'NewArticleBar',
    data () {
      return {
        isAddArticle: false
//        newBookName: ''
      }
    },
    computed: {
      ...mapGetters({
        getCurrentBook: 'getCurrentBook',
        getCurrentBookArticles: 'getCurrentBookArticles'
      })
    },
    methods: {
      ...mapActions([
        'actionCreateNewArticle'
      ]),
      createNewArticle (isTop) {
        console.log('createNewArticle开始了')
        const data = {
          _isTop: isTop,
          _bookid: this.getCurrentBook.id,
          _currnt_book_articles_length: this.getCurrentBookArticles.length
        }
        this.actionCreateNewArticle(data)
      }
    }
  }
</script>

<style>
.newArticleBar {
  /*overflow: auto;*/
  height: 100%;
  display: flex;
  flex-direction: column;
  /*color: #f5e2ba;*/
  width: 25%;
  background-color: #ffffff;
  border-right: 1px solid #d9d9d9;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 14px;
  line-height: 20px;
  color: #555555;
}
  .new_article {
    height: 61.6px;
    display: flex;
    flex-direction: column;
    /*background-color: #c7254e;*/
  }
  .new_article .new_article_header {
    /*display: block;*/
    padding: 20px 0 20px 25px;
    font-size: 15px;
    font-weight: normal;
    line-height: 20px;
    text-align: left;
  }
  .new_article_header:hover ,.new_article_footer:hover{
    color: #000000;
  }
  .new_article_footer {
    /*position: relative;*/
    margin-bottom: 100px;
    margin-top: 10px;
  }
</style>
