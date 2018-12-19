import Vue from 'vue'




import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
     
      { path: '/overview', component: require('../../customs/shaoxing/views/overview') },
      { path: '/', component: require('../../customs/shaoxing/views/overview') },
     
  ]
})
