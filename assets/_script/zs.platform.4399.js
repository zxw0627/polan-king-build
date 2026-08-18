window.zsSdk = function () {
  function t() {}
  t.init = function () {
    console.log("4399 init");
  };
  t.isVideoEnable = function (t, e) {
    if (window.h5api) {
      window.h5api.canPlayAd(function (o) {
        console.log("4399是否可播放广告:" + o.canPlayAd + "  剩余次数:" + o.remain);
        if (o.canPlayAd && o.remain > 0) {
          if (t) {
            console.log("isVideoEnable调用successHandler"), t && t();
          }
        } else if (e) {
          console.log("isVideoEnable调用failHandler"), e && e();
        }
      });
    } else {
      e && e();
    }
  };
  t.playVideo = function (t, e, o) {
    console.log("4399 playVideo");
    if (window.h5api) {
      window.h5api.playAd(function (e) {
        console.log("4399播放视频回调code=" + e.code + " message=" + e.message);
        switch (e.code) {
          case 1e4:
            console.log("视频开始播放");
            break;
          case 10001:
            console.log("视频播放结束");
            t && t();
            break;
          default:
            console.log("广告异常");
            o && o();
        }
      });
    } else {
      t && t();
    }
  };
  t.showGamePortalAd = function (t) {
    if (window.h5api) {
      console.log("4399展示推荐弹窗");
      window.h5api.showRecommend();
    } else {
      t && t();
    }
  };
  return t;
}();