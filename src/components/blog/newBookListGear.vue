<template>
  <Poptip id="gear_poptip" v-model="visible" placement="bottom-end" width="160">
    <Icon id="gear" type="gear-b"  size="18" color="#a0a0a0" ></Icon>
    <div class="gear_title" slot="title">
      <Icon class="gear_title_icon" type="ios-compose-outline" size="18"></Icon>
      <i class="gear_title_i">修改文集名</i>
    </div>
    <div id="gear_content" slot="content" class="gear_content">
      <Icon id="gear_content_icon" class="gear_content_icon" type="ios-trash-outline" size="18"/>
      <i id="gear_content_i" class="gear_title_i" @click="close">删除文集</i>
    </div>
  </Poptip>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'newBookListGear',
    data () {
      return {
        visible: false
      }
    },
    computed: {
      ...mapGetters({})
    },
    methods: {
      ...mapActions([]),
      close () {
        this.visible = false
      }
    }
  }
</script>

<style>
  #gear_poptip {
    margin-left: 40px;
  }
  #gear{
    margin-left: -40px
  }
  .ivu-poptip-body {
    padding: 8px 0;
  }
  .gear_title {
    margin-left: -16px;
    width: 160px;
    display: flex;
    align-items: flex-end;
    padding: 3px 0;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #3f3f3f;
    white-space: nowrap;
    font-size: 14px;
    font-family: "Microsoft YaHei"
  }
  .gear_content {
    /*margin-left: -16px;*/
    width: 160px;
    overflow: visible;
    overflow-x: hidden;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #3f3f3f;
    white-space: nowrap;
    font-size: 14px;
    font-family: "Microsoft YaHei"
    /*margin: 0;*/
    /*padding: 3px 0;*/
  }
  .gear_content_icon{
    margin-left: -47px;
  }
  .gear_title:hover, .gear_content:hover {
    color: white;
    background-color: #4f4f4f;
    /*background-size: 160px;*/
    /*width: 160px;*/
    /*mar*/
  }
  /*#gear_title_icon:hover {*/
    /*color: #d5d5d5;*/
  /*}*/
  .gear_title_icon {
    margin-left: 20px;
  }
  .gear_title_i, .gear_content_i{
    font-style: normal;
    margin-left: 3px;
  }

</style>
