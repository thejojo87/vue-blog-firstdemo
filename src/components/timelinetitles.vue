<template>
  <div>
  <div v-for="(articles, index_sameday) in days" :key="index_sameday">
    <p class="content"><a v-bind:href="articles.attributes.url">{{ articles.attributes.title }}</a></p>
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
  .content{
    color: red;
    font-size: 15px;
  }
</style>
