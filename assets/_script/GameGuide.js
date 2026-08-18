var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1GuideManager = require("GuideManager");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameGuide = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.guideRoot = null;
    e.guideMask = null;
    e.guideHand = null;
    e.desc = null;
    e.closeCall = null;
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
    t.prototype.onShow.call(this, e);
    this.desc.string = $z1GuideManager.default.instance.getCurGuideConf().desc;
    var o = $z1GuideManager.default.instance.getCurGuideConf().type;
    var a = $z1GuideManager.default.instance.getCurGuideConf().descType;
    this.guideHand.scaleX = 1;
    switch (a) {
      case 1:
        this.desc.node.x = 0;
        break;
      case 2:
        this.desc.node.x = 100;
        break;
      case 3:
        this.desc.node.x = -100;
    }
    if (o && 1 == o) {
      this.guideMask.type = cc.Mask.Type.ELLIPSE;
      this.guideMask.segements = 64;
    } else {
      this.guideMask.type = cc.Mask.Type.RECT;
    }
    if (e.isClose) {
      this.desc.string = "";
      this.guideHand.scaleX = -1;
    }
    this.guideMask.node.position = e.pos;
    this.guideHand.position = e.pos;
    this.guideMask.node.setContentSize(e.size.width, e.size.height);
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
    cc.director.on($z1GameType.default.CLOSE_GUIDE, this.close, this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
    cc.director.off($z1GameType.default.CLOSE_GUIDE, this.close, this);
  };
  _ctor.prototype.close = function () {
    $z1GameData.default.isOpenGuide = false;
    this.node.active = false;
  };
  _ctor.prototype.onDisable = function () {
    t.prototype.onDisable.call(this);
    this.removeEvent();
    this.closeCall && this.closeCall();
    this.closeCall = null;
  };
  _ctor.prototype.onDestroy = function () {
    t.prototype.onDestroy.call(this);
    this.removeEvent();
  };
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "引导遮罩根节点"
  })], _ctor.prototype, "guideRoot", undefined);
  cc__decorate([ccp_property({
    type: cc.Mask,
    displayName: "遮罩位置"
  })], _ctor.prototype, "guideMask", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "引导手指"
  })], _ctor.prototype, "guideHand", undefined);
  cc__decorate([ccp_property({
    type: cc.RichText,
    displayName: "对话内容"
  })], _ctor.prototype, "desc", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameGuide")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameGuide;