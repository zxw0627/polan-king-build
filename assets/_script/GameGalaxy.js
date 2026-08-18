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
var $z1UIManager = require("UIManager");
var $z1Util = require("Util");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameGalaxy = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.maxGain = null;
    e.curTreasure = null;
    e.content = null;
    e.item = null;
    e.getWindow = null;
    e.getBg = null;
    e.selectIndex = 0;
    e.curGain = 0;
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
    var t = this;
    this.table = [];
    for (var e = 0; e < this.content.childrenCount; e++) {
      this.content.children[e].active = false;
    }
    var o = $z1GameData.default.configInfo.galaxy;
    var a = o.name.length;
    var n = function (e) {
      var a = i.content.children[e];
      a || (a = cc.instantiate(i.item)).setParent(i.content);
      a.active = true;
      var n = a.$("head");
      var c = a.$("lock/name");
      var u = a.$("lock/add");
      var f = a.$("btnUnlock");
      var h = a.$("btnGet");
      var y = a.$("btnUnlock/cost");
      var v = a.$("unlock/name_1");
      $z1BundleManager.default.setSprite(n, "galaxy/galaxy_" + e, $z1BundleManager.default.uiBundle);
      c.setLabel(o.name[e]);
      v.setLabel(o.name[e]);
      u.setLabel("收入：" + $z1Util.default.formatCoin($z1GameData.default.formatAddValue(o.add[e])) + "/秒");
      var m = $z1GameData.default.formatAddValue(o.unlock[e]);
      y.setLabel("费用：" + $z1Util.default.formatCoin(m));
      i.table.push({
        lock: a.$("lock"),
        unlock: a.$("unlock"),
        cur: a.$("unlock/cur").$(cc.Label),
        btnUnlock: a.$("btnUnlock"),
        red: a.$("btnUnlock/red"),
        red_1: a.$("btnGet/red"),
        btnGet: a.$("btnGet"),
        money: m,
        lblTreasure: a.$("unlock/lblTreasure")
      });
      f.targetOff(i);
      f.on("touchend", function () {
        if ($z1GameData.default.UseCoin(m)) {
          $z1SoundManager.default.playSound("click");
          $z1platform.default.tdReport("货币购买星系");
          $z1GameData.default.unlockGalaxy(e);
          t.refreshData();
        } else {
          $z1SoundManager.default.playSound("fail");
          $z1GameData.default.showMsg("金币不足");
        }
      }, i);
      h.targetOff(i);
      h.on("touchend", function () {
        t.selectIndex = e;
        $z1SoundManager.default.playSound("sell");
        t.curGain = $z1GameData.default.playerData.galaxy.gain[e];
        var a = Math.ceil(t.curGain / $z1GameData.default.formatAddValue(o.add[e]));
        var n = 0;
        a >= 60 && (n = (n = Math.floor((a - 60) / 60) + 10) > 30 ? 30 : n);
        if ($z1Util.default.Range(0, 99) < n) {
          t.openGetWindow();
        } else {
          $z1GameData.default.showMsg("获得" + $z1Util.default.formatCoin(t.curGain));
          $z1GameData.default.getGalaxyGain(e);
          t.refreshData();
        }
      }, i);
    };
    var i = this;
    for (e = 0; e < a; e++) {
      n(e);
    }
    this.refreshData();
  };
  _ctor.prototype.refreshData = function () {
    var t = $z1GameData.default.playerData.galaxy;
    var e = $z1GameData.default.configInfo.galaxy.name.length;
    for (var o = 0; o < e; o++) {
      var a = t.unlock[o];
      var n = "";
      var i = $z1GameData.default.configInfo.galaxy.treasure[o].list.length;
      var c = 0;
      for (var l = 0; l < i; l++) {
        var s = $z1GameData.default.configInfo.galaxy.treasure[o].list[l];
        var u = $z1GameData.default.treasureCfg[s];
        if (u.isShow && u.isHandBook) {
          var p = 0 == c ? "" : ",";
          c++;
          n += p + ($z1GameData.default.playerData.galaxy.treasure.indexOf(s) < 0 ? "???" : u.name);
        }
      }
      this.table[o].lblTreasure.setLabel(n);
      var f = Math.ceil(t.gain[o] / $z1GameData.default.formatAddValue($z1GameData.default.configInfo.galaxy.add[o]));
      this.table[o].lock.active = 0 == a;
      this.table[o].unlock.active = 0 != a;
      this.table[o].btnUnlock.active = 0 == a;
      this.table[o].btnGet.active = 0 != a;
      this.table[o].red.active = $z1GameData.default.playerData.res.coin >= this.table[o].money;
      this.table[o].red_1.active = f >= 60;
      0 != a && (this.table[o].cur.string = $z1Util.default.formatCoin(t.gain[o]));
    }
    this.maxGain.string = "总收入：" + $z1Util.default.formatCoin($z1GameData.default.playerData.galaxy.maxGain);
    this.curTreasure.string = "收藏品：" + $z1GameData.default.playerData.galaxy.treasure.length + "个";
  };
  _ctor.prototype.openHandBook = function () {
    $z1SoundManager.default.playSound("click");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_HANDBOOK, 2);
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
    if (t) {
      $z1SoundManager.default.playSound("click");
      $z1GameData.default.showMsg("获得" + $z1Util.default.formatCoin(this.curGain));
      $z1GameData.default.getGalaxyGain(this.selectIndex);
      this.refreshData();
    }
    this.getWindow.active = false;
  };
  _ctor.prototype.openTreasureWindow = function () {
    $z1platform.default.tdReport("拼一把获取宝物");
    this.closeGetWindow();
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_TREASURE, 2, false, null, this.selectIndex);
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
    cc.director.on($z1GameType.default.REFERSH_GALAXY, this.refreshData, this);
    cc.director.on($z1GameType.default.REFERSH_STATE, this.refreshData, this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
    cc.director.off($z1GameType.default.REFERSH_GALAXY, this.refreshData, this);
    cc.director.off($z1GameType.default.REFERSH_STATE, this.refreshData, this);
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
    displayName: "总收入"
  })], _ctor.prototype, "maxGain", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "宝物数量"
  })], _ctor.prototype, "curTreasure", undefined);
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
    type: cc.Node,
    displayName: "获得界面背景"
  })], _ctor.prototype, "getBg", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameGalaxy")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameGalaxy;