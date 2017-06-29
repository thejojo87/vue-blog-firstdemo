<template>
<div class="newArticleBar">
  <div class="new_article" @click="createNewArticle" >
    <div class="new_article_header"  >
      <Icon type="plus-circled" />
      <i class=""></i> 新建文集
    </div>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'NewArticleBar',
    data () {
      return {
        isAddArticle: false
//        newBookName: ''
      }
    },
    computed: {
      ...mapGetters({
        getCurrentBook: 'getCurrentBook'
      })
    },
    methods: {
      ...mapActions([
        'actionCreateNewArticle'
      ]),
      createNewArticle () {
        console.log('createNewArticle开始了')
        this.actionCreateNewArticle(this.getCurrentBook.id)
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
    /*background-color: #c7254e;*/
  }
  .new_article .new_article_header {
    display: block;
    padding: 20px 0 20px 25px;
    font-size: 15px;
    font-weight: normal;
    line-height: 20px;
  }

</style>
