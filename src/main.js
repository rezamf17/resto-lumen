import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:3000/"
axios.defaults.headers.common['Authorization'] = 'bearer' + localStorage.getItem('token') 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
