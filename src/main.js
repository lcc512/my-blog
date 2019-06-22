import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'


// Vue.use(ElementUI);
Vue.use(VueQuillEditor)

new Vue({
  components: {
    App
  },
  template: '<App />',
  router
}).$mount('#app')