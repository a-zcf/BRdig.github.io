
import * as types from '../store/types'
import $store from '../store/store'
import Vue from 'vue'
// 检测更新

export function checkUpdate () {
  document.addEventListener('deviceready', () => {

    window.chcp.fetchUpdate((error, data) => {
      window.chcp.getVersionInfo((err, data) => {
        console.log('当前应用时间版本： ' + data.currentWebVersion);
        console.log('当前应用version name: ' + data.appVersion);
        $store.commit(types.VersionName, data.appVersion);
        $store.commit(types.CurrentWebVersion, data.currentWebVersion);
      });
      if (error) {
        $store.commit(types.ErrorCode, error.code);
        console.log('--更新版本异常，或其他错误--', error.code, error.description);
        if (error.code === -2) {
          console.log('app更');
          //更新app
          document.getElementById('device').style.display='block';
          /*if (device.platform =='IOS') {  //判断iPhone
            alert("iosapp链接下载页面");
          } else if (device.platform =='Android') {   //判断Android
            alert("androidapp链接下载页面");
          }*/
        }
      }else{
        document.getElementById('doUpdate').style.display='block';
        console.log('热更');
        //热更
        /*if(confirm("是否进行热更？")){
          doUpdate();
        }*/
      }
    });
  });

}
//判断机型跳转
/*export function mobileType(){
  console.log('跳转');
  window.location.href="https://91apt.cn/m5l5h1";
  /!*if (device.platform =='IOS') {  //判断iPhone
    //alert("iosapp链接下载页面");
    window.location.href="https://91apt.cn/m5l5h1";
  } else if (device.platform =='Android') {   //判断Android
    //alert("androidapp链接下载页面");
    /!*https://91apt.cn/m5l5h1*!/
    window.location.href="https://91apt.cn/m5l5h1";
  }*!/
}*/


//执行更新
export function doUpdate(){
  console.log('安装更新');
  document.getElementById('Loading').style.display='block';
  setTimeout(()=>{
    window.chcp.installUpdate(function (installError) {
      if (installError != null) {
        Vue.$vux.toast.show({text:'更新失败', type: 'cancel',time:1000});
        document.getElementById('Loading').style.display='none';
        console.log('安装更新失败...'+JSON.stringify(installError));
      } else {
        Vue.$vux.toast.show({text:'更新成功', type: 'success',time:1000});
        document.getElementById('Loading').style.display='none';
        console.log('安装更新成功...'+JSON.stringify(installError));
      }
    });
  },2000);
}

export default {
  checkUpdate,
  doUpdate,
}

