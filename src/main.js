import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'jquery'
import 'popper.js'
import './assets/app.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

