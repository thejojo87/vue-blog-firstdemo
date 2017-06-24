<template>
<div id="blog">
  <mainbar></mainbar>
  <sidebar></sidebar>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import sidebar from '@/components/blog/sidebar'
  import Mainbar from '../components/blog/mainbar'

  export default {
    name: 'Blog',
    components: {
      Mainbar,
      sidebar
    },
    data () {
      return {
//        articles: []
      }
    },
    computed: {
      ...mapGetters({

      })
    },
    methods: {
      ...mapActions([])
    }
  }
</script>

<style>
  #blog {
    display: flex;
    width: calc(100% - 320px)
  }



</style>
