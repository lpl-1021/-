import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import "./assets/fonts/iconfont.css"
import http from './network/index'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
