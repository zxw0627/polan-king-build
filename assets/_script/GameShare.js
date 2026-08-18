var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1PlatformAd = require("PlatformAd");
var $z1SoundManager = require("SoundManager");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_GameShare = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onShow = function (e) {
    t.prototype.onShow.call(this, e);
    this.bg.scale = .001;
    cc.tween(this.bg).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).start();
  };
  _ctor.prototype.closeClick = function () {
    $z1SoundManager.default.playSound("click");
    this.node.active = false;
  };
  _ctor.prototype.shareClick = function () {
    $z1SoundManager.default.playSound("click");
    $z1PlatformAd.default.platform.shareRecorderVideo();
    this.node.active = false;
  };
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "背景"
  })], _ctor.prototype, "bg", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameShare;