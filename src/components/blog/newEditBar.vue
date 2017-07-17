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
      <Tooltip content="切换到预览模式" placement="top" v-if="!getIsPreview">
        <div class="toolbarImage" v-on:click="savePreviewMode(true)">
              <Icon type="ios-book" size="20"/>
        </div>
      </Tooltip>
      <Tooltip content="返回" placement="top" v-if="getIsPreview">
        <div class="toolbarImage" v-on:click="savePreviewMode(false)">
              <Icon type="ios-book" size="20"/>
        </div>
      </Tooltip>
      <Tooltip content="全屏编辑" placement="top" v-if="getIsPreview">
        <div class="toolbarImage" v-on:click="expandEditor">
          <Icon type="arrow-expand" size="20"/>
        </div>
      </Tooltip>
    </div>

    <div id="newEditMainbar"
          v-on:paste="imgPaste($event)">
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
  import markdown from '@/ext/markdown'

  export default {
    name: 'NewEditBar',
    data () {
      return {
//        isExpandEditor: false,
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
//        this.initEditor()
//      })
    },
    mounted: function () {
      console.log('created editor mounted')
      console.log(window)
      this.createEditor()
      this.initEditor()
    },
    updated () {
      console.log('created editor updated')
      if (this.editor === null) {
        this.createEditor()
        this.initEditor()
      }
    },
    watch: {
      getCurrentNewArticle: function (val, oldVal) {
        this.createEditor()
        this.initEditor()
        // 既然book变了，article变了，那么就应该改变当前的article才对。
      },
      // 当preview的scroll变化，editor也要同步变化
      getPreviewScrollRatio: function (val, oldVal) {
        // Todo: 高度计算好像有点不对劲，还有保留两者不同步或许也蛮好
//        const clientHeight = document.querySelector('.ace_scroller').clientHeight
//        const lineHeight = this.editor.renderer.lineHeight
//        const scrollTop = (this.editSession.getScreenLength() * lineHeight - clientHeight) * val
//        if (scrollTop > 0) {
//          this.editSession.setScrollTop(scrollTop)
//        }
      },
      getIsExpandEditor: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        if (val) {
          console.log('true')
        } else {
          console.log('false')
        }
        this.editor.resize()
      }
    },
    computed: {
      ...mapGetters({
        getCurrentNewArticle: 'getCurrentNewArticle',
        getIsPreview: 'getIsPreview',
        getPreviewScrollRatio: 'getPreviewScrollRatio',
        getIsExpandEditor: 'getIsExpandEditor'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentEditTitle',
        'actionSaveCurrentEditContent',
        'actionSavePreviewMode',
        'actionSaveIsBackFromViewMode',
        'actionSaveCurrentEditContentPreview',
        'actionSaveScrollRatio',
        'actionSaveEditorExpandMode'
      ]),
      // 编辑器全屏模式
      expandEditor () {
        this.actionSaveEditorExpandMode(!this.getIsExpandEditor)
      },
      // 设置表示进入preview模式
      savePreviewMode (isPreviewMode) {
        this.actionSavePreviewMode(isPreviewMode)
        const router = this.$router
        if (!isPreviewMode) {
          router.push({ name: 'BlogNew' })
        } else {
          // 为了返回的时候能和进入newedit的时候有所区别
          this.actionSaveIsBackFromViewMode(true)
          router.push({ name: 'BlogNewPreview' })
        }
      },
      // 设置编辑器拖拽
      initEditor () {
//        this.editor.session.setValue()
//        this.editSession.setValue()
        this.editor.getSession().setValue(this.getCurrentNewArticle.attributes.content)
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
        this.editSession.on('change', () => {
          const content = this.editSession.getValue()
          // 这个判断的目的是当切换article的时候别无谓的保存。
          if (content !== this.getCurrentNewArticle.attributes.content) {
            const contentData = {
              articleid: this.getCurrentNewArticle.id,
              articlecontent: content
            }
            this.actionSaveCurrentEditContent(contentData, debounce(() => {
            }), 300)
          }
          // 这里要做的是，渲染，并且保存到store里
          const markdownPreview = markdown.render(content)
          this.actionSaveCurrentEditContentPreview(markdownPreview)
        })
        // 当editbarscroll的时候，同步滑动preview
//        const clientHeight = document.querySelector('.ace_scroller').clientHeight
        this.editSession.on('changeScrollTop', (scrollTop) => {
          var firstline = this.editor.getFirstVisibleRow() + 5
          var lastline = this.editSession.getLength()
//          const range = new Range(3, 0, 1, 0)
          const range = {
            start: {
              row: firstline,
              column: 0
            },
            end: {
              row: lastline,
              column: 0
            }
          }
//          const selectionRange = this.editor.getSelectionRange(range)
//          const content = this.editSession.getTextRange(selectionRange)
          const content = this.editSession.getTextRange(range)
          var bbb = markdown.render(content)
          // 是不是新建一个dom元素？
          var para = document.createElement('div')
          para.innerHTML = bbb
          let value = para.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, pre, blockquote, hr, table')
          console.log(value.length)
//          const lineHeight = this.editor.renderer.lineHeight
//          const height = this.editSession.getScreenLength() * lineHeight - clientHeight
//          const ratio = parseFloat(scrollTop) / height
          this.actionSaveScrollRatio(value.length)
        })
      },
      _moveCursor (row, column) {
        this.editor.moveCursorTo(row, column)
        this.editor.focus()
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
            let urltoinsert = ''
            for (var i = 0; i < data.length; i++) {
              const addurl = '![' + data[i].attributes.images.attributes.name + '](' + data[i].attributes.images.attributes.url + ')' + '\n'
              urltoinsert += addurl
//              this.editor.setValue(this.editor.getValue() + addurl)
            }
            console.log(urltoinsert)
            const selection = this.selection
            if (!selection.isEmpty()) {
              const range = selection.getRange()
              this.editSession.replace(range, urltoinsert)
              const { row, column } = selection.getSelectionAnchor()
              selection.clearSelection()
              this._moveCursor(row + 1, column)
              this.isLoading = false
              return
            }
            this.editor.insert(urltoinsert)
            this.editor.focus()
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
      },
      // 这个是元素在目标上面鼠标离开的时候
      handleDragleave (e) {
        e.preventDefault()
      },
      // 处理图片从粘贴板上粘贴
      imgPaste: function (event) {
        console.log(event)
        if (!imgPaste.isImage(event.clipboardData.items)) {
        } else {
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
            const addurl = '![' + data.name + '](' + data.url + ')'
            console.log(addurl)
            const selection = this.selection
            if (!selection.isEmpty()) {
              const range = selection.getRange()
              this.editSession.replace(range, addurl)
              const { row, column } = selection.getSelectionAnchor()
              selection.clearSelection()
              this._moveCursor(row + 1, column)
              this.isLoading = false
              return
            }
            this.editor.insert(addurl)
            this.editor.focus()
            this.isLoading = false
          }, function (error) {
            console.log(error)
            console.log('出了什么错误')
          })
        }
      },
      editAndSaveTitle: debounce(function (editedValue) {
        // 一份是保存leancloud，一份是保存本地
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
