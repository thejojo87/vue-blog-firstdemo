// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'   // 使用 CSS
// element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import plugin from './ext/vue_ext'

Vue.use(require('vue-moment'))
Vue.use(iView)
Vue.use(ElementUI)
Vue.use(plugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
