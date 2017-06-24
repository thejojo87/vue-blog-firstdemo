import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TimelinePage from '@/pages/Timeline'
import Blog from '@/pages/Blog'
import BlogArticle from '@/pages/BlogArticle'

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
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/blog/articles/:id',
      name: 'BlogArticle',
      component: BlogArticle
    }
  ]
})
