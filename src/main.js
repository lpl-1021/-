import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import "./assets/fonts/iconfont.css"
import http from './network/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(ElementUI);
// 将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.prototype.$http = http
Vue.config.productionTip = false


Vue.component('tree-table',TreeTable)

Vue.filter('dataFormat',function(originVal){
   const dt = new Date(originVal*1000)

   const y = dt.getFullYear()
   const m = (dt.getMonth()+1+'').padStart(2,'0')
   const d = (dt.getDate()+'').padStart(2,'0')


   const hh = (dt.getHours()+'').padStart(2,'0')
   const mm = (dt.getMinutes()+'').padStart(2,'0')
   const ss = (dt.getSeconds()+'').padStart(2,'0')

   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
