<template>
  <div id="newEditBar" ref="editor">
  <div  id="newEditor" v-if="getCurrentNewArticle">
    <div id="newEditBarTitle">
      <input
        @input="editAndSaveTitle($event.target.value)"
        class="note_name mousetrap" name="note_name" type="text" id="note_title" :value="getCurrentNewArticle.attributes.title" >
    </div>

    <div id="newEditToolbar" >
      <Tooltip content="将图片拖到编辑区域即可上传，或直接粘贴剪贴板里的图片" placement="right">
      <div class="toolbarImage">
        <Icon type="image" size="20"/>
      </div>
      </Tooltip>

      <Tooltip content="撤销" placement="top">
        <div class="toolbarImage" v-on:click="undo()">
          <Icon type="ios-undo" size="20"/>
        </div>
      </Tooltip>

      <Tooltip content="重做" placement="top">
        <div class="toolbarImage" v-on:click="redo()">
          <Icon type="ios-redo" size="20"/>
        </div>
      </Tooltip>
    </div>

    <div id="newEditMainbar"
          v-on:paste="imgPaste($event)">


      <!--<textarea placeholder="Write a comment or drag your files here..."-->
                <!--v-model="text"-->
                <!--v-on:paste="imgPaste($event)"-->
                <!--v-on:dragover="handleDragover($event)"-->
                <!--@dragleave="handleDragleave">-->
                <!--&lt;!&ndash;v-on:drop="imgDrag"&ndash;&gt;-->
      <!--</textarea>-->
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

    <Modal
      v-model="isDragHasImage"
      title="拖拽图片出错了">
      <p>拖拽的文件列表中没有图片，请重新尝试</p>
    </Modal>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as imgPaste from '@/ext/img_paste'
  import * as imgDrag from '@/ext/img_drag'
  import { debounce } from 'underscore'

  export default {
    name: 'NewEditBar',
    data () {
      return {
        isDragHasImage: false,
        text: '',
        images: [],
        isLoading: false,
        editor: null,
        editSession: null,
        undoManager: null,
        selection: null
//        isFocus: false,
//        isDrogover: false,
//        upStatus: 'default',
//        errorText: '',
//        percentText: 0
      }
    },
    created: function () {
      console.log('created editor')
//      this.$nextTick(() => {
//        this.createEditor()
//        this.initEditorDrag()
//      })
    },
    mounted: function () {
      console.log('created editor mounted')
      console.log(window)
    },
    updated () {
      console.log('created editor updated')
      console.log(window)
//      this.$nextTick(() => {
//        this.createToolbar()
      this.createEditor()
      this.initEditor()
    },
    computed: {
      ...mapGetters({
        getCurrentNewArticle: 'getCurrentNewArticle'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentEditTitle',
        'actionSaveCurrentEditContent'
      ]),
      // 设置编辑器拖拽
      initEditor () {
        console.log('init editor value')
        this.editor.setValue(this.getCurrentNewArticle.attributes.content)
        this.editor.clearSelection()
        const drag = document.getElementById('newEditMainbar')
        drag.ondragover = function (e) {
          e.preventDefault()
        }
        drag.ondrop = (e) => {
          e.preventDefault()
          this.imgDrag(e)
        }
      },
      /*
       * create markdown editor
       */
      createEditor () {
        this.editor = window.ace.edit('newEditMainbar')
        this.editor.setTheme('ace/theme/chrome')
        this.editSession = this.editor.getSession()
        this.editSession.setMode('ace/mode/markdown')
        this.selection = this.editSession.getSelection()
        this.undoManager = this.editSession.getUndoManager()
        // editor options
//        this.editor.setOption('dragEnabled', true)
        this.editor.$blockScrolling = Infinity
        this.editor.setFontSize(20)
        this.editor.setHighlightActiveLine(true)
        // 打印的线-有必要吗？
        this.editor.setShowPrintMargin(false)
        // 不知道这是什么
//        this.editor.setShowFoldWidgets(false)
        // 自动换行
        this.editSession.setUseWrapMode(true)
//        this.editor.setShowFoldWidgets(false)
//
//        // custom markdown renderer anchor
//        this.markdownAnchor()
//
//        // custom inline style
//        this.markdownInline()
//
        // editor event
        this.editorEvent()
//
        // editor keybindings
        this.editor.setKeyboardHandler('ace/keyboard/vim')
        // 自动换行,设置为off关闭
//        this.editor.setOption('wrap', 'free')
//        this.editorKeybindings()
//
//        // insert content
//        this.editSession.setValue(content)
//
//        this.editor.focus()
      },
      /*
       * listen editor event
       */
      editorEvent () {
        // listen editor 'change' event and render markdown
        // 保存本地，并且传送到leancloud，修改articles数据，并且保存。
        this.editSession.on('change', debounce(() => {
          const content = this.editSession.getValue()
          const contentData = {
            articleid: this.getCurrentNewArticle.id,
            articlecontent: content
          }
          this.actionSaveCurrentEditContent(contentData)
//          console.log(content)
//          this.slugCache = {}
//          this.tableOfContent = []
//          this.lines = this.editSession.getLength()
//          this.words = content.replace(/\s*/g, '').length
//          IncrementalDOM.patch(
//            this.$refs.preview,
//            markdown.renderToIncrementalDOM(content)
//          )
        }, 1000))
      },
      // undo 和redo
      redo () {
        if (this.undoManager.hasRedo()) {
          this.undoManager.redo()
          this.editor.clearSelection()
        }
      },
      undo () {
        if (this.undoManager.hasUndo()) {
          this.undoManager.undo()
        }
      },
      /* clear editor content */
      clear () {
        this.editSession.setValue('')
        this.undoManager.reset()
        this.editor.focus()
      },
      imgDrag: function (event) {
        // 获取文件列表
        event.preventDefault()
        const fileList = event.dataTransfer.files
        // 先判断里面有没有图片
        let hasImage = false
        hasImage = imgDrag.hasImage(fileList)
        if (fileList.length > 0 && hasImage) {
          this.isLoading = true
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
            for (var i = 0; i < data.length; i++) {
              console.log(data[i].attributes.images.attributes.url)
              console.log(data[i].attributes.images.attributes.name)
              const addurl = '![' + data[i].attributes.images.attributes.name + '](' + data[i].attributes.images.attributes.url + ')' + '\n'
//            this.text += addurl
              console.log(this.editor.getValue())
              this.editor.setValue(this.editor.getValue() + addurl)
//          this.text += addurl
            }
            this.editor.clearSelection()
            this.isLoading = false
          }, (error) => {
            console.log(error)
            console.log('出了什么错误')
            this.isLoading = false
          })
        } else {
          // 提示消息说，里面没有图片
          this.isDragHasImage = true
        }
      },
      // 这个是当元素在目标上面的时候
      handleDragover: function (event) {
        event.preventDefault()
        console.log('aslkdfj aksdfj k')
      },
      // 这个是元素在目标上面鼠标离开的时候
      handleDragleave (e) {
        e.preventDefault()
      },
      // 处理图片从粘贴板上粘贴
      imgPaste: function (event) {
        console.log(event)
        this.isLoading = true
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
          this.editor.setValue(this.editor.getValue() + addurl)
          this.isLoading = false
          this.editor.clearSelection()
        }, function (error) {
          console.log(error)
          console.log('出了什么错误')
        })
      },
      editAndSaveTitle: debounce(function (editedValue) {
        // 一份是保存leancloud，一份是保存本地
        console.log(editedValue)
        console.log(this.getCurrentNewArticle.id)
        const titleData = {
          articleid: this.getCurrentNewArticle.id,
          articletitle: editedValue
        }
        this.actionSaveCurrentEditTitle(titleData)
      }, 300)
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
