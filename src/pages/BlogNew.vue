<template>
<div id="blog_new">
  <new-book-bar></new-book-bar>
  这里是blogNew
</div>
</template>

<script>
  import newBookBar from '@/components/blog/newBookBar'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'BlogNew',
    components: {
      newBookBar
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
    /*flex: 1*/
    background-color: #f0ad4e


</style>
