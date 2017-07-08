<template>
  <div id="newEditBar">
  <div  id="newEditor" v-if="getCurrentNewArticle">
    <div id="newEditBarTitle">
      <input
        @input="editAndSaveTitle($event.target.value)"
        class="note_name mousetrap" name="note_name" type="text" id="note_title" :value="getCurrentNewArticle.attributes.title" >
    </div>

    <div id="newEditToolbar">
      <Tooltip content="将图片拖到编辑区域即可上传，或直接粘贴剪贴板里的图片" placement="right">

      <div class="toolbarImage">
        <Icon type="image" size="20"/>
      </div>
      </Tooltip>
    </div>

    <div id="newEditMainbar">
      <textarea placeholder="Write a comment or drag your files here..."
                v-model="text"
                v-on:paste="imgPaste($event)"
                v-on:drop="imgDrag"
                @dragover="handleDragover"
                @dragleave="handleDragleave"
      >
      </textarea>
    </div>
    <div>
      <!--<Col class="demo-spin-col" span="8">-->
      <Spin fix v-if="isLoading">
        <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
        <div>图片上传中...</div>
      </Spin>
      <!--</Col>-->
    </div>

  </div>
    <div id="newEditBackground" v-else="">
      <span>简&nbsp;书</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as imgPaste from '@/ext/img_paste'
  import * as imgDrag from '@/ext/img_drag'

  export default {
    name: 'NewEditBar',
    data () {
      return {
        text: '',
        images: [],
        isLoading: false
//        isFocus: false,
//        isDrogover: false,
//        upStatus: 'default',
//        errorText: '',
//        percentText: 0
      }
    },
    computed: {
      ...mapGetters({
        getCurrentNewArticle: 'getCurrentNewArticle'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentEditTitle'
      ]),
      imgDrag: function (event) {
        // 获取文件列表
        this.isLoading = true
        event.preventDefault()
        const fileList = event.dataTransfer.files
        const promise = new Promise(function (resolve, reject) {
          // 这里编写异步代码
          imgDrag.handleImageDrag(fileList, (backresult, result) => {
            if (result === 'success') {
              resolve(backresult)
            } else {
              reject(backresult)
            }
          })
        })
        promise.then((data) => {
          console.log('成功了上传批量图片')
          console.log(data)
          console.log(data.length)
          for (var i = 0; i < data.length; i++) {
            console.log(data[i].attributes.images.attributes.url)
            console.log(data[i].attributes.images.attributes.name)
            const addurl = '![' + data[i].attributes.images.attributes.name + '](' + data[i].attributes.images.attributes.url + ')' + '\n'
            this.text += addurl
          }
          this.isLoading = false
        }, function (error) {
          console.log(error)
          console.log('出了什么错误')
        })
      },
      // 这个是当元素在目标上面的时候
      handleDragover (e) {
        e.preventDefault()
      },
      // 这个是元素在目标上面鼠标离开的时候
      handleDragleave (e) {
        e.preventDefault()
      },
      // 处理图片从粘贴板上粘贴
      imgPaste: function (event) {
        this.isLoading = true
        console.log(event.clipboardData)
        console.log(event.clipboardData.items)
        const promise = new Promise(function (resolve, reject) {
          // 这里编写异步代码
          imgPaste.handleImagePaste(event, (backresult, result) => {
            if (result === 'success') {
              resolve(backresult)
            } else {
              reject(backresult)
            }
          })
        })
        promise.then((data) => {
          console.log('成功了editor')
          console.log(data.url)
          const addurl = '![' + data.name + '](' + data.url + ')'
          this.text += addurl
          this.isLoading = false
        }, function (error) {
          console.log(error)
          console.log('出了什么错误')
        })
      },
      editAndSaveTitle: function (editedValue) {
        // 一份是保存leancloud，一份是保存本地
        console.log(editedValue)
        console.log(this.getCurrentNewArticle.id)
        const titleData = {
          articleid: this.getCurrentNewArticle.id,
          articletitle: editedValue
        }
        this.actionSaveCurrentEditTitle(titleData)
      }
    }
  }
</script>

<style>
  #newEditBar {
    /*width: 100%;*/
    height: 100%;
    background-color: #ffffff;
    display: flex;
    flex: 1;
    margin: 0;
    font-size: 16px;
    font-weight: normal;
    line-height: 25px;
  }
  #newEditBackground {
    margin: auto;
    display: flex;
    vertical-align: middle;
    color: #e4e4e4;
    font-size: 64px;
    text-shadow: 0 1px 0 white;
  }
  #newEditor {
    padding-top: 20px;
    width: 100%;
    /*background-color: #66afe9;*/
    height: 100%;
    /*display: flex;*/
  }
  #newEditBarTitle input {
    /*height: 50px;*/
    outline: none;
    border: none;
  }
  #note_title {
    width: 100%;
    padding: 0 30px 10px 40px;
    margin-bottom: 0;
    /*border: none;*/
    /*border-bottom: 1px solid #d9d9d9;*/
    font-size: 30px;
    font-weight: normal;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0;
    box-shadow: none;
    height: 50px;
  }
  #newEditToolbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 39.2px;
    margin: 0;
    list-style-type: none;
    background-color: #dedede;
    border-bottom: 1px solid #d9d9d9;
  }
  .toolbarImage {
    padding: 11px 14px;
    display: inline-block;
    line-height: 17px;
  }
  #newEditMainbar {
    /*background-color: #66afe9;*/
    display: flex;
    flex: 1;
    height: calc(100% - 89px);
  }
  #newEditMainbar textarea {
    width: 100%;
    height: 100%;
  }
  .ivu-tooltip-inner {
     max-width: 500px !important;
  }

  .toolbarImage:hover {
    background-color: #555555;
    color: white;
    text-decoration: inherit;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>
