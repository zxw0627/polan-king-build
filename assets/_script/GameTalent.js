var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameTalent = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.clickToggle = null;
    e.autoToggle = null;
    e.lblAddCoinState = null;
    e.coinFakeFatorList = [1, 10, 100, 1e3];
    e.addCoinFakeList = ["1-4", "100-4", "100-8", "100-12", "1-16"];
    e.addValue = 0;
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
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
  };
  _ctor.prototype.changeGainCoinFactor = function (t) {
    var e = t.node.getSiblingIndex();
    $z1GameData.default.curCoinFakeFactor = this.coinFakeFatorList[e];
    console.log("🚀 ~ file: GameTalent.ts:43 ~ GameTalent ~ changeGainCoinFactor ~ GameData.curCoinFakeFactor:", $z1GameData.default.curCoinFakeFactor);
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
  };
  _ctor.prototype.refreshGainCoinState = function () {
    var t = 0;
    for (var e = 0; e < this.coinFakeFatorList.length; e++) {
      if ($z1GameData.default.curCoinFakeFactor == this.coinFakeFatorList[e]) {
        t = e;
        break;
      }
    }
    this.clickToggle.toggleItems[t].isChecked = true;
  };
  _ctor.prototype.changeAddCoin = function (t) {
    var e = t.node.getSiblingIndex();
    this.addValue = $z1GameData.default.formatAddValue(this.addCoinFakeList[e]);
    $z1GameData.default.openFakeAddCoin = false;
    this.refreshAddCoinState();
  };
  _ctor.prototype.clickAddCoinState = function () {
    $z1GameData.default.openFakeAddCoin = !$z1GameData.default.openFakeAddCoin;
    this.refreshAddCoinState();
  };
  _ctor.prototype.initAddCoinState = function () {
    var t = 0;
    for (var e = 0; e < this.addCoinFakeList.length; e++) {
      if (this.addValue == $z1GameData.default.formatAddValue(this.addCoinFakeList[t])) {
        t = e;
        break;
      }
    }
    this.autoToggle.toggleItems[t].isChecked = true;
  };
  _ctor.prototype.refreshAddCoinState = function () {
    this.lblAddCoinState.string = $z1GameData.default.openFakeAddCoin ? "开启中" : "关闭中";
    console.log("🚀 ~ file: GameTalent.ts:95 ~ GameTalent ~ refreshAddCoinState ~ this.addValue:", this.addValue);
    if ($z1GameData.default.openFakeAddCoin) {
      0 == this.addValue && (this.addValue = $z1GameData.default.formatAddValue(this.addCoinFakeList[0]));
      $z1GameData.default.curFakeAddCoin = this.addValue;
    } else {
      $z1GameData.default.curFakeAddCoin = 0;
    }
    console.log("🚀 ~ file: GameTalent.ts:70 ~ GameTalent ~ refreshAddCoinState ~ GameData.curFakeAddCoin:", $z1GameData.default.curFakeAddCoin);
    cc.director.emit($z1GameType.default.REFERSH_AUTO);
  };
  _ctor.prototype.buyAllAsset = function () {
    var t;
    var e;
    var o = 0;
    var a = 0;
    for (var n = 1; n <= 3; n++) {
      switch (n) {
        case $z1GameType.ASSET_TYPE.real:
          t = $z1GameData.default.configInfo.real;
          e = $z1GameData.default.playerData.real;
          break;
        case $z1GameType.ASSET_TYPE.art:
          t = $z1GameData.default.configInfo.art;
          e = $z1GameData.default.playerData.art;
          break;
        case $z1GameType.ASSET_TYPE.build:
          t = $z1GameData.default.configInfo.build;
          e = $z1GameData.default.playerData.build;
      }
      o = t.name.length;
      for (var i = 0; i < o; i++) {
        if (!e.unlock[i]) {
          a = $z1GameData.default.formatAddValue(t.unlock[i]);
          $z1GameData.default.unlockAsset(n, i, a, false);
        }
      }
    }
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
    $z1GameData.default.SaveData();
  };
  _ctor.prototype.sellAllAsset = function () {
    var t;
    var e;
    var o = 0;
    var a = 0;
    for (var n = 1; n <= 3; n++) {
      switch (n) {
        case $z1GameType.ASSET_TYPE.real:
          t = $z1GameData.default.configInfo.real;
          e = $z1GameData.default.playerData.real;
          break;
        case $z1GameType.ASSET_TYPE.art:
          t = $z1GameData.default.configInfo.art;
          e = $z1GameData.default.playerData.art;
          break;
        case $z1GameType.ASSET_TYPE.build:
          t = $z1GameData.default.configInfo.build;
          e = $z1GameData.default.playerData.build;
      }
      o = t.name.length;
      for (var i = 0; i < o; i++) {
        if (e.unlock[i]) {
          a = $z1GameData.default.formatAddValue(t.unlock[i]);
          var l = e.gain[i] + a;
          $z1GameData.default.sellAsset(n, i, l, false);
        }
      }
    }
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
    $z1GameData.default.SaveData();
  };
  _ctor.prototype.addJobAndCity = function () {
    var t = $z1GameData.default.configInfo.job.name.length;
    var e = $z1GameData.default.playerData.job.lv;
    for (var o = 0; o < t; o++) {
      e[o] > 10 || (e[o] = 10);
    }
    t = $z1GameData.default.configInfo.city.name.length;
    var a = $z1GameData.default.playerData.city.lv;
    for (o = 0; o < t; o++) {
      a[o] > 0 || (a[o] = 1);
    }
    cc.director.emit($z1GameType.default.REFERSH_AUTO);
    $z1GameData.default.SaveData();
  };
  _ctor.prototype.resumeJobAddCity = function () {
    var t = $z1GameData.default.configInfo.job.name.length;
    var e = $z1GameData.default.playerData.job.lv;
    for (var o = 0; o < t; o++) {
      e[o] = 0;
    }
    t = $z1GameData.default.configInfo.city.name.length;
    var a = $z1GameData.default.playerData.city.lv;
    for (o = 0; o < t; o++) {
      a[o] = 0;
    }
    $z1GameData.default.curJobFactor = 0;
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
    cc.director.emit($z1GameType.default.REFERSH_AUTO);
    $z1GameData.default.SaveData();
  };
  _ctor.prototype.resumeData = function () {
    this.resumeJobAddCity();
    this.sellAllAsset();
    var t = $z1GameData.default.playerData.star.unlock.length;
    for (var e = 0; e < t; e++) {
      $z1GameData.default.playerData.star.unlock[e] = 0;
      $z1GameData.default.playerData.star.curGain = 0;
      $z1GameData.default.playerData.star.maxGain = 0;
    }
    t = $z1GameData.default.playerData.airship.unlock.length;
    for (e = 0; e < t; e++) {
      $z1GameData.default.playerData.airship.unlock[e] = 0;
      $z1GameData.default.playerData.airship.curGain = 0;
      $z1GameData.default.playerData.airship.maxGain = 0;
    }
    t = $z1GameData.default.playerData.spaceStation.unlock.length;
    for (e = 0; e < t; e++) {
      $z1GameData.default.playerData.spaceStation.unlock[e] = 0;
      $z1GameData.default.playerData.spaceStation.curGain = 0;
      $z1GameData.default.playerData.spaceStation.maxGain = 0;
    }
    t = $z1GameData.default.playerData.galaxy.unlock.length;
    for (e = 0; e < t; e++) {
      $z1GameData.default.playerData.galaxy.unlock[e] = 0;
      $z1GameData.default.playerData.galaxy.maxGain = 0;
      $z1GameData.default.playerData.galaxy.gain[e] = 0;
    }
    var o = ["galacticRuins", "exileTribe", "starCity", "threeT", "universe"];
    for (e = 0; e < o.length; e++) {
      t = $z1GameData.default.playerData[o[e]].unlock.length;
      for (var a = 0; a < t; a++) {
        $z1GameData.default.playerData[o[a]].unlock[a] = 0;
        $z1GameData.default.playerData[o[a]].maxGain = 0;
        $z1GameData.default.playerData[o[a]].gain[a] = 0;
      }
    }
    $z1GameData.default.playerData.galaxy.treasure = [];
    $z1GameData.default.curBuildFactor = 0;
    $z1GameData.default.curJobFactor = 0;
    $z1GameData.default.curTreasureFactor = 0;
    $z1GameData.default.playerData.base.lv = 0;
    $z1GameData.default.playerData.res.coin = 0;
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
    $z1GameData.default.SaveData();
  };
  _ctor.prototype.getCoin = function () {
    $z1GameData.default.AddCoin(1e54);
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
    type: cc.ToggleContainer,
    displayName: "金钱倍数单选组件"
  })], _ctor.prototype, "clickToggle", undefined);
  cc__decorate([ccp_property({
    type: cc.ToggleContainer,
    displayName: "自动增长金钱单选组件"
  })], _ctor.prototype, "autoToggle", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "自动增长金钱状态"
  })], _ctor.prototype, "lblAddCoinState", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameTalent")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameTalent;