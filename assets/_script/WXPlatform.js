var a;
var cc__extends = __extends;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $1$z1PlatformBase = require("PlatformBase");
var def_WXPlatform = function (t) {
  function _ctor() {
    var e = t.call(this) || this;
    e.rewardedVideoAdID = "adunit-1ad19a8d528356d4";
    e.params = {
      videoPath: null,
      recorderStartTime: 0,
      recorderStopTime: 0,
      recorderTime: 0
    };
    e.createBannerAd();
    e.createInterstitialAd();
    e.createRewardedVideoAd();
    window.wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.getAppInfoSync = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.addDesk = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.checkDesk = function () {
    throw new Error("Method not implemented.");
  };
  _ctor.prototype.createBannerAd = function () {
    var t = this;
    if (null != this.bannerAdID) {
      var e = window.wx.getSystemInfoSync();
      var o = e.windowWidth;
      var a = e.windowHeight;
      this.bannerAd = window.wx.createBannerAd({
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
      this.rewardedVideoAd = window.wx.createRewardedVideoAd({
        adUnitId: this.rewardedVideoAdID
      });
      this.rewardedVideoAd.onClose(function (e) {
        if (e.isEnded) {
          t.videoCloseHandler && t.videoCloseHandler(true);
        } else {
          t.videoCloseHandler && t.videoCloseHandler(false);
        }
      });
      this.rewardedVideoAd.onError(function (t) {
        console.log("视频失败", t);
      });
    }
  };
  _ctor.prototype.createInterstitialAd = function () {
    null != this.interstitialAd && (this.interstitialAd = window.wx.createInterstitialAd({
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
    return new Promise(function (e, o) {
      if (null != t.rewardedVideoAd) {
        t.rewardedVideoAd.load();
        t.rewardedVideoAd.show().then(function () {
          console.log("广告显示成功");
        }).catch(function (t) {
          console.log("广告组件出现问题", t);
          o();
        });
        t.videoCloseHandler = function (t) {
          e(t);
        };
      } else {
        console.log("广告单例为空");
      }
    });
  };
  _ctor.prototype.showInterstitialAd = function () {
    this.interstitialAd && this.interstitialAd.show();
  };
  _ctor.prototype.recorderStart = function () {};
  _ctor.prototype.recorderStop = function () {};
  _ctor.prototype.shareRecorderVideo = function () {};
  return _ctor;
}($1$z1PlatformBase.PlatformBase);
exports.default = def_WXPlatform;