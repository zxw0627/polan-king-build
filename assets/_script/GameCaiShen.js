var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1SoundManager = require("SoundManager");
var $z1Util = require("Util");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameCaiShen = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.gain = null;
    e.gainCount = 0;
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
    this.gainCount = 10 * $z1GameData.default.playerGradeUp($z1GameData.default.playerData.base.lv);
    this.gain.string = "(" + $z1Util.default.formatCoin(this.gainCount) + ")";
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
        $z1platform.default.tdReport("视频获取财神奖励");
        $z1GameData.default.AddCoin(t.gainCount);
        $z1GameData.default.showMsg("获得" + $z1Util.default.formatCoin(t.gainCount));
        t.close();
      } else {
        $z1GameData.default.showMsg("完整观看视频才可领取奖励");
      }
    }).catch(function () {
      $z1GameData.default.showMsg("视频加载失败");
    });
  };
  _ctor.prototype.close = function (t) {
    undefined === t && (t = null);
    t && $z1SoundManager.default.playSound("click");
    cc.director.emit($z1GameType.default.CLOSE_CAISHEN);
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
    displayName: "收益"
  })], _ctor.prototype, "gain", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameCaiShen")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameCaiShen;