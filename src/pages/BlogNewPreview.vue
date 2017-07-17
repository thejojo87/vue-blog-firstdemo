<template>
<div id="newEditPreview">
  <div id="newEditPreviewEdit" v-bind:class="{ newEditPreviewEditExpand: getIsExpandEditor }" >
    <new-edit-bar></new-edit-bar>
  </div>
  <div id="newEditPreviewView" v-bind:class="{ newEditPreviewViewExpand: getIsExpandEditor }" ref="preview" >
    <new-edit-bar-preview></new-edit-bar-preview>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import NewEditBar from '../components/blog/newEditBar'
  import NewEditBarPreview from '../components/blog/newEditBarPreview'
  export default {
    name: 'blogNewPreview',
    data () {
      return {
        previewscrollratio: 0
//        isAddBook: false,
//        newBookName: ''
      }
    },
    components: {
      NewEditBarPreview,
      NewEditBar
    },
    mounted: function () {
      this.addscrollwatching()
    },
    watch: {
      // 这是用来当editorscroll的时候同步scrollpreview的
      getScrollRatio: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        let elems = this.$refs.preview.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, pre, blockquote, hr, table')
        if (elems.length > 0) {
          this.$refs.preview.scrollTop = elems[elems.length - val].offsetTop
        }
      },
      getIsExpandEditor: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        if (val) {
          console.log('true')
        } else {
          console.log('false')
        }
      }
    },
    computed: {
      ...mapGetters({
        getScrollRatio: 'getScrollRatio',
        getIsExpandEditor: 'getIsExpandEditor'
      })
    },
    methods: {
      ...mapActions([
        'actionSavePreviewScrollRatio'
      ]),
      addscrollwatching () {
        this.$refs.preview.addEventListener('scroll', () => {
          const height = this.$refs.preview.scrollHeight - this.$refs.preview.clientHeight
          const ratio = parseFloat(this.$refs.preview.scrollTop) / height
          console.log(ratio)
          this.actionSavePreviewScrollRatio(ratio)
        })
      }
    }
  }
</script>

<style>
#newEditPreview {
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  width: 100%;
  height: 100%;
}
  #newEditPreviewEdit {
    margin-left: 0.5%;
    border-right: 1px solid #d9d9d9;
    height: 100%;
    width: 49.5%;
  }
  #newEditPreviewView {
    background-color: #f9fafb;
    text-align: left;
    width: 49.5%;
    overflow: scroll;
    font-size: 16px;
    font-weight: normal;
    line-height: 25px;
  }
  .newEditPreviewEditExpand {
    width: 99% !important;
  }
  .newEditPreviewViewExpand {
    display: none;
  }
</style>
