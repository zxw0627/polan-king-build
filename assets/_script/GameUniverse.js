var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameType = require("GameType");
var $z1SoundManager = require("SoundManager");
var $z1UIManager = require("UIManager");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameUniverse = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.items = null;
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
    var e = this;
    t.prototype.start.call(this);
    var o = function (t) {
      var o = a.items.children[t];
      var n = t;
      o.on(cc.Node.EventType.TOUCH_START, function () {
        e.itemClick(n);
      }, a);
    };
    var a = this;
    for (var n = 0; n < this.items.childrenCount; n++) {
      o(n);
    }
  };
  _ctor.prototype.itemClick = function (t) {
    $z1SoundManager.default.playSound("click");
    if (0 == t) {
      $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_Airship);
    } else if (1 == t) {
      $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_SpaceStation);
    } else {
      $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_UniverseCom, 2, false, null, {
        dataKey: ["", "", "galacticRuins", "exileTribe", "starCity", "threeT", "universe"][t]
      });
    }
  };
  _ctor.prototype.closeClick = function () {
    this.node.active = false;
    $z1SoundManager.default.playSound("click");
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
    type: cc.Node
  })], _ctor.prototype, "items", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameTemplate")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameUniverse;