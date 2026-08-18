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
var def_GameAirship = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.curGain = null;
    e.maxGain = null;
    e.content = null;
    e.item = null;
    e.getWindow = null;
    e.curGain_1 = null;
    e.getBg = null;
    e.info = $z1GameData.default.configInfo.airship;
    e.data = $z1GameData.default.playerData.airship;
    e.selectIndex = 0;
    e.table = [];
    e.curPriceCount = 0;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.proDes = $z1Util.default.DeepFindChildByName(this.node, "proDes");
    this.proImg = $z1Util.default.DeepFindChildByName(this.node, "proImg");
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
    this.assetType = Number(e);
    this.initData();
    this.addEvent();
  };
  _ctor.prototype.initData = function () {
    var t = this;
    this.table = [];
    for (var e = 0; e < this.content.childrenCount; e++) {
      this.content.children[e].active = false;
    }
    var o = this.info.name.length;
    var a = function (e) {
      var o = n.content.children[e];
      o || (o = cc.instantiate(n.item)).setParent(n.content);
      o.active = true;
      var a = o.$("head");
      var i = o.$("name");
      var c = o.$("btnUnlock");
      var p = o.$("add");
      var f = o.$("btnUnlock/cost");
      var h = $z1GameData.default.formatAddValue(n.info.unlock[e]);
      p.setLabel("收入：" + $z1Util.default.formatCoin($z1GameData.default.formatAddValue(n.info.add[e])) + "/秒");
      f.setLabel("费用：" + $z1Util.default.formatCoin(h));
      i.setLabel(n.info.name[e]);
      $z1BundleManager.default.setSprite(a, "add/airship/" + e, $z1BundleManager.default.uiBundle);
      n.table.push({
        btnUnlock: o.$("btnUnlock"),
        red: o.$("btnUnlock/red"),
        money: h
      });
      c.targetOff(n);
      c.on("touchend", function () {
        if ($z1GameData.default.UseCoin(h)) {
          $z1platform.default.tdReport("货币购买飞船");
          $z1SoundManager.default.playSound("click");
          $z1GameData.default.playerData.airship.unlock[e] = 1;
          $z1GameData.default.SaveData();
          t.refreshData();
        } else {
          $z1SoundManager.default.playSound("fail");
          $z1GameData.default.showMsg("金币不足");
        }
      }, n);
    };
    var n = this;
    for (e = 0; e < o; e++) {
      a(e);
    }
    this.refreshData();
  };
  _ctor.prototype.refreshData = function () {
    var t = this.info.name.length;
    for (var e = 0; e < t; e++) {
      var o = this.data.unlock[e];
      console.log("🚀 ~ file: GameAirship.ts:113 ~ GameStar ~ refreshData ~ state:", this.data.unlock);
      this.table[e].btnUnlock.active = 0 == o;
      this.table[e].red.active = $z1GameData.default.playerData.res.coin >= this.table[e].money;
    }
    this.curGain.string = "总收入：" + $z1Util.default.formatCoin(this.data.curGain);
    this.curGain_1.string = $z1Util.default.formatCoin(this.data.curGain);
    this.maxGain.string = "总累积：" + $z1Util.default.formatCoin(this.data.maxGain);
    this.checkSchedule();
  };
  _ctor.prototype.checkSchedule = function () {
    var t = 0;
    var e = this.info.name.length;
    for (var o = 0; o < e; o++) {
      0 != this.data.unlock[o] && t++;
    }
    var a = t / e;
    this.proImg.width = 0 == a ? 1 : 297 * a;
    this.proDes.getComponent(cc.Label).string = "修复完成度:" + Math.floor(100 * a) + "%";
  };
  _ctor.prototype.openGetWindow = function () {
    $z1SoundManager.default.playSound("click");
    this.getBg.setPosition(cc.v3(700, 64));
    this.getWindow.active = true;
    cc.tween(this.getBg).by(.4, {
      position: cc.v3(-700)
    }, {
      easing: "backOut"
    }).start();
  };
  _ctor.prototype.closeGetWindow = function (t) {
    undefined === t && (t = null);
    t && $z1SoundManager.default.playSound("click");
    this.getWindow.active = false;
  };
  _ctor.prototype.getGain = function () {
    $z1SoundManager.default.playSound("sell");
    $z1GameData.default.playerData.res.coin += $z1GameData.default.playerData.airship.curGain;
    $z1GameData.default.playerData.airship.curGain = 0;
    $z1GameData.default.SaveData();
    this.closeGetWindow();
    this.refreshData();
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
    cc.director.on($z1GameType.default.REFERSH_STAR, this.refreshData, this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
    cc.director.off($z1GameType.default.REFERSH_STAR, this.refreshData, this);
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
    displayName: "当前攒钱"
  })], _ctor.prototype, "curGain", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "总共攒钱"
  })], _ctor.prototype, "maxGain", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "预制根节点"
  })], _ctor.prototype, "content", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "预制"
  })], _ctor.prototype, "item", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "获取界面"
  })], _ctor.prototype, "getWindow", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "当前攒钱"
  })], _ctor.prototype, "curGain_1", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "获得界面背景"
  })], _ctor.prototype, "getBg", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameStar")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameAirship;