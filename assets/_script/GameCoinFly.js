var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameType = require("GameType");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameCoinFly = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.coin = null;
    e.targetPos = cc.v3(-302, 580);
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
    cc.director.emit($z1GameType.default.COINUISACLE);
    this.targetPos = e.targetPos;
    this.coin.position = cc.v3(e.x, e.y);
    var a = cc.Vec3.distance(this.targetPos, this.coin.position) / 1200;
    cc.tween(this.coin).to(a, {
      position: this.targetPos
    }).call(function () {
      o.node.active = false;
    }).start();
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
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
    displayName: "金币"
  })], _ctor.prototype, "coin", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameCoinFly")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameCoinFly;