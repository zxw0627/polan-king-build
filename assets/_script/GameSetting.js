var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1SoundManager = require("SoundManager");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameSetting = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.btnSound = null;
    e.btnMusic = null;
    e.lblVersion = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
    this.addEvent();
    this.bg.scale = .001;
    this.updateSetting();
    this.lblVersion.string = "版本号：" + $z1platform.default.version;
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
  };
  _ctor.prototype.updateSetting = function () {
    this.btnSound.$("open").active = 1 == $z1GameData.default.bSoundVal;
    this.btnSound.$("close").active = 0 == $z1GameData.default.bSoundVal;
    this.btnMusic.$("open").active = 1 == $z1GameData.default.bMusicVal;
    this.btnMusic.$("close").active = 0 == $z1GameData.default.bMusicVal;
  };
  _ctor.prototype.changeSound = function () {
    $z1GameData.default.bSoundVal = $z1GameData.default.bSoundVal ? 0 : 1;
    $z1SoundManager.default.setSoundVal($z1GameData.default.bSoundVal);
    $z1SoundManager.default.playSound("click");
    this.updateSetting();
  };
  _ctor.prototype.changeMusic = function () {
    $z1GameData.default.bMusicVal = $z1GameData.default.bMusicVal ? 0 : 1;
    $z1SoundManager.default.setMusicVal($z1GameData.default.bMusicVal);
    this.updateSetting();
  };
  _ctor.prototype.showGamePanel = function () {
    var t = this;
    cc.loader.loadRes("drawGame/prefab/panel_game", cc.Prefab, function (e, o) {
      if (!e) {
        var a = cc.instantiate(o);
        a.parent = t.node.parent;
        a.active = true;
      }
    });
    cc.assetManager.loadBundle("drawGame", function (e, o) {
      o && o.load("prefab/panel_game", function (e, o) {
        if (!e) {
          var a = cc.instantiate(o);
          a.parent = t.node.parent;
          a.active = true;
        }
      });
    });
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
    displayName: "音效开关"
  })], _ctor.prototype, "btnSound", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "音乐开关"
  })], _ctor.prototype, "btnMusic", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "版本号"
  })], _ctor.prototype, "lblVersion", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameSetting")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameSetting;