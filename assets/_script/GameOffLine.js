var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1SoundManager = require("SoundManager");
var $z1Util = require("Util");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameOffLine = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.time = null;
    e.gain = null;
    e.curGain = 0;
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
    cc.tween(this.bg).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).start();
    this.curGain = Number(e.value);
    this.time.string = "离线时间：" + $z1Util.default.formatTimerHaveHour(Number(e.time));
    this.gain.string = "(" + $z1Util.default.formatCoin(this.curGain) + ")";
  };
  _ctor.prototype.normalGet = function () {
    $z1SoundManager.default.playSound("click");
    $z1GameData.default.setlastLeveTime(new Date().getTime());
    $z1GameData.default.AddCoin(this.curGain);
    this.close();
  };
  _ctor.prototype.playVideo = function () {
    var t = this;
    $z1SoundManager.default.playSound("click");
    $z1platform.default.playVideo().then(function (e) {
      if (e) {
        $z1platform.default.tdReport("观看视频领取双倍离线收益");
        $z1GameData.default.setlastLeveTime(new Date().getTime());
        $z1GameData.default.AddCoin(2 * t.curGain);
        t.close();
      }
    }).catch(function () {});
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
  };
  _ctor.prototype.close = function () {
    $z1GameData.default.canupdate = true;
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
    displayName: "离线时间"
  })], _ctor.prototype, "time", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "离线收益"
  })], _ctor.prototype, "gain", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameOffLine")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameOffLine;