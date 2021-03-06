import VueRouter from 'vue-router'
import ContentHome from './components/ContentHome.vue'
import ListArticle from './components/ListArticle.vue'
import DetailArticle from './components/DetailArticle.vue'
import NewArticle from './components/NewArticle.vue'
import VueTest from './components/VueTest.vue'

export default new VueRouter({
  linkActiveClass: 'myActive',
  routes: [
    {
      path: '/',
      component: ContentHome
    },
    {
      path: '/testPage',
      component: VueTest
    },
    {
      path: '/article',
      component: ListArticle
    },

    {
      name:'article-detail',
      path: '/article/detail/:id',
      component: DetailArticle
    },
    {
      path: '/article/new',
      component: NewArticle
    }

  ]
})