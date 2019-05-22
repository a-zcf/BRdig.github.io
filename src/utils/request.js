import axios from 'axios'
import Api from '../api/api'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router/index'
import Vue from 'vue'

axios.defaults.withCredentials=true;
/*axios.interceptors.request.use(config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config
  },
  err => {
    this.$vux.loading.show({text: '出错了'})
    return Promise.resolve(err)
});*/

axios.interceptors.response.use(
  response => {
    if (response.data.code == 10 || response.data.code == 22 || response.data.code == 210061 || response.data.code == 210060|| response.data.code == 810004 || response.data.code == 400067 || response.data.code == 210038) {
      store.commit(types.LOGOUT)
      router.currentRoute.path !== '/login' &&
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.path },
      });
      if(response.data.code == 810004){
        Vue.$vux.toast.show({text:'该账号已在其他设备登录，您被迫下线', type: 'text',width:"20em"});
      }
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== '/login' &&
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.path },
          });
        case 500:
          Vue.$vux.toast.show({text:'服务器异常!', type: 'warn'});
      }
    }
    return Promise.reject(error.response.data)
  },
)

let base = Api.base;

export const postRequest = (url, params,api) => {
  const Token = store.state.token
  let base = (api==undefined)?Api.base:api
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Authorization' : 'token '+Token,
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/json',
      'X-TOKEN': Token,
    }
  });
}

export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}
export const getRequest = (url,params,api,withHeader) => {
  let base = (api==undefined)?Api.base:api
  const Token = store.state.token
  if(withHeader!=undefined){
    axios.defaults.withCredentials=false;
  }
  let headers = (withHeader!=undefined)?{
    'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'application/json',
  }:{
    'Authorization' : 'token '+Token,
    'Content-Type': 'application/x-www-form-urlencoded',
    //'Content-Type': 'application/json',
    'X-TOKEN': Token,
    'X-DEVICE':XDevice,
  }
  return axios({
    method: "get",
    url: `${base}${url}`,
    params: params,
    headers: headers
  });
}
