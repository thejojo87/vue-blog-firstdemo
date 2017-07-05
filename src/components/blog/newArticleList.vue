<template>
  <div class="new_article_list">
    <ul class="list_display" >
      <li :class="{article_active: index === getCurrentArticleIndex}" v-for="(article, index) in getCurrentBookArticles">
        <div @click="chooseArticle(index, article)" class="new_article_list_item">
        <div class="new_article_list_item_icon">
          <Icon  id="new_article_icon" color="#a6a6a6"  size="35" type="document-text" />
            <span id="wordnumber">字数:2100999</span>
        </div>
        <div class="new_article_list_item_main">
          <p id="new_article_list_item_title">{{  article.attributes.title  }}</p>
          <p id="new_article_list_item_content">{{  article.attributes.content  }}</p>
        </div>
        <div class="new_article_list_item_gear" v-if="index === getCurrentArticleIndex">
          <new-article-list-gear :articleid="article.id" :index="index" :articlename="article.attributes.title"></new-article-list-gear>
        </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NewArticleListGear from './newArticleListGear'
  export default {
    components: {NewArticleListGear},
    name: 'newArticleList',
    data () {
      return {
        activeIndex: 0
//        isInit: true
      }
    },
    created: function () {
    },
    beforeUpdate: function () {
    },
    watch: {
      // 这里要当变化的时候，current——article也要存进去
      getCurrentBookArticles: function (val, oldVal) {
        console.log(this.isInit)
        // 如果是删除了最后一个元素，那么index是不会变化的。
        if (this.getCurrentBookArticles[0]) {
          console.log('aaa')
          this.actionSaveCurrentBookArticle(this.getCurrentBookArticles[0])
        } else {
          console.log('bbb')
          this.actionSaveCurrentBookArticle()
        }
      }
    },
    computed: {
      ...mapGetters({
        getCurrentBookArticles: 'getCurrentBookArticles',
        getCurrentArticleIndex: 'getCurrentArticleIndex'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentBookArticle',
        'actionSaveCurrentBookArticleIndex'
      ]),
      chooseArticle (index, article) {
        this.actionSaveCurrentBookArticle(article)
        this.actionSaveCurrentBookArticleIndex(index)
      }
    }
  }
</script>

<style>
  .new_article_list {
    /*display: flex;*/
    /*background-color: red;*/
    /*flex-direction: column;*/
    /*overflow: hidden;*/
  }
  .new_article_list_item {
    /*position: relative;*/
    display: flex;
    flex-direction: row;
    /*justify-content: center;*/
    align-items: center;
    max-height: 90px;
    height: 90px;
    border-top: 1px solid #dcdcdc;
    background-color: transparent;
    border-left: 5px solid transparent !important;
  }
  .new_article_list_item:hover {
    color: #2f2f2f;
    background-color: #ececec;
    text-shadow: none;
  }
  .article_active {
    background-color: #ececec;
    color: black;
    border-left: 5px solid #ec7259 !important;
  }
  .new_article_list_item_icon {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 20px;
    /*background-color: #c7254e;*/
    /*padding: 0 20px;*/
  }
  #new_article_icon {
    margin-top: 28px;
  }
  #wordnumber {
    margin-top: 10px;
    margin-left: -17px;
    text-align: left;
    width: 80px;
    /*background-color: #c7254e;*/
    /*left: -5px;*/
    /*right: 10px;*/
    /*width: 120px;*/
    height: 20px;
    font-size: 9px;
  }
  #wordage {
    position: relative;
    left: -10%;
    width: 100px;
    height: 30px;
    display: flex;
    flex-direction: row;
    font-family: -apple-system, "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 9px;
    color: #555555;
  }
  .new_article_list_item_main {
    /*flex: 1;*/
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 10px;
    /*align-items: flex-end;*/
    /*justify-content: flex-end;*/
    max-width: calc(100% - 100px);
    /*width: 267px;*/
    /*margin-left: -30px;*/
    height: 60px;
    text-align: left;
    /*margin-left: -200px;*/
  }
  #new_article_list_item_title {
    /*text-align: left;*/
    flex: 1;
    padding: 0;
    /*padding-left: 30px;*/
    /*width: 267px;*/
    margin: 0;
    /*width: 60%;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: normal;
    line-height: 36px;
  }
  #new_article_list_item_content {
    /*position: absolute;*/
    /*top: 40px;*/
    /*left: 60px;*/
    /*right: 40px;*/
    /*width: 60%;*/
    height: 30px;
    /*flex: 1;*/
    margin: 0;
    color: #555555;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11px;
    font-weight: normal;
    line-height: 36px;
  }
  .new_article_list_item_gear {
    margin-right: 10px;
  }
</style>
