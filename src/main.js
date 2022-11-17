import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastclick from 'fastclick'
//import VueLazyload from 'node_modules/vue-lazyload/types/index'

import toast from 'components/common/toast'

Vue.config.productionTip = false


Vue.prototype.$bus = new Vue()

//安转toast插件
Vue.use(toast)

//解决移动端300ms延迟
fastclick.attach(document.body)

//使用懒加载----------->需将src改成v-lazy
//Vue.use(VueLazyload)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
