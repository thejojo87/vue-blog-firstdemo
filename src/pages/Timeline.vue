<template>
  <div>
        <p class="lead">
          每天看的，并觉得值得分享的，保留的文章
        </p>
    <!--这里要开始渲染了-->
    <Timeline >
      <Timeline-item v-for="(days, index) in this.getTimelineDates" :key="index">
        <p class="time">{{index}}</p>
        <timelinetitles :days="days"></timelinetitles>
      </Timeline-item>
    </Timeline>

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
        readTimelineDate: []
      }
    },
    created: function () {
      // 这里初始化timeline数据-av里获取，获取并且输入到state里
//      this.actionGetTimelineDates()
//      console.log(this.getCurrentUser.id)
//      this.actionGetTimelineDates(this.getCurrentUser.id)
    },
    watch: {
      getCurrentUser: function (val, oldVal) {
//        this.actionGetTimelineDates(val.id)
      },
      getTimelineDates: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        this.readTimelineDate = val
      },
      getTimelineTimes: function (val, oldVal) {
        console.log('new: %s, old: %s', val, oldVal)
        console.log(val)
        this.readTimelineTimes = val
      }
    },
    computed: {
      ...mapGetters({
        // 获取state.readTimelineDates
        getTimelineDates: 'getTimelineDates',
        getTimelineTimes: 'getTimelineTimes',
        getCurrentUser: 'getCurrentUser'
      })
    },
    methods: {
      ...mapActions([
        'actionGetTimelineDates'
      ])
    }
  }
</script>

<style>
  .ivu-timeline-item-head {
    left: 30%;
    border-color: #c7254e;
  }
  .ivu-timeline-item-tail{
    left: calc(30% + 6px);
    border-color: #c7254e;
  }
  .time {
    font-size: 20px;
    color: #c7254e;
  }
</style>
