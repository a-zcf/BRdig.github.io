import Vue from 'vue'

export function copy (clipboardIteam) {
    console.log(clipboardIteam)
    cordova.plugins.clipboard.copy(
        clipboardIteam,
        function(){
          Vue.$vux.toast.show({ text: "复制成功", type: "success" });
        },
        function(){
          Vue.$vux.toast.show({ text: "复制失败", type: "cancel" });
        }
      );
}