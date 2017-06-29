<template>
  <div class="blog_new_booksbar">
    <div class="home-wrap">
      <a href="/" class="go-home">
        <i class="fa fa-home" aria-hidden="true"></i>
        <span>回首页</span>blogs
      </a>
    </div>
    <div class="new-notebook">
      <a @click="isAddBook = !isAddBook" class="el-icon-plus">
        <i class="fa fa-plus"></i> 新建文集
      </a>
    </div>
    <div class="new-notebook-input" v-if="isAddBook">
      <div class="new-notebook-form">
        <form class="create-notebook-form" v-on:submit.prevent="addNewBook" >
          <input v-model="newBookName" placeholder="请输入文集名..." type="text" name="name" class="input-medium notebook-input">
          <el-button class="new-notebook-submit" @click="addNewBook" type="success">提交</el-button>
          <a @click="isAddBook = !isAddBook" class="btn cancel" data-action="cancel-create-notebook"> 取消 </a>
      </form>
      </div>
    </div>
    <new-book-list></new-book-list>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NewBookList from './newBookList.vue'
  export default {
    name: 'newBookBar',
    data () {
      return {
        isAddBook: false,
        newBookName: ''
      }
    },
    components: {
      NewBookList
    },
    created: function () {
      this.actionGetBooks()
    },
    computed: {
      ...mapGetters({
        getCurrentUser: 'getCurrentUser'
      })
    },
    methods: {
      ...mapActions([
        'actionCreateNewBook',
        'actionGetBooks'
      ]),
      addNewBook () {
        this.isAddBook = !this.isAddBook
        this.actionCreateNewBook(this.newBookName)
      }
    }
  }
</script>

<style lang="sass" scoped>
.blog_new_booksbar
  overflow: auto
  height: 100%
  display: flex
  flex-direction: column
  color: #f5e2ba
  width: 16.6%
  background-color: #3f3f3f
  .home-wrap
    padding: 30px 19px 5px 18px
    .go-home
      display: flex
      justify-content: center
      padding: 9px 0
      font-size: 15px
      color: #ec7259
      border: 1px solid rgba(236,114,89,0.7)
      border-radius: 4px
      flex: 1
  .new-notebook
    display: flex
    flex-direction: row
    padding: 0 15px
    margin-top: 20px
    margin-bottom: 20px
    justify-content: flex-start
    a
      font-size: 13px
      font-weight: normal
      line-height: 20px
      color: white
  .new-notebook-input
    margin-bottom: 10px
    margin-top: -10px
    padding: 0 15px
    .new-notebook-form
      margin: 0 0 20px
      .notebook-input
        background-color: rgba(180, 180, 180, 0.2)
        border-radius: 4px
        border: 1px solid #2f2f2f
        box-sizing: border-box
        color: #c8c8c8
        height: 35px
        width: 100%
        padding-left: 10px
        font-size: 14px
        margin-bottom: 20px
    .new-notebook-submit
      background: rgba(0, 0, 0, 0) none repeat scroll 0 0
      border-color: #34ab20
      border-radius: 20px
      color: #34ab20
      float: left
      padding: 10px 20px
    a
      background: rgba(0, 0, 0, 0) none repeat scroll 0 0
      border: medium none
      color: #969696
      padding-top: 10px
      margin-left: -100px

</style>
