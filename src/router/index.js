import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import TimelinePage from '@/pages/Timeline'
import Blog from '@/pages/Blog'
import BlogArticle from '@/pages/BlogArticle'
import BlogNew from '@/pages/BlogNew'
import BlogNewPreview from '@/pages/BlogNewPreview'

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
    },
    {
      path: '/blog/new',
      name: 'BlogNew',
      component: BlogNew
    },
    {
      path: '/blog/new/preview',
      name: 'BlogNewPreview',
      component: BlogNewPreview
    }
  ]
})
