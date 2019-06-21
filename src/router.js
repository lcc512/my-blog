import VueRouter from 'vue-router'
import ContentHome from './components/ContentHome.vue'

export default new VueRouter({
  linkActiveClass:'myActive',
  routes: [
    {
      path:'/',
      component:ContentHome
    }

  ]
})