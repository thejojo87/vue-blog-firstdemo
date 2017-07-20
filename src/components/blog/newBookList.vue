<template>
<div class="new_book_list" >
  <ul class="list_display" >
    <draggable v-model="sortbook" :move="moveBook" @change="changeBooks">
    <li class="book" :class="{book_active: index === getCurrentBookIndex}" v-for="(book, index) in sortbook">
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
    </draggable>
  </ul>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NewBookListGear from './newBookListGear'
  import draggable from 'vuedraggable'

  export default {
    components: {
      NewBookListGear,
      draggable
    },
    name: 'NewBookList',
    data () {
      return {
        // 试一下这个变量代表排序后的结果
        books: this.$store.state.books
        //        activeIndex: this.getCurrentBookIndex
      }
    },
    created: function () {
      console.log('新建文章booklist被创造出来了')
      this.actionSaveCurrentBookIndex(0)
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
      }),
      sortbook: {
        get () {
          return this.sortBooks(this.$store.state.blogNew.books)
        }
//        return this.sortBooks(this.getBooks)
      }
//      sortbook: function () {
//
//      }
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentBook',
        'actionSaveCurrentBookIndex',
        'actionSaveCurrentBookArticles',
        'actionSaveCurrentBookArticleIndex',
        'actionSaveChangeBooksIndex'
      ]),
      moveBook (evt) {
        console.log(evt)
      },
      sortBooks (books) {
        return books.sort((a, b) => a.attributes.sort - b.attributes.sort)
      },
      changeBooks (evt) {
//        evt.preventDefault()
        console.log('change Books')
        console.log(this.getBooks)
        console.log(evt.moved)
        console.log(evt.moved.newIndex)
        console.log(evt.moved.oldIndex)
        const index = {
          newIndex: evt.moved.newIndex,
          oldIndex: evt.moved.oldIndex
        }
        this.actionSaveChangeBooksIndex(index)
        // 按照index，获取book，然后交换sort id
      },
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
