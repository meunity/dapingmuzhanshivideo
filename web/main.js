
import Vue from 'vue'
import App from './App'

require('../static/js/lib.js');
// import '../static/js/leaflet/leaflet.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)  

import Vuebar from 'vuebar';
Vue.use(Vuebar);
import router from './router'
import {
  store
} from './stash/index'

Vue.config.productionTip = false
window.App = new Vue({
  el: '#app',
  template: '<App/>',
  router,
  data: {
    store
  },
  components: {
    App
  }
})
