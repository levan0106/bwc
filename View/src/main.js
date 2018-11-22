import Vue from 'vue'
import router from './router'
import store from '@/store/index'
import filter from './plugin/filter'
import directive from './plugin/directive'
import BwcPlugin from './plugin/plugin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'
//import VeeValidate from 'vee-validate';

// import 'vue-awesome/icons'

Vue.config.productionTip = false
Vue.use(ElementUI,{locale});
Vue.use(BwcPlugin);
//Vue.use(VeeValidate);

new Vue({
  router,
  store,
  filter,
  directive,
  render: h => h(App),
}).$mount('#app')
