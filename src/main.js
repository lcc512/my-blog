import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import VueQuillEditor from 'vue-quill-editor'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// Vue.use(VueQuillEditor)

new Vue({
  components: {
    App
  },
  template: '<App />',
  router
}).$mount('#app')