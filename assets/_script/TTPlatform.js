var a;
var cc__extends = __extends;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $1$z1PlatformBase = require("PlatformBase");
var def_TTPlatform = function (t) {
  function _ctor() {
    var e = t.call(this) || this;
    e.rewardedVideoAdID = "1b44abia9hoe1e5la0";
    e.params = {
      videoPath: null,
      recorderStartTime: 0,
      recorderStopTime: 0,
      recorderTime: 0
    };
    e.createBannerAd();
    e.createInterstitialAd();
    e.createRewardedVideoAd();
    var o = window.tt.getGameRecorderManager();
    o.onStart(function () {
      console.log("开始录屏");
    });
    o.onStop(function (t) {
      console.log("停止录屏", t);
      e.params.videoPath = t.videoPath;
    });
    e.getAppInfoSync();
    window.tt.onShow(function () {
      e.getAppInfoSync();
    });
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.createBannerAd = function () {
    var t = this;
    if (null != this.bannerAdID) {
      var e = window.tt.getSystemInfoSync();
      var o = e.windowWidth;
      var a = e.windowHeight;
      this.bannerAd = window.tt.createBannerAd({
        adUnitId: this.bannerAdID,
        adIntervals: 30,
        style: {
          width: 200,
          top: a - 112.5
        }
      });
      this.bannerAd.onResize(function (e) {
        t.bannerAd.style.top = a - e.height;
        t.bannerAd.style.left = (o - e.width) / 2;
      });
    }
  };
  _ctor.prototype.createRewardedVideoAd = function () {
    var t = this;
    if (null != this.rewardedVideoAdID) {
      this.rewardedVideoAd = window.tt.createRewardedVideoAd({
        adUnitId: this.rewardedVideoAdID
      });
      this.rewardedVideoAd.onClose(function (e) {
        if (e.isEnded) {
          t.videoCloseHandler && t.videoCloseHandler(true);
        } else {
          t.videoCloseHandler && t.videoCloseHandler(false);
        }
      });
    }
  };
  _ctor.prototype.createInterstitialAd = function () {
    null != this.interstitialAd && (this.interstitialAd = window.tt.createInterstitialAd({
      adUnitId: this.interstitialAdID
    }));
  };
  _ctor.prototype.showBannerAd = function () {
    this.bannerAd && this.bannerAd.show();
  };
  _ctor.prototype.hideBannerAd = function () {
    this.bannerAd && this.bannerAd.hide();
  };
  _ctor.prototype.playRewardedVideoAd = function () {
    var t = this;
    $z1GameData.default.showMsg("正在加载视频...");
    return new Promise(function (e, o) {
      if (null == t.rewardedVideoAd) {
        console.log("广告单例为空");
        o();
      }
      t.rewardedVideoAd.load().then(function () {}).catch(function (t) {
        console.log("广告组件出现问题", t);
        o();
      });
      t.rewardedVideoAd.show().then(function () {
        console.log("广告显示成功");
      }).catch(function (t) {
        console.log("广告组件出现问题", t);
        o();
      });
      t.videoCloseHandler = function (t) {
        zs_sdk.zs_dyzt.checkVideoReport(t);
        e(t);
      };
    });
  };
  _ctor.prototype.showInterstitialAd = function () {
    this.interstitialAd && this.interstitialAd.show();
  };
  _ctor.prototype.recorderStart = function () {
    this.params.videoPath = null;
    this.params.recorderStartTime = 0;
    this.params.recorderStopTime = 0;
    this.params.recorderTime = 0;
    window.tt.getGameRecorderManager().start({
      duration: 60
    });
    this.params.recorderStartTime = new Date().getTime() / 1e3;
  };
  _ctor.prototype.recorderStop = function () {
    window.tt.getGameRecorderManager().stop();
    this.params.recorderStopTime = new Date().getTime() / 1e3;
    this.params.recorderTime = this.params.recorderStopTime - this.params.recorderStartTime;
  };
  _ctor.prototype.shareRecorderVideo = function () {
    var t = this;
    return new Promise(function (e, o) {
      null == t.params.videoPath && o("分享录屏失败01");
      var a = {
        channel: "video",
        title: "分享",
        desc: "描述",
        query: "",
        extra: {
          videoPath: t.params.videoPath,
          videoTopics: [""],
          hashtag_list: [""],
          withVideoId: true,
          video_title: "分享"
        },
        success: function () {
          console.log("分享录屏成功");
          e("分享录屏成功");
        },
        fail: function (t) {
          console.log("分享录屏失败", JSON.stringify(t));
          o("分享录屏失败");
        }
      };
      window.tt.shareAppMessage(a);
    });
  };
  _ctor.prototype.addDesk = function () {
    return new Promise(function (t) {
      window.tt.onTouchEnd(function () {
        if ($z1GameData.default.isAdd) {
          $z1GameData.default.isAdd = false;
          window.tt.addShortcut({
            success: function () {
              t(true);
            },
            fail: function () {
              t(false);
            }
          });
        }
      });
    });
  };
  _ctor.prototype.checkDesk = function () {
    return new Promise(function (t) {
      window.tt.checkShortcut({
        success: function (e) {
          t(e.status.exist);
        },
        fail: function () {
          t(false);
        }
      });
    });
  };
  _ctor.prototype.getAppInfoSync = function () {
    var t = window.tt.getAppInfoSync();
    console.log("启动参数--", t);
    $z1GameData.default.isSideInto = "homepage" == t.launchFrom && "sidebar_card" == t.location;
  };
  return _ctor;
}($1$z1PlatformBase.PlatformBase);
exports.default = def_TTPlatform;