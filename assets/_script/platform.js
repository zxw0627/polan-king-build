Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1PlatformAd = require("PlatformAd");
var def_platform = function () {
  function _ctor() {}
  _ctor.playVideo = function () {
    return $z1PlatformAd.default.platform.playRewardedVideoAd();
  };
  _ctor.tdReport = function (t) {
    console.log("td埋点：", t);
  };
  _ctor.setNetConf = function (t) {
    for (var e in this.netConf) {
      Object.prototype.hasOwnProperty.call(t, e) && (this.netConf[e] = t[e]);
    }
    console.log("网络配置", this.netConf);
  };
  _ctor.prototype.justTrack = function () {};
  _ctor.version = "1.0.0";
  _ctor.userId = 1;
  _ctor.bIsTalent = false;
  _ctor.tdKey = "7C6FED2DE5194C2485146A122B43B38B";
  _ctor.netConf = {
    zs_video_plane: 0,
    zs_side_show: 0,
    zs_caishen_show: 0
  };
  return _ctor;
}();
exports.default = def_platform;