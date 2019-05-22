import router from '@/router/index';
import store from '@/store/store'
import * as types from './store/types'

if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
if (!window.localStorage.getItem('lang')) {
  store.commit(types.LANG, 'tw');
  store.commit(types.lANGAFTER, 'zh-tw');
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})
