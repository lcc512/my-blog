import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)

new Vue({
  components: {
    App
  },
  template: '<App />',
  router
}).$mount('#app')