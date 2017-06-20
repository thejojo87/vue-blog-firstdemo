<template>
  <div>
  <div v-for="(articles, index_sameday) in days" :key="index_sameday">
    <p class="content"><a v-bind:href="articles.attributes.url">{{ articles.attributes.title }}</a></p>
    <div v-if="!articles.attributes.isFinished">
      <el-button type="success" icon="edit" v-on:click="change_timeline(articles)">等待阅读</el-button>
    </div>
    <div v-else>
      <el-button type="warning" icon="edit" v-on:click="change_timeline(articles)">阅读完成</el-button>
    </div>
    <el-button type="danger" icon="delete" v-on:click="delete_timeline(articles)" >删除</el-button>
    <!--这里要写上等待阅读，阅读完成，还有删除按钮-->
  </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button'
  import ElButtonGroup from '../../node_modules/element-ui/packages/button/src/button-group'
  export default {
    components: {
      ElButtonGroup,
      ElButton},
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
      ...mapActions([
        'actionDeleteTimeline',
        'actionChangeTimeline'
      ]),
      delete_timeline: function (articles) {
        console.log('开始删除了')
        console.log(articles)
        this.actionDeleteTimeline(articles)
      },
      change_timeline: function (articles) {
        console.log('开始修改阅读状态')
        this.actionChangeTimeline(articles)
      }
    }
  }
</script>

<style>
  .content{
    color: red;
    font-size: 15px;
  }
</style>
