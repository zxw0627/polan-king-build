var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1BundleManager = require("BundleManager");
var $z1SoundManager = require("SoundManager");
var $z1Util = require("Util");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameCity = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.content = null;
    e.item = null;
    e.isJoin = false;
    e.info = $z1GameData.default.configInfo.city;
    e.selectIndex = 0;
    e.table = [];
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.initData();
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
    this.addEvent();
    this.bg.scale = .001;
  };
  _ctor.prototype.start = function () {
    t.prototype.start.call(this);
  };
  _ctor.prototype.clickGradeUp = function () {
    this.isJoin = true;
    var t = $z1GameData.default.getCityBaseAttributeByIndex(this.selectIndex)[2];
    var e = $z1GameData.default.playerData.city.lv[this.selectIndex];
    var o = $z1GameData.default.getCityGradeUp(e, t);
    if ($z1GameData.default.UseCoin(o, false)) {
      $z1platform.default.tdReport("货币购买城市");
      this.gradeUp();
    } else {
      $z1SoundManager.default.playSound("fail");
      $z1GameData.default.showMsg("金币不足");
      this.unschedule(this.clickGradeUp);
    }
  };
  _ctor.prototype.gradeUp = function () {
    $z1SoundManager.default.playSound("up");
    $z1GameData.default.playerData.city.lv[this.selectIndex]++;
    this.refresh();
    cc.director.emit($z1GameType.default.REFERSH_AUTO);
  };
  _ctor.prototype.refreshData = function (t) {
    var e = $z1GameData.default.playerData.city.lv[t];
    var o = $z1GameData.default.getCityBaseAttributeByIndex(t)[2];
    var a = $z1GameData.default.getCityGradeUp(e, o);
    this.table[t].unlock.active = $z1GameData.default.playerData.res.coin >= a;
    this.table[t].red.active = $z1GameData.default.playerData.res.coin >= a;
    this.table[t].name.setLabel(this.info.name[t]);
    this.table[t].lv.setLabel("等级：" + e);
    this.table[t].cost.setLabel("费用：" + $z1Util.default.formatCoin(a));
    this.table[t].value.setLabel("+" + $z1Util.default.formatCoin($z1GameData.default.getCityAddAttribute(t, e)) + "/秒");
  };
  _ctor.prototype.initData = function () {
    var t = this;
    this.table = [];
    var e = this.info.name.length;
    var o = function (e) {
      $z1GameData.default.playerData.city.lv[e];
      var o = a.content.children[e];
      o || (o = cc.instantiate(a.item)).setParent(a.content);
      o.active = true;
      var n = o.$("head");
      var i = o.$("btnGradeUp");
      $z1BundleManager.default.setSprite(n, "city/city_" + e, $z1BundleManager.default.uiBundle);
      a.table.push({
        unlock: o.$("unlock"),
        name: o.$("name"),
        cost: i.$("cost"),
        lv: o.$("lv"),
        value: i.$("value"),
        red: i.$("red")
      });
      i.on("touchstart", function () {
        t.isJoin = false;
        t.selectIndex = e;
        t.schedule(t.clickGradeUp, .1);
      }, a);
      i.on("touchend", function () {
        if (!t.isJoin) {
          t.isJoin = true;
          t.clickGradeUp();
        }
        t.unschedule(t.clickGradeUp);
      }, a);
      i.on("touchcancel", function () {
        t.unschedule(t.clickGradeUp);
      }, a);
    };
    var a = this;
    for (var n = 0; n < e; n++) {
      o(n);
    }
  };
  _ctor.prototype.refresh = function () {
    var t = this.table.length;
    for (var e = 0; e < t; e++) {
      this.refreshData(e);
    }
  };
  _ctor.prototype.onShow = function (e) {
    t.prototype.onShow.call(this, e);
    cc.tween(this.bg).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).start();
    this.refresh();
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
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameCity")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameCity;