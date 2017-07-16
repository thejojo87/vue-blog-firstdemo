<template>
<div v-html="getMarkdown"  class="markdown-body" >

</div>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'newEditBarPreview',
    data () {
      return {
        markdown: ''
      }
    },
    watch: {
      getScrollRatio: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        // 不知道是什么
//        console.log(this.$refs.preview.scrollHeight)
//        // 实际高度
//        console.log(this.$refs.preview.offsetHeight)
//        // 可见高度
//        console.log(this.$refs.preview.clientHeight)
//        // 滚动的长度
//        console.log(this.$refs.preview.scrollTop)
//        console.log(this.$refs.preview)
//        var old = document.getElementById('markdown_preview')
//        console.log(old.scrollHeight)
//        console.log(old.offsetTop)
//        old.offsetTop = 1000
//        old.scrollLeft = 1000
//        old.scrollTop = 300
//        old.scrollTop = 400
//        const calScrollTop = (this.$refs.preview.scrollHeight) * val
//        console.log(calScrollTop)
//        this.$refs.preview.scrollTop = calScrollTop
//        console.log(this.$refs.preview.scrollTop)
      }
    },
    computed: {
      ...mapGetters({
        getMarkdown: 'getMarkdown',
        getScrollRatio: 'getScrollRatio'
      })
    },
    methods: {
      ...mapActions([])
    }
  }
</script>

<style>


</style>
