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
var def_GameAsset = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.originPrice = null;
    e.curPrice = null;
    e.curGain = null;
    e.content = null;
    e.item = null;
    e.head = null;
    e.selectIndex = 0;
    e.table = [];
    e.curPriceCount = 0;
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
    this.assetType = Number(e);
    $z1BundleManager.default.setSprite(this.head, "common/asset_0" + this.assetType, $z1BundleManager.default.uiBundle);
    this.initData();
    this.addEvent();
  };
  _ctor.prototype.initData = function () {
    var t = this;
    this.table = [];
    var e = "";
    switch (this.assetType) {
      case $z1GameType.ASSET_TYPE.real:
        this.data = $z1GameData.default.playerData.real;
        this.info = $z1GameData.default.configInfo.real;
        e = "real";
        break;
      case $z1GameType.ASSET_TYPE.art:
        this.data = $z1GameData.default.playerData.art;
        this.info = $z1GameData.default.configInfo.art;
        e = "art";
        break;
      case $z1GameType.ASSET_TYPE.build:
        this.data = $z1GameData.default.playerData.build;
        this.info = $z1GameData.default.configInfo.build;
        e = "build";
    }
    for (var o = 0; o < this.content.childrenCount; o++) {
      this.content.children[o].active = false;
    }
    var a = this.info.name.length;
    var n = function (o) {
      var a = i.content.children[o];
      a || (a = cc.instantiate(i.item)).setParent(i.content);
      a.active = true;
      var n = a.$("head");
      var f = a.$("name");
      var h = a.$("btnUnlock");
      var y = a.$("btnSell");
      var v = a.$("unlock/origin");
      var m = a.$("btnUnlock/cost");
      var g = a.$("unlock/name_1");
      var b = $z1GameData.default.formatAddValue(i.info.unlock[o]);
      v.setLabel($z1Util.default.formatCoin(b));
      m.setLabel("费用：" + $z1Util.default.formatCoin(b));
      f.setLabel(i.info.name[o]);
      g.setLabel(i.info.name[o]);
      $z1BundleManager.default.setSprite(n, e + "/" + e + "_" + o, $z1BundleManager.default.uiBundle);
      i.table.push({
        unlock: a.$("unlock"),
        name: a.$("name"),
        cur: a.$("unlock/cur").$(cc.Label),
        btnUnlock: a.$("btnUnlock"),
        red: a.$("btnUnlock/red"),
        btnSell: a.$("btnSell"),
        money: b
      });
      h.targetOff(i);
      h.on("touchend", function () {
        if ($z1GameData.default.UseCoin(b)) {
          $z1SoundManager.default.playSound("click");
          switch (t.assetType) {
            case $z1GameType.ASSET_TYPE.real:
              $z1platform.default.tdReport("货币购买房产");
              break;
            case $z1GameType.ASSET_TYPE.art:
              $z1platform.default.tdReport("货币购买古董");
              break;
            case $z1GameType.ASSET_TYPE.build:
              $z1platform.default.tdReport("货币购买企业");
          }
          $z1GameData.default.unlockAsset(t.assetType, o, b);
        } else if (t.assetType == $z1GameType.ASSET_TYPE.build) {
          t.unlockInfo = {
            assetType: t.assetType,
            index: o,
            money: b,
            openType: 3
          };
          $z1SoundManager.default.playSound("click");
          $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_Video, 2, false, null, t.unlockInfo);
        } else {
          $z1SoundManager.default.playSound("fail");
          $z1GameData.default.showMsg("金币不足");
        }
      }, i);
      y.targetOff(i);
      y.on("touchend", function () {
        $z1SoundManager.default.playSound("sell");
        var e = t.data.gain[o] + b;
        $z1GameData.default.sellAsset(t.assetType, o, e);
        t.refreshData();
        $z1GameData.default.showMsg("获得" + $z1Util.default.formatCoin(b));
      }, i);
    };
    var i = this;
    for (o = 0; o < a; o++) {
      n(o);
    }
    this.refreshData();
  };
  _ctor.prototype.refreshData = function () {
    var t = this.info.name.length;
    var e = 0;
    var o = 0;
    for (var a = 0; a < t; a++) {
      var n = this.data.unlock[a];
      this.table[a].name.active = 0 == n;
      this.table[a].unlock.active = 0 != n;
      this.table[a].btnUnlock.active = 0 == n;
      this.table[a].btnSell.active = 0 != n;
      this.table[a].red.active = $z1GameData.default.playerData.res.coin >= this.table[a].money;
      if (0 != n) {
        e += this.data.gain[a];
        o += this.table[a].money;
        this.table[a].cur.string = $z1Util.default.formatCoin(this.table[a].money + this.data.gain[a]);
      }
    }
    this.curPriceCount = o + e;
    this.originPrice.string = "买入价：" + $z1Util.default.formatCoin(o);
    this.curPrice.string = "当前价：" + $z1Util.default.formatCoin(this.curPriceCount);
    this.curGain.string = "收益：" + $z1Util.default.formatCoin(e);
  };
  _ctor.prototype.sellAllAsset = function () {
    $z1SoundManager.default.playSound("sell");
    if (!(this.curPriceCount <= 0)) {
      $z1GameData.default.sellAllAsset(this.assetType, this.curPriceCount);
      $z1GameData.default.showMsg("获得" + $z1Util.default.formatCoin(this.curPriceCount));
      this.refreshData();
    }
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
    cc.director.on($z1GameType.default.REFERSH_ASSET, this.refreshData, this);
    cc.director.on($z1GameType.default.REFERSH_STATE, this.refreshData, this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
    cc.director.off($z1GameType.default.REFERSH_ASSET, this.refreshData, this);
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
    displayName: "买入价"
  })], _ctor.prototype, "originPrice", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "当前价"
  })], _ctor.prototype, "curPrice", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "获利"
  })], _ctor.prototype, "curGain", undefined);
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
    displayName: "图像"
  })], _ctor.prototype, "head", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameAsset")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameAsset;