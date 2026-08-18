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
var def_GameTreasure = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.light = null;
    e.icon = null;
    e.lblName = null;
    e.qua_0 = null;
    e.qua_1 = null;
    e.priceRoot = null;
    e.lblPrice = null;
    e.diban = null;
    e.desc = null;
    e.buttonRoot = null;
    e.btnNormal = null;
    e.btnVideo = null;
    e.btnCollect = null;
    e.galaxyIndex = 0;
    e.money = 0;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    cc.tween(this.light).to(3, {
      angle: -360
    }).set({
      angle: 0
    }).union().repeatForever().start();
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
    this.addEvent();
    this.bg.scale = .001;
  };
  _ctor.prototype.start = function () {
    t.prototype.start.call(this);
  };
  _ctor.prototype.onShow = function (e) {
    t.prototype.onShow.call(this, e);
    this.galaxyIndex = Number(e);
    var o = $z1GameData.default.randomTreasure(this.galaxyIndex);
    this.treasureInfo = $z1GameData.default.treasureCfg[o];
    this.money = Math.round($z1GameData.default.formatAddValue($z1GameData.default.configInfo.galaxy.add[this.galaxyIndex]) * this.treasureInfo.time);
    this.initTreasure();
  };
  _ctor.prototype.initTreasure = function () {
    this.lblName.setLabel(this.treasureInfo.name);
    $z1BundleManager.default.setSprite(this.icon, "treasure/treasure_" + this.treasureInfo.id, $z1BundleManager.default.uiBundle);
    this.desc.string = this.treasureInfo.desc;
    this.qua_0.active = false;
    this.qua_1.active = false;
    this.light.active = false;
    this.buttonRoot.active = false;
    var t = 1 == this.treasureInfo.isHandBook && $z1GameData.default.playerData.galaxy.treasure.indexOf(this.treasureInfo.id) < 0;
    this.btnNormal.active = !t;
    this.btnVideo.active = !t;
    this.btnCollect.active = t;
    this.diban.opacity = 0;
    this.priceRoot.active = false;
    this.lblPrice.setLabel("0元");
    this.showAni();
  };
  _ctor.prototype.showAni = function () {
    cc.tween(this.bg).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).call(this.showDescAni.bind(this)).start();
  };
  _ctor.prototype.showDescAni = function () {
    cc.tween(this.diban).to(.3, {
      opacity: 255
    }).call(this.showPriceAni.bind(this)).start();
  };
  _ctor.prototype.showPriceAni = function () {
    var t = this;
    this.priceRoot.active = true;
    var e = {
      num: 0
    };
    cc.tween(e).to(1.5, {
      num: this.money
    }, {
      onUpdate: function () {
        t.lblPrice.setLabel($z1Util.default.formatCoin(Math.round(e.num)));
      }
    }).delay(.3).call(this.showQuaAni.bind(this)).start();
  };
  _ctor.prototype.showQuaAni = function () {
    var t = this.treasureInfo.isHandBook ? this.qua_1 : this.qua_0;
    this.light.active = 1 == this.treasureInfo.isHandBook;
    t.scale = 3;
    t.active = true;
    cc.tween(t).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).call(this.showButtonAni.bind(this)).start();
  };
  _ctor.prototype.showButtonAni = function () {
    this.buttonRoot.scale = .001;
    this.buttonRoot.active = true;
    cc.tween(this.buttonRoot).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).start();
  };
  _ctor.prototype.normalSell = function () {
    this.sell(this.money);
  };
  _ctor.prototype.DoubleSell = function () {
    var t = this;
    $z1platform.default.playVideo().then(function (e) {
      if (e) {
        t.sell(10 * t.money);
        $z1platform.default.tdReport("视频十倍卖出宝物");
      } else {
        $z1GameData.default.showMsg("完整观看视频才可领取奖励");
      }
    }).catch(function () {
      $z1GameData.default.showMsg("视频加载失败");
    });
  };
  _ctor.prototype.sell = function (t) {
    $z1SoundManager.default.playSound("sell");
    $z1GameData.default.playerData.galaxy.gain[this.galaxyIndex] = 0;
    $z1GameData.default.sellTreasure(t);
    $z1GameData.default.showMsg("获得" + $z1Util.default.formatCoin(t));
    this.close();
  };
  _ctor.prototype.collect = function () {
    $z1SoundManager.default.playSound("click");
    $z1GameData.default.unlockTreasure(this.galaxyIndex, this.treasureInfo.id);
    cc.director.emit($z1GameType.default.REFERSH_GALAXY);
    this.close();
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
    type: cc.Node,
    displayName: "光效"
  })], _ctor.prototype, "light", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "宝物图片"
  })], _ctor.prototype, "icon", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "宝物名字描述"
  })], _ctor.prototype, "lblName", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "赝品"
  })], _ctor.prototype, "qua_0", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "真品"
  })], _ctor.prototype, "qua_1", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "价格根节点"
  })], _ctor.prototype, "priceRoot", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "价格"
  })], _ctor.prototype, "lblPrice", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "描述底板"
  })], _ctor.prototype, "diban", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "宝物描述"
  })], _ctor.prototype, "desc", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "按钮根节点"
  })], _ctor.prototype, "buttonRoot", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "普通卖出"
  })], _ctor.prototype, "btnNormal", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "十倍卖出"
  })], _ctor.prototype, "btnVideo", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "收藏"
  })], _ctor.prototype, "btnCollect", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameTreasure")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameTreasure;