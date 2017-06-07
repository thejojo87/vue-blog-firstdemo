<template>
  <div>
    <!--<div class="row">-->
      <!--<div class="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 text-center">-->
        <p class="lead">
          每天看的，并觉得值得分享的，保留的文章
        </p>
    <!--<div class="row">-->
      <!--<div class="col-sm-6" id="timeline-main">-->
        <!--<div v-for="(article, index) in this.readTimelineDate">-->
          <!--<div v-if="index%2===0" class="col-sm-3 col-md-push-3" style="text-align:left">-->
            <!--<h2>{{ article.createdAt | moment("YYYY-MM-DD") }}</h2>-->
            <!--<p>晴转雨</p>-->
          <!--</div>-->

          <!--<div v-else class="col-sm-3">-->
            <!--<h2>{{ article.createdAt | moment("YYYY-MM-DD") }}</h2>-->
            <!--<p>晴转雨</p>-->
          <!--</div>-->

          <!--<div class="middle">-->
            <!--&lt;!&ndash;<i class="glyphicon {{ index%2 === 0?'glyphicon-hand-left':'glyphicon-hand-right' }}"></i>&ndash;&gt;-->
            <!--<i v-bind:class="[glyphicon, glyphicon-hand-left]"></i>-->
            <!--<div class="vertical-line"></div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--这里要开始渲染了-->
    <Timeline v-for="(days, index) in this.readTimelineDate" :key="index">
      <!--<Timeline-item v-for="(articles, index_sameday) in days">-->
        <!--<p class="time">{{days}}</p>-->
      <!--<P>4</P>-->
      <Timeline-item>
      <!--<P>5</P>-->
      <p class="time">{{index}}</p>
      <timelinetitles :days="days"></timelinetitles>
        <!--<p class="time">{{articles}}</p>-->
        <!--<p class="time">{{articles.url}}</p>-->
        <!--<p class="time">{{articles.title}}</p>-->
        <!--<p class="content">Apple I 问世</p>-->
      </Timeline-item>
    </Timeline>
    <!--<Timeline>-->
      <!--<Timeline-item color="green">发布1.0版本-->
        <!--<p class="time">1976年</p>-->
        <!--<p class="content">Apple I 问世</p>-->
      <!--</Timeline-item>-->
      <!--<Timeline-item color="green">发布2.0版本</Timeline-item>-->
      <!--<Timeline-item color="red">严重故障</Timeline-item>-->
      <!--<Timeline-item color="blue">发布3.0版本</Timeline-item>-->
    <!--</Timeline>-->
    <!--<Timeline>-->
      <!--<Timeline-item>-->
        <!--<p class="time">1976年</p>-->
        <!--<p class="content">Apple I 问世</p>-->
      <!--</Timeline-item>-->
      <!--<Timeline-item>-->
        <!--<p class="time">1984年</p>-->
        <!--<p class="content">发布 Macintosh</p>-->
      <!--</Timeline-item>-->
      <!--<Timeline-item>-->
        <!--<p class="time">2007年</p>-->
        <!--<p class="content">发布 iPhone</p>-->
      <!--</Timeline-item>-->
      <!--<Timeline-item>-->
        <!--<p class="time">2010年</p>-->
        <!--<p class="content">发布 iPad</p>-->
      <!--</Timeline-item>-->
      <!--<Timeline-item>-->
        <!--<p class="time">2011年10月5日</p>-->
        <!--<p class="content">史蒂夫·乔布斯去世</p>-->
      <!--</Timeline-item>-->
    <!--</Timeline>-->
  <!--<el-button @click="show">按钮</el-button>-->
  <!--<el-dialog v-model="visible" title="Hello world">-->
    <!--<p>欢迎使用 Element</p>-->
  <!--</el-dialog>-->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import timelinetitles from '@/components/timelinetitles'
  //  import getReadInfos from '@/service/article'

  export default {
    name: 'TimelinePage',
    components: {
      timelinetitles
    },
    data () {
      return {
        visible: false,
        readTimelineDate: []
      }
    },
    created: function () {
      // 这里初始化timeline数据-av里获取，获取并且输入到state里
      this.actionGetTimelineDates()
    },
    watch: {
      getTimelineDates: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        this.readTimelineDate = val
        console.log(this.readTimelineDate)
      },
      getTimelineTimes: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        this.readTimelineTimes = val
        console.log(this.readTimelineTimes)
      }
    },
    computed: {
      ...mapGetters({
        // 获取state.readTimelineDates
        getTimelineDates: 'getTimelineDates',
        getTimelineTimes: 'getTimelineTimes'
      })
    },
    methods: {
      ...mapActions([
        'actionGetTimelineDates'
      ]),
      show: function () {
        this.visible = true
        console.log(this.readTimelineDate)
        console.log(this.visible)
      }
    }
  }
</script>

<style>
#timeline-main {
  /*text-align: ;*/
}

</style>
