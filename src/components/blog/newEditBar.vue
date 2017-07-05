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


  </div>
    <div id="newEditBackground" v-else="">
      <span>简&nbsp;书</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'NewEditBar',
    computed: {
      ...mapGetters({
        getCurrentNewArticle: 'getCurrentNewArticle'
      })
    },
    methods: {
      ...mapActions([
        'actionSaveCurrentEditTitle'
      ]),
      editAndSaveTitle: function (editedValue) {
        // 一份是保存leancloud，一份是保存本地
        console.log(editedValue)
        console.log(this.getCurrentNewArticle.id)
        const titleData = {
          articleid: this.getCurrentNewArticle.id,
          articletitle: editedValue
        }
        this.actionSaveCurrentEditTitle(titleData)
//        this.editTitle(editedValue)
//        this.saveToLeancloudTitle(editedValue)
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


  .ivu-tooltip-inner {
     max-width: 500px !important;
  }

  .toolbarImage:hover {
    background-color: #555555;
    color: white;
    text-decoration: inherit;
  }
</style>
