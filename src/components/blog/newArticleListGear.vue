<template>
  <Poptip id="new_article_gear_poptip" v-model="visible" placement="bottom-end" width="160">
    <Icon id="new_article_gear" type="gear-b"  size="18" color="#a0a0a0" ></Icon>
    <div class="gear_title" slot="title" @click="transArticleStart">
      <Icon class="gear_title_icon" type="folder" size="18"></Icon>
      <i class="gear_title_i">移动文章</i>
    </div>
    <div id="gear_content" slot="content" class="gear_content" @click="deleteArticleStart">
      <Icon id="gear_content_icon" class="gear_content_icon" type="ios-trash-outline" size="18"/>
      <i id="gear_content_i" class="gear_title_i" >删除文章</i>
    </div>
    <Modal
      class-name="transArticle"
      v-model="isTransArticle"
      title="移动文章到"
      width="window.screen.width">
      <p slot="header" id="gear_ischange_header">
        <span>移动文章到</span>
      </p>

      <div id="gear_ischange_middle">

        <Radio-group  vertical v-model="transbookname">
          <div  v-for="(book, index) in getBooks" >
            <Radio v-show="book.id !== getCurrentBook.id" :label=book.id>
              {{book.attributes.title}}
            </Radio>
          </div>
        </Radio-group>
        <!--<Radio-group v-model="transbookname" vertical v-for="(book, index) in getBooks" >-->
          <!--<Radio v-model="transbookname" label="book.attributes.title">-->
            <!--{{book.attributes.title}}-->
          <!--</Radio>-->
        <!--</Radio-group>-->
      </div>
      <!--<div v-for="(book, index) in getBooks">-->
          <!--<label>{{book.attributes.title}}-->
      <!--{{transbookname}}-->
        <!--<Input v-model="_bookname" placeholder="请输入..." style="width: 200px"></Input>-->
        <!--<Radio-group v-model="transbookname" vertical v-for="(book, index) in getBooks">-->
          <!--&lt;!&ndash;<div v-for="(book, index) in getBooks">&ndash;&gt;-->
          <!--&lt;!&ndash;<li>&ndash;&gt;-->
            <!--&lt;!&ndash;<Radio>&ndash;&gt;-->
            <!--&lt;!&ndash;{{book.attributes.title}}&ndash;&gt;-->
            <!--&lt;!&ndash;</Radio>&ndash;&gt;-->
          <!--&lt;!&ndash;</li>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</Radio-group>-->

      <div slot="footer">
        <Button @click="transArticleCancel">取消</Button>
        <Button type="primary" @click="transArticleEnd">提交</Button>
      </div>

    </Modal>


    <Modal v-model="isDeleteArticle" class-name="deleteBook">
      <p>确认删除文章《{{  articlename  }}》，<br>
        文章将会被移动到回收站。</p>
      <div slot="footer" id="gear_deletebook_footer">
        <Button @click="deleteArticleCancel">取消</Button>
        <Button type="primary" @click="deleteArticleEnd">提交</Button>
      </div>
    </Modal>
  </Poptip>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'newArticleListGear',
    props: {
      index: Number,
      articlename: String,
      articleid: String
    },
    data () {
      return {
        visible: false,
        isDeleteArticle: false,
        isTransArticle: false,
        transbookname: null
      }
    },
    computed: {
      ...mapGetters({
        getBooks: 'getBooks',
        getCurrentBook: 'getCurrentBook',
        getCurrentNewArticle: 'getCurrentNewArticle'
      })
    },
    methods: {
      ...mapActions([
        'actionDeleteArticle',
        'actionTransArticle'
      ]),
      deleteArticleStart () {
        this.isDeleteArticle = true
        this.visible = false
      },
      deleteArticleCancel () {
        this.isDeleteArticle = false
      },
      deleteArticleEnd () {
        this.isDeleteArticle = false
        const deleteArticle = {
          articleid: this.articleid,
          articleindex: this.index
        }
        this.actionDeleteArticle(deleteArticle)
      },
      transArticleStart () {
        this.isTransArticle = true
        this.visible = false
      },
      transArticleCancel () {
        this.isTransArticle = false
      },
      transArticleEnd () {
        this.isTransArticle = false
        const transbook = {
          bookid: this.transbookname,
          articleid: this.getCurrentNewArticle.id
        }
        this.actionTransArticle(transbook)
      }
    }
  }
</script>

<style>
#new_article_gear{

}

</style>
