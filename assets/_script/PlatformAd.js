Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1NativePlatform = require("NativePlatform");
var $z1TTPlatform = require("TTPlatform");
var $z1WEBPlatform = require("WEBPlatform");
var $z1WXPlatform = require("WXPlatform");
var def_PlatformAd = function () {
  function _ctor() {}
  _ctor.Init = function () {
    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      this.platform = new $z1TTPlatform.default();
    } else if (cc.sys.platform == cc.sys.WECHAT_GAME) {
      this.platform = new $z1WXPlatform.default();
    } else if (cc.sys.isBrowser) {
      this.platform = new $z1WEBPlatform.default();
    } else {
      this.platform = new $z1NativePlatform.default();
    }
  };
  return _ctor;
}();
exports.default = def_PlatformAd;