var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameType = require("GameType");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameGet = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.ele_1 = null;
    e.ele_2 = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    cc.tween(this.ele_1).to(2, {
      angle: 360
    }).set({
      angle: 0
    }).union().repeatForever().start();
    cc.tween(this.ele_2).to(2, {
      angle: 360
    }).set({
      angle: 0
    }).union().repeatForever().start();
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
    this.addEvent();
  };
  _ctor.prototype.start = function () {
    t.prototype.start.call(this);
  };
  _ctor.prototype.onShow = function (e) {
    t.prototype.onShow.call(this, e);
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
  };
  _ctor.prototype.close = function () {
    $z1platform.default.tdReport("侧边栏奖励领取");
    cc.director.emit($z1GameType.default.GET_SIDEINTO_GIFT);
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
    type: cc.Node,
    displayName: "光圈"
  })], _ctor.prototype, "ele_1", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "光圈"
  })], _ctor.prototype, "ele_2", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameGet")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameGet;