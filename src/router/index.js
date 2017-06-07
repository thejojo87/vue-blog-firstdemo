import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TimelinePage from '@/pages/Timeline'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/timeline',
      name: 'TimelinePage',
      component: TimelinePage
    }
  ]
})
