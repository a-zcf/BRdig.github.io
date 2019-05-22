import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import router from './router/index'
import App from './App'
import store from './store/store'
import bus from './utils/bus'
import i18n from './lang'
import './utils/rem'
import './intercept'
import './assets/icon/iconfont.css'
import MescrollVue from 'mescroll.js/mescroll'
import { getRequest } from './utils/request'
import { postRequest } from './utils/request'
import { deleteRequest } from './utils/request'
import { putRequest } from './utils/request'
import { floatAdd } from './utils/calculate'
import { floatSub } from './utils/calculate'
import { floatMul } from './utils/calculate'
import { floatDiv } from './utils/calculate'
import { presdNum,pureNum } from './utils/common'
import { copy } from './utils/copy'
import VueCropper from 'vue-cropperjs';

Vue.use(Vuex)

import {
  XInput,
  XHeader,
  ViewBox,
  Tabbar,
  TabbarItem,
  Tab,
  TabItem,
  XButton,
  Qrcode,
  Flexbox,
  FlexboxItem,
  Popup,
  TransferDom,
  Badge,
  PopupPicker,
  Group,
  Cell,
  Sticky,
  XTextarea,
  Flow,
  FlowState,
  FlowLine,
  XSwitch,
  Confirm,
  ToastPlugin,
  Toast,
  LoadingPlugin,
  Previewer,
  Picker,
  PopupHeader,
  Radio,
  XDialog
} from 'vux'
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.component('mescroll-vue', MescrollVue);
Vue.directive('transfer-dom', TransferDom);
Vue.component('x-input', XInput);
Vue.component('x-header', XHeader);
Vue.component('view-box', ViewBox);
Vue.component('tabbar', Tabbar);
Vue.component('tabbar-item', TabbarItem);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('flexbox', Flexbox);
Vue.component('flexbox-item', FlexboxItem);
Vue.component('x-button', XButton);
Vue.component('popup', Popup);
Vue.component('qrcode', Qrcode);
Vue.component('badge', Badge);
Vue.component('popup-picker', PopupPicker,);
Vue.component('group', Group,);
Vue.component('cell', Cell,);
Vue.component('sticky', Sticky);
Vue.component('x-textarea', XTextarea);
Vue.component('flow', Flow);
Vue.component('flow-state', FlowState);
Vue.component('flow-line', FlowLine);
Vue.component('x-switch', XSwitch);
Vue.component('confirm', Confirm);
Vue.component('previewer', Previewer);
Vue.component('picker', Picker);
Vue.component('popup-header', PopupHeader);
Vue.component('radio', Radio);
Vue.component('x-dialog', XDialog);
Vue.component('toast', Toast);
Vue.component('vue-cropper', VueCropper);

FastClick.attach(document.body);
Vue.config.productionTip = false;

Vue.config.productionTip = false;
Vue.prototype.$getRequest = getRequest;  //get请求
Vue.prototype.$postRequest = postRequest;  //post请求
Vue.prototype.$deleteRequest = deleteRequest;
Vue.prototype.$putRequest = putRequest;
Vue.prototype.$presdNum = presdNum;
Vue.prototype.$floatAdd = floatAdd;
Vue.prototype.$floatSub = floatSub;
Vue.prototype.$floatMul = floatMul;
Vue.prototype.$floatDiv = floatDiv;
Vue.prototype.$pureNum = pureNum;
Vue.prototype.$copy = copy;
Vue.prototype.$bus = bus;

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  // created () {},
  render: h => h(App)
}).$mount('#app-box')
