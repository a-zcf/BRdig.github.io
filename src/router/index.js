import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import ('@/views/home/home');

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/home', name: 'home', component: Home, children: [{path: '/home', component: Home}]},

  ]
})
