var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1SoundManager = require("SoundManager");
var $z1UIManager = require("UIManager");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_GameFigureStart = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.failTxt = null;
    e.startTxt = null;
    e.btnStart = null;
    e.btnVideo = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.start = function () {};
  _ctor.prototype.onEnable = function () {
    this.viewAni();
  };
  _ctor.prototype.onShow = function (e) {
    t.prototype.onShow.call(this);
    if (1 == e) {
      this.startTxt.active = true;
      this.failTxt.active = false;
    } else {
      this.startTxt.active = false;
      this.failTxt.active = true;
    }
    this.btnStart.getComponentInChildren(cc.Label).string = "(" + $z1GameData.default.playerData.figure.gameCount + "/5)";
  };
  _ctor.prototype.closeClick = function () {
    this.node.active = false;
    $z1SoundManager.default.playSound("click");
  };
  _ctor.prototype.videoClick = function () {
    var t = this;
    $z1platform.default.playVideo().then(function (e) {
      if (e) {
        $z1platform.default.tdReport("玫瑰挑战_视频再来两次");
        $z1GameData.default.playerData.figure.gameCount += 2;
        $z1GameData.default.SaveData();
        t.btnStart.getComponentInChildren(cc.Label).string = "(" + $z1GameData.default.playerData.figure.gameCount + "/5)";
      } else {
        $z1GameData.default.showMsg("完整观看视频才可领取奖励");
      }
    });
  };
  _ctor.prototype.startClick = function () {
    $z1GameData.default.playerData.figure.gameCount--;
    $z1GameData.default.SaveData();
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_Figure, 3);
    this.closeClick();
    $z1platform.default.tdReport("玫瑰挑战_开始挑战");
  };
  _ctor.prototype.update = function () {
    if ($z1GameData.default.playerData.figure.gameCount > 0) {
      this.btnStart.active = true;
      this.btnVideo.active = false;
    } else {
      this.btnStart.active = false;
      this.btnVideo.active = true;
    }
  };
  cc__decorate([ccp_property({
    type: cc.Node
  })], _ctor.prototype, "failTxt", undefined);
  cc__decorate([ccp_property({
    type: cc.Node
  })], _ctor.prototype, "startTxt", undefined);
  cc__decorate([ccp_property({
    type: cc.Node
  })], _ctor.prototype, "btnStart", undefined);
  cc__decorate([ccp_property({
    type: cc.Node
  })], _ctor.prototype, "btnVideo", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameFigureStart;