import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: '',
    token: null,
    lang: '',
    langAfter: '',
    versionName:'',
    currentWebVersion:'',
  },
  mutations: {
    [types.USER]: (state, data) => {
      console.log(state, data)
      localStorage.user = data;
      state.user = data;
    },
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.LANG]: (state, data) => {
      localStorage.lang = data;
      state.lang = data;
    },
    [types.lANGAFTER]: (state, data) => {
      localStorage.langAfter = data;
      state.langAfter = data;
    },
    [types.VersionName]: (state, data) => {
      localStorage.langAfter = data;
      state.versionName = data;
    },
    [types.CurrentWebVersion]: (state, data) => {
      localStorage.langAfter = data;
      state.currentWebVersion = data;
    },
    [types.ErrorCode]: (state, data) => {
      localStorage.langAfter = data;
      state.errorCode = data;
    },
  }
})
