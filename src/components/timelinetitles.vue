<template>
  <div>
  <div v-for="(articles, index_sameday) in days" :key="index_sameday">
    <p class="content">{{ index_sameday }}</p>
    <p class="content">{{ articles.attributes.title }}</p>
  </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'timelinetitles',
    props: {
      days: {}
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({})
    },
    methods: {
      ...mapActions([])
    }
  }
</script>

<style>

<!--Todo: 需要设置css-->
</style>
