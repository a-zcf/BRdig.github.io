<template>
  <div id="app">
    <div id="Mask"></div>
    <div id="iphonex-helper-body" ref="bottom" @touchend="handleTouchEnd">
      <div id="iphonex-helper-body-bottom" ref="box">
        <transition :name="transitionName">
          <router-view class="child-view"></router-view>
        </transition>
        <tabbar slot="bottom" v-show="tabbarshow">
          <tabbar-item :link="{path:'/'}" :selected="$route.path==='/'||$route.path==='/home'">
            <i slot="icon" class="iconfont icon-shouzhimingxicaifuqianbao"></i>
            <span slot="label">钱包</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/quotation'}" :selected="$route.path==='/quotation'">
            <i slot="icon" class="iconfont icon-hangqing"></i>
            <span slot="label">行情</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/c2cTrading'}" :selected="$route.path==='/c2cTrading'">
            <i slot="icon" class="iconfont icon-jiaoyi"></i>
            <span slot="label">交易</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/my'}" :selected="$route.path==='/my'">
            <i slot="icon" class="iconfont icon-icon_wode_m"></i>
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>
        <!--跳转弹窗-->
        <div v-show="show" id="device" class="version">
          <div class="version_box">
            <p>检测到app有新版本，请点击按钮跳转到下载页面。</p>
            <div class="version_btn">
              <x-button type="primary" ref="btnNext" @click.native='onConfirm'>去下载</x-button>
            </div>
          </div>
        </div>
        <!--热更新弹窗-->
        <div v-show="show2" id="doUpdate" class="version">
          <div class="version_box">
            <p>检测到app有新版本，请点击按钮进行更新。</p>
            <div class="version_btn">
              <x-button type="primary" ref="btnNext" @click.native='onConfirm2'>立即更新</x-button>
            </div>
          </div>
        </div>
        <!--更新中页面-->
        <div id="Loading" class="Loading">
          <div class="Loading_box">
            <img src="./assets/img/loading.gif"/>
            <p>更新中...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import update from './utils/update'
  import {mapState} from 'vuex'
  import {} from "./api/api";

  export default {
    name: 'app',
    data () {
      return {
        show:true,
        show2:true,
        transitionName: 'slide-left',
      }
    },
    watch: {
      '$route'(to, from) {
        if(to.path=='/'||to.path=='/home'||to.path=='/quotation'||to.path=='/c2cTrading'||to.path=='/my'){
          this.tabbarshow=true;
        }else {
          this.tabbarshow=false;
        }
        let routersArr = sessionStorage.getItem('routers') && sessionStorage.getItem('routers').split(',') || [];
        if (routersArr.length == 0) {
          routersArr.push(from.path)
          routersArr.push(to.path);
        } else {
          if (routersArr.indexOf(to.path) != -1) {
            this.transitionName = 'slide-right'
            routersArr.splice(routersArr.indexOf(to.path) + 1, 100)
          } else {
            this.transitionName = 'slide-left';
            routersArr.push(to.path)
          }
        }
        sessionStorage.setItem('routers', routersArr.join(','));
        if(to.path=='/login'||to.path=='/'||to.path=='/home'||to.path=='/quotation'||to.path=='/c2cTrading'||to.path=='/my'){
          update.checkUpdate();
        }
      },
    },
    mounted() {
      window.addEventListener('native.keyboardshow', this.keyboardShowHandler);
      window.addEventListener('native.keyboardhide', this.keyboardHideHandler);
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      }),
    },
    methods: {
      onConfirm(){
        this.show=false;
        window.location.href="https://91apt.cn/m5l5h1";
      },
      onConfirm2(){
        this.show2=false;
        update.doUpdate();
      },
      handleTouchEnd(e) {
        this.end = e.changedTouches[0].pageY - 100;
      },
      keyboardShowHandler(e) {
        const that = this;
        const height = that.$refs.bottom.clientHeight;
        const vux_view_box_body = document.getElementById('vux_view_box_body');
        let end = that.end;
        const Mask = document.getElementById('Mask');
        Mask.style.setProperty('display', 'block', 'important');
        setTimeout(() => {
          if((height - e.keyboardHeight)>end){
            that.$refs.box.style.height = (height - e.keyboardHeight) + 'px';
            vux_view_box_body.scrollTop = end;
            console.log('屏幕高度', that.$refs.bottom.clientHeight,'屏幕宽度', that.$refs.bottom.clientWidth, '距离顶部', vux_view_box_body.scrollTop, '偏移', end, '时间');
          }
        }, 100);
      },
      keyboardHideHandler(e) {
        const that = this;
        setTimeout(() => {
          that.$refs.box.style.height = '100%';
          vux_view_box_body.scrollTop = 0;
          const Mask = document.getElementById('Mask');
          Mask.style.setProperty('display', 'none', 'important');
          console.log('键盘关闭');
        }, 100);
      }
    },
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';
  @import './styles/index.less';

  #device,#doUpdate,#Loading{ display: none;}
  @-webkit-keyframes fadenum{
    0%{opacity: 0;}
    100%{opacity: 1;}
  }
  @-webkit-keyframes fadenum2{
    0%{opacity: 1;}
    100%{opacity: 0;}
  }
  .child-view {
    will-change: transform;
    transition: all 0.4s cubic-bezier(0.55,0,0.1,1);
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
    box-sizing: border-box
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(20%, 0, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate3d(-20%, 0, 0);}
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    background-color: @backgroundColor;
    font-weight: 400;
    font-size: 14px;color: @secondaryColor;
    font-family: Helvetica,sans-serif;
    #app {
      height: 100%;
      position: relative;
      #Mask {
        width: 100%;
        height: 23PX;
        background: @Darkbrown;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        display: none;
      }
      #iphonex-helper-body {
        height: 100%;
        //padding: 0 0 20px 0 !important;
        box-sizing: border-box !important;
        .vux-header {
          padding-top: 23PX;
          .vux-header-right,
          .vux-header-left {top: 34px;}
        }
        #vux_view_box_body {
          padding-top: 65PX !important;
        }
        #iphonex-helper-body-bottom {
          height: 100%;
          box-sizing: border-box !important;
          position: relative !important;
        }
      }
    }
    //异型屏要再多加一点头部
    @media screen and (max-aspect-ratio: 18/9) {
      #app {
        #Mask {
          width: 100%;
          height: 33PX;
          background: @Darkbrown;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 999;
          display: none;}
        #iphonex-helper-body {
          height: 100%;
          box-sizing: border-box !important;
          .vux-header {
            padding-top: 33PX;
            .vux-header-right, .vux-header-left {
              top: 44PX;
            }
          }

          #vux_view_box_body {
            padding-top: 76PX !important;
          }

          #iphonex-helper-body-bottom {
            box-sizing: border-box !important;
            position: relative !important;
          }
        }
      }
    }

    //iphone X
    /*@media only screen and (min-width: 374px) and (min-height: 811px) {*/
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
      #app {
        #Mask {
          width: 100%;
          height: 33PX;
          background: @Darkbrown;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 999;
          display: none;
        }
        #iphonex-helper-body {
          padding: 0 0 44PX 0 !important;
          box-sizing: border-box !important;

          .vux-header {
            padding-top: 33PX;

            .vux-header-right, .vux-header-left {
              top: 44PX;
            }
          }
          #vux_view_box_body {
            padding-top: 73PX !important;
          }

          #iphonex-helper-body-bottom {
            box-sizing: border-box !important;
            position: relative !important;

            .weui-tabbar {
              padding-bottom: 28PX !important;
            }
          }
          .home_wrap{
            .home_top{
              padding-top: 33PX !important;
            }
            #vux_view_box_body {
              padding-top: 0 !important;
            }
          }
        }
      }
    }

    //iphone XR
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
      #app {
        #Mask {
          width: 100%;
          height: 33PX;
          background: @Darkbrown;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 999;
          display: none;
        }
        #iphonex-helper-body {
          padding: 0 0 44PX 0 !important;
          box-sizing: border-box !important;

          .vux-header {
            padding-top: 33PX;

            .vux-header-right, .vux-header-left {
              top: 44PX;
            }
          }
          #vux_view_box_body {
            padding-top: 73PX !important;
          }

          #iphonex-helper-body-bottom {
            box-sizing: border-box !important;
            position: relative !important;

            .weui-tabbar {
              padding-bottom: 28PX !important;
            }
          }
        }
      }
    }

    //取消iphone X加的底部
    @media screen and (min-width: 376px) and (min-height: 813px) {
      #app {
        #iphonex-helper-body {
          padding: 0 !important;
          box-sizing: content-box !important;

          #iphonex-helper-body-bottom {
            box-sizing: content-box !important;
            position: relative !important;
          }
        }
      }
    }
  }

</style>

<style lang="less">

</style>
