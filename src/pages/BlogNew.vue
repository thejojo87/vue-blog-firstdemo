<template>
<div id="blog_new">
  <new-book-bar></new-book-bar>
  <new-article-bar></new-article-bar>
  <new-edit-bar></new-edit-bar>
</div>
</template>

<script>
  import newBookBar from '@/components/blog/newBookBar'
  import newArticleBar from '@/components/blog/newArticleBar'
  import { mapGetters, mapActions } from 'vuex'
  import NewEditBar from '../components/blog/newEditBar'
  export default {
    name: 'BlogNew',
    components: {
      newBookBar,
      newArticleBar,
      NewEditBar
    },
    computed: {
      ...mapGetters({})
    },
    methods: {
      ...mapActions([])
    }
  }
</script>

<style lang="sass" scoped>
  #blog_new
    display: flex
    height: 100%
    background-color: #f0ad4e
</style>
