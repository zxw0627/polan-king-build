var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameMsg = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.desc = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
    this.addEvent();
  };
  _ctor.prototype.start = function () {
    t.prototype.start.call(this);
  };
  _ctor.prototype.onShow = function (e) {
    var o = this;
    t.prototype.onShow.call(this, e);
    this.desc.string = e;
    this.bg.position = cc.v3(0, 200, 0);
    cc.tween(this.bg).by(.4, {
      position: cc.v3(0, 50, 0)
    }).delay(1).call(function () {
      o.close();
    }).start();
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
  };
  _ctor.prototype.close = function () {
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
    displayName: "描述"
  })], _ctor.prototype, "desc", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameMsg")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameMsg;