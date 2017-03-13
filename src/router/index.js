import Vue from 'vue'
import Router from 'vue-router'
import Poll from '@/components/Poll'
import pollDetails from '@/components/pollDetails'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Poll
    },
    {
      path: '/poll/:id',
      component: pollDetails
    },
    {
      path: '/about',
      component: About
    },
  ]
})
