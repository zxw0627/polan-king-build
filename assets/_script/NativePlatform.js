var a;
var cc__extends = __extends;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $1$z1PlatformBase = require("PlatformBase");
var def_NativePlatform = function (t) {
  function _ctor() {
    var e = t.call(this) || this;
    e.params = {};
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
    console.log("原生平台没有");
  };
  _ctor.prototype.createRewardedVideoAd = function () {
    console.log("原生平台没有");
  };
  _ctor.prototype.createInterstitialAd = function () {
    console.log("原生平台没有");
  };
  _ctor.prototype.showBannerAd = function () {
    console.log("原生平台没有");
  };
  _ctor.prototype.hideBannerAd = function () {
    console.log("原生平台没有");
  };
  _ctor.prototype.playRewardedVideoAd = function () {
    return new Promise(function (t) {
      t(true);
    });
  };
  _ctor.prototype.showInterstitialAd = function () {
    console.log("原生平台没有");
  };
  _ctor.prototype.recorderStart = function () {
    console.log("原生平台没有");
  };
  _ctor.prototype.recorderStop = function () {
    console.log("原生平台没有");
  };
  _ctor.prototype.shareRecorderVideo = function () {
    console.log("原生平台没有");
  };
  return _ctor;
}($1$z1PlatformBase.PlatformBase);
exports.default = def_NativePlatform;