<template xmlns="http://www.w3.org/1999/html">
  <Poptip id="gear_poptip" v-model="visible" placement="bottom-end" width="160">
    <Icon id="gear" type="gear-b"  size="18" color="#a0a0a0" ></Icon>
    <div class="gear_title" slot="title" @click="changeNameStart">
      <Icon class="gear_title_icon" type="ios-compose-outline" size="18"></Icon>
      <i class="gear_title_i">修改文集名</i>
    </div>
    <div id="gear_content" slot="content" class="gear_content" @click="deleteBookStart">
      <Icon id="gear_content_icon" class="gear_content_icon" type="ios-trash-outline" size="18"/>
      <i id="gear_content_i" class="gear_title_i" >删除文集</i>
    </div>
    <Modal
      class-name="changeTitle"
      v-model="isChangeName"
           title="修改文集名"
           width="window.screen.width">
      <p slot="header" id="gear_ischange_header">
        <span>修改文集名</span>
      </p>
      <p id="gear_ischange_middle">
        <Input v-model="_bookname" placeholder="请输入..." style="width: 200px"></Input>
      </p>
      <div slot="footer">
        <Button @click="changeNameCancel">取消</Button>
        <Button type="primary" @click="changeNameEnd">提交</Button>
      </div>
    </Modal>
    <Modal v-model="isDeleteBook" class-name="deleteBook">
      <p>确认删除文集《{{  bookname  }}》，<br>
        文集内文章将会被移动到回收站。</p>
      <div slot="footer" id="gear_deletebook_footer">
        <Button @click="deleteBookCancel">取消</Button>
        <Button type="primary" @click="deleteBookEnd">提交</Button>
      </div>
    </Modal>
  </Poptip>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'newBookListGear',
    props: {
      bookname: String,
      bookid: String,
      index: Number
    },
    data () {
      return {
        _bookname: '',
        _bookid: '',
        _index: 0,
        visible: false,
        isChangeName: false,
        isDeleteBook: false
      }
    },
    created: function () {
      console.log('新建文章booklist被创造出来了')
      this._bookname = this.bookname
      this._bookid = this.bookid
      this._index = this.index
    },
    computed: {
      ...mapGetters({})
    },
    methods: {
      ...mapActions([
        'actionChangeBookname',
        'actionDeleteBook'
      ]),
      // 也可以用参数，但是依然需要判断，好麻烦，还是直接写算了
      changeNameCancel () {
        console.log('changeNameCancel')
        this.visible = false
        this.isChangeName = false
      },
      changeNameEnd () {
        console.log('changeNameEnd')
        this.isChangeName = false
        this.visible = false
        // Todo： 要进行名称的修改
        console.log(this.bookid)
        console.log(this.bookname)
        console.log(this._bookname)
        const newbookname = {
          bookid: this.bookid,
          bookname: this._bookname
        }
        this.actionChangeBookname(newbookname)
      },
      changeNameStart () {
        console.log('changeNameStart')
        this.isChangeName = true
        this.visible = false
      },
      deleteBookStart () {
        console.log('deleteBookStart')
        this.isDeleteBook = true
      },
      deleteBookCancel () {
        this.isDeleteBook = false
//        this.visible = false
      },
      deleteBookEnd () {
        console.log('deleteBookStart')
        const deleteBook = {
          bookid: this._bookid,
          bookindex: this._index
        }
        this.actionDeleteBook(deleteBook)
        this.isDeleteBook = false
      }
    }
  }
</script>

<style>
  #gear_poptip {
    margin-left: 40px;
  }
  #gear{
    margin-left: -40px
  }
  .ivu-poptip-body {
    padding: 8px 0;
  }
  .gear_title {
    margin-left: -16px;
    width: 160px;
    display: flex;
    align-items: flex-end;
    padding: 3px 0;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #3f3f3f;
    white-space: nowrap;
    font-size: 14px;
    font-family: "Microsoft YaHei"
  }
  .gear_content {
    /*margin-left: -16px;*/
    width: 160px;
    overflow: visible;
    overflow-x: hidden;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #3f3f3f;
    white-space: nowrap;
    font-size: 14px;
    font-family: "Microsoft YaHei"
    /*margin: 0;*/
    /*padding: 3px 0;*/
  }
  .gear_content_icon{
    margin-left: -47px;
  }
  .gear_title:hover, .gear_content:hover {
    color: white;
    background-color: #4f4f4f;
    /*background-size: 160px;*/
    /*width: 160px;*/
    /*mar*/
  }
  /*#gear_title_icon:hover {*/
    /*color: #d5d5d5;*/
  /*}*/
  .gear_title_icon {
    margin-left: 20px;
  }
  .gear_title_i, .gear_content_i{
    font-style: normal;
    margin-left: 3px;
  }
  .deleteBook {
    text-align: center;
    /*display: flex;*/
    /*!*height: 1000px;*!*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }
  #gear_deletebook_footer {

    /*background-color: #f5f5f5;*/
  }
  #gear_ischange_header{
    text-align:center;
    font-size: 20px;
    line-height: 20px;
    font-weight: 700;
    font-family: "Microsoft YaHei";
    color: rgb(85, 85, 85);
  }
  #gear_ischange_middle {
    text-align:center
  }
</style>
