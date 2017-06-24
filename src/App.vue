<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
export default {
  name: 'app',
  components: {
    navbar
  },
  created: function () {
    // `this` 指向 vm 实例
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*display: flex;*/
  /*flex-wrap: nowrap;*/
  /*flex-direction: column;*/
  /*justify-content: space-between;*/
  /*margin-top: 60px;*/
}
</style>
