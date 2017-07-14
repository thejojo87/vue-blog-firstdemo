<template>
<div class="new_book_list" >
  <ul class="list_display" >
    <li class="book" :class="{book_active: index === getCurrentBookIndex}" v-for="(book, index) in getBooks">
      <a @click="chooseBook(index, book)" data-type="active" class="notebook-name">
        <span>
          <div>{{  book.attributes.title  }}
          </div>
        </span>
        <div v-show="index === getCurrentBookIndex">
          <new-book-list-gear :index="index" :bookid="book.id" :bookname="book.attributes.title"></new-book-list-gear>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NewBookListGear from './newBookListGear'
  export default {
    components: {NewBookListGear},
    name: 'NewBookList',
    data () {
      return {
//        activeIndex: this.getCurrentBookIndex
      }
    },
    created: function () {
      console.log('新建文章booklist被创造出来了')
      console.log(this.activeIndex)
      this.activeIndex = this.getCurrentBookIndex
    },
    watch: {
      getCurrentBook: function (val, oldVal) {
        console.log('getcurrentbook')
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        this.actionSaveCurrentBookArticles()
        this.actionSaveCurrentBookArticleIndex(0)
        // 既然book变了，article变了，那么就应该改变当前的article才对。
      },
      getCurrentBookIndex: function (val, oldVal) {
        console.log('getcurrentbookindex')
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
      },
      getArticles: function (val, oldVal) {
        console.log('getcurrentbookarticles')
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        this.actionSaveCurrentBookArticles()
      }
    },
    computed: {
      ...mapGetters({
        getBooks: 'getBooks',
        getArticles: 'getArticles',
        getCurrentBook: 'getCurrentBook',
        getCurrentBookIndex: 'getCurrentBookIndex'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentBook',
        'actionSaveCurrentBookIndex',
        'actionSaveCurrentBookArticles',
        'actionSaveCurrentBookArticleIndex'
      ]),
      chooseBook (index, book) {
//        this.activeIndex = index
        this.actionSaveCurrentBook(book)
        this.actionSaveCurrentBookIndex(index)
      }
    }
  }
</script>

<style lang="sass" scoped>
.new_book_list
  color: white
  text-shadow: 0 -1px 0 rgba(0,0,0,0.2)
  .list_display
    font-size: 15px
    font-weight: normal
    line-height: 20px
    margin-bottom: 0
    .book
      width: 100%
      display: flex
      height: 40px
      line-height: 27px
      align-items: center
      justify-content: flex-start
      a
        display: flex
        align-items: center
        width: 100%
        span
          display: inline-flex
          justify-content: flex-start
          color: white
          text-shadow: 0 -1px 0 rgba(0,0,0,0.2)
          text-overflow: ellipsis
          margin-left: 20px
          width: calc(100% - 60px)
          div
            overflow: hidden
            text-overflow: ellipsis
    .book_active
      background-color: #646464
      border-left: 3px solid #ec7259
      outline: none !important
    .book:hover
      background-color: #646464
    /*.book:blur*/



</style>
