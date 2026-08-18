var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1SoundManager = require("SoundManager");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameVideo = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.title = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
    this.addEvent();
    this.bg.scale = .001;
  };
  _ctor.prototype.start = function () {
    t.prototype.start.call(this);
  };
  _ctor.prototype.onShow = function (e) {
    t.prototype.onShow.call(this, e);
    this.unlockInfo = e;
    if (2 == this.unlockInfo.openType) {
      this.title.string = "升级";
    } else {
      3 == this.unlockInfo.openType && (this.title.string = "解锁");
    }
    cc.tween(this.bg).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).start();
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
  };
  _ctor.prototype.video = function () {
    var t = this;
    $z1SoundManager.default.playSound("click");
    $z1platform.default.playVideo().then(function (e) {
      if (e) {
        switch (t.unlockInfo.openType) {
          case 1:
          case 2:
            cc.director.emit($z1GameType.default.VIDEO_GRADEUP);
            break;
          case 3:
            $z1platform.default.tdReport("观看视频购买企业");
            var o = $z1GameData.default.configInfo.build.name[Number(t.unlockInfo.index)];
            $z1platform.default.tdReport("观看视频购买企业" + o);
            $z1GameData.default.unlockAsset(t.unlockInfo.assetType, t.unlockInfo.index, t.unlockInfo.money);
        }
        t.close();
      }
    }).catch(function () {});
  };
  _ctor.prototype.close = function (t) {
    undefined === t && (t = null);
    t && $z1SoundManager.default.playSound("click");
    this.node.active = false;
  };
  _ctor.prototype.onDisable = function () {
    t.prototype.onDisable.call(this);
    this.removeEvent();
  };
  _ctor.prototype.onDestroy = function () {
    t.prototype.onDestroy.call(this);
    this.removeEvent();
  };
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "背景"
  })], _ctor.prototype, "bg", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "标题"
  })], _ctor.prototype, "title", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameVideo")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameVideo;