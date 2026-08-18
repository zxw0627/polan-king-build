var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1BundleManager = require("BundleManager");
var $z1SoundManager = require("SoundManager");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameHandBook = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.content = null;
    e.item = null;
    e.lblMaxFactor = null;
    e.table = [];
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
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
    this.initData();
    this.addEvent();
  };
  _ctor.prototype.initData = function () {
    this.lblMaxFactor.string = "<b>图鉴总加成：<color=#D07120>+" + $z1GameData.default.curTreasureFactor + "%</c>";
    this.table = [];
    for (var t = 0; t < this.content.childrenCount; t++) {
      this.content.children[t].active = false;
    }
    var e = $z1GameData.default.handBookData.length;
    var o = function (t) {
      var e = $z1GameData.default.handBookData[t];
      var o = a.content.children[t];
      o || (o = cc.instantiate(a.item)).setParent(a.content);
      o.active = true;
      var n = o.$("lblFactor").$(cc.RichText);
      var i = o.$("icon");
      var l = o.$("iconMask");
      $z1BundleManager.default.setSprite(i, "treasure/treasure_" + e, $z1BundleManager.default.uiBundle);
      $z1BundleManager.default.uiBundle.load("treasure/treasure_" + e, cc.SpriteFrame, function (t, e) {
        if (t) {
          return console.error(t);
        }
        l.$(cc.Mask).spriteFrame = e;
      });
      n.string = "<b><color=#D07120>+" + $z1GameData.default.treasureCfg[e].factor + "% </c><color=#7B6448>点击收入</color>";
      a.table.push({
        nameBg: o.$("nameBg"),
        lblName: o.$("lblName"),
        iconMask: o.$("iconMask")
      });
    };
    var a = this;
    for (t = 0; t < e; t++) {
      o(t);
    }
    this.refreshData();
  };
  _ctor.prototype.refreshData = function () {
    var t = this;
    $z1GameData.default.playerData.galaxy;
    var e = this.table.length;
    var o = function (e) {
      var o = $z1GameData.default.handBookData[e];
      var n = $z1GameData.default.playerData.galaxy.treasure;
      var i = n.indexOf(o) >= 0 ? "" : "gray-";
      cc.assetManager.getBundle("internal").load("materials/builtin-2d-" + i + "sprite", function (o, a) {
        t.table[e].nameBg.getComponent(cc.Sprite).setMaterial(0, a);
      });
      if (n.indexOf(o) >= 0) {
        a.table[e].lblName.setLabel($z1GameData.default.treasureCfg[o].name);
        a.table[e].iconMask.active = false;
      } else {
        a.table[e].lblName.setLabel("???");
        a.table[e].iconMask.active = true;
      }
    };
    var a = this;
    for (var n = 0; n < e; n++) {
      o(n);
    }
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
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
    type: cc.Node,
    displayName: "预制根节点"
  })], _ctor.prototype, "content", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "预制"
  })], _ctor.prototype, "item", undefined);
  cc__decorate([ccp_property({
    type: cc.RichText,
    displayName: "图鉴总加成"
  })], _ctor.prototype, "lblMaxFactor", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameHandBook")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameHandBook;