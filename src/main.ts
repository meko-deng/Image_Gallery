import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store/modal_store'
import './assets/app.css'

axios.defaults.baseURL = 'https://api.instagram.com'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
