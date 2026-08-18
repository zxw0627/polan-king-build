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
var $z1ItemFigure = require("ItemFigure");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameFigure = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.layout = null;
    e.lineRoot = null;
    e.root = null;
    e.itemPrefab = [];
    e.arrow = null;
    e.mask = null;
    e.btnTips = null;
    e.setpDes = null;
    e.des1 = null;
    e.itemlist = new Array();
    e.setp = 7;
    e.tipStep = -1;
    e.maxTipStep = -1;
    e.isCanTips = true;
    e.cfg = new Array();
    e.fandir = {
      0: 1,
      1: 0,
      2: 3,
      3: 2
    };
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onEnable = function () {
    this.gameStart();
    this.viewAni();
  };
  _ctor.prototype.gameStart = function () {
    $z1GameData.default.playerData.figure.tryCount++;
    this.des1.string = "选择最底层的任何方块开始游戏";
    this.lineRoot.removeAllChildren();
    var t = new Date().getDate();
    this.levelCfg = $z1GameData.default.configInfo.figure[t];
    this.unscheduleAllCallbacks();
    this.lockTouch(false);
    this.setp = this.levelCfg.setp;
    this.itemlist = new Array();
    this.tipStep = -1;
    this.isCanTips = true;
    this.arrow.active = false;
    this.root.removeAllChildren();
    var e = 0;
    var o = this.levelCfg.list;
    this.cfg = new Array();
    for (var a = 0; a < o.length; a++) {
      this.cfg.push([]);
      var n = o[a].split(",");
      for (var i = 0; i < n.length; i++) {
        this.cfg[a].push(Number(n[i]));
      }
    }
    for (a = 0; a < this.cfg.length; a++) {
      this.itemlist.push([]);
      for (i = 0; i < this.cfg[a].length; i++) {
        var c = this.cfg[a][i];
        var l = cc.instantiate(this.itemPrefab[c]);
        l.parent = this.root;
        l.position = this.layout.children[e].position.clone();
        var s = l.addComponent($z1ItemFigure.default);
        s.hid = i;
        s.vid = a;
        s.index = c;
        s.hide();
        this.addClickEventByItem(s);
        this.itemlist[a].push(s);
        e++;
      }
    }
    this.checkItemState();
    this.checkTips();
  };
  _ctor.prototype.checkItemState = function () {
    this.resetTraverse();
    var t = this.getLastVItem();
    for (var e = 0; e < t.length; e++) {
      this.traverseAround(t[e], function (t) {
        console.log("aaaa");
        t.show();
      });
    }
    for (e = 0; e < this.itemlist.length; e++) {
      for (var o = 0; o < this.itemlist[e].length - 1; o++) {
        var a = this.itemlist[e][o + 1];
        this.itemlist[e][o] && (this.itemlist[e][o].rightItem = a);
      }
    }
    for (e = 0; e < this.itemlist[0].length; e++) {
      for (o = 0; o < this.itemlist.length - 1; o++) {
        var n = this.itemlist[o + 1][e];
        this.itemlist[o][e] && (this.itemlist[o][e].downItem = n);
      }
    }
    this.setpDes.string = "还剩" + this.setp + "步";
  };
  _ctor.prototype.addClickEventByItem = function (t) {
    var e = this;
    t.node.on(cc.Node.EventType.TOUCH_START, function () {
      t.touchStart();
    });
    t.node.on(cc.Node.EventType.TOUCH_END, function () {
      t.touchEnd();
      if (0 != t.isCanTouch && !(e.setp <= 0)) {
        e.isCanTips = false;
        if (e.tipStep >= e.levelCfg.setp - e.setp) {
          if (0 == t.isTips) {
            return void $z1GameData.default.showMsg("按照提示点击哦~");
          }
          e.isCanTips = true;
          e.arrow.active = false;
          e.checkTips();
        }
        e.setp--;
        e.resetTraverse();
        e.traverseAround(t, function (t) {
          e.desItem(t);
        });
        e.lockTouch(true);
        e.checkDownItem();
        e.checkItemState();
        e.scheduleOnce(function () {
          e.lockTouch(false);
          e.checkWin();
        }, .2);
        e.des1.string = "<color=#ffffff>第</c><color=#e35332>" + $z1GameData.default.playerData.figure.tryCount + "</c><color=#ffffff>次尝试</color>";
      }
    }, this);
  };
  _ctor.prototype.checkWin = function () {
    var t = this;
    var e = true;
    for (var o = 0; o < this.itemlist.length; o++) {
      for (var a = 0; a < this.itemlist[o].length; a++) {
        if (this.itemlist[o][a]) {
          e = false;
          break;
        }
      }
    }
    if (e) {
      this.lockTouch(true);
      console.log("胜利");
      $z1GameData.default.showMsg("挑战成功");
      $z1GameData.default.playerData.figure.isGameWin = true;
      this.scheduleOnce(function () {
        t.node.active = false;
      }, 1);
    } else if (this.setp <= 0) {
      this.lockTouch(true), console.log("失败"), $z1GameData.default.showMsg("步数已经用完了~"), this.scheduleOnce(function () {
        t.node.active = false;
        $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_FigureStart, 3, false, null, 2);
      }, 1);
    }
  };
  _ctor.prototype.checkDownItem = function () {
    var t = 0;
    for (var e = 0; e < this.itemlist[0].length; e++) {
      var o = 0;
      for (var a = this.itemlist.length - 1; a >= 0; a--) {
        var n = this.itemlist[a][e];
        if (null == n) {
          ++o > t && (t = o);
        } else if (o > 0) {
          this.itemlist[n.vid][n.hid] = null, n.downOneMove(o), this.itemlist[n.vid][n.hid] = n;
        }
      }
    }
    return t;
  };
  _ctor.prototype.desItem = function (t) {
    this.itemlist[t.vid][t.hid] = null;
    t.remove();
  };
  _ctor.prototype.getLastVItem = function () {
    var t = [];
    for (var e = 0; e < this.itemlist.length; e++) {
      for (var o = 0; o < this.itemlist[e].length; o++) {
        var a = this.itemlist[e][o];
        a && 4 == a.vid && t.push(a);
      }
    }
    return t;
  };
  _ctor.prototype.resetTraverse = function () {
    for (var t = 0; t < this.itemlist.length; t++) {
      for (var e = 0; e < this.itemlist[t].length; e++) {
        var o = this.itemlist[t][e];
        if (o) {
          o.resetTraverse();
          o.hide();
        }
      }
    }
  };
  _ctor.prototype.traverseAround = function (t, e) {
    var o = [this.getDirItem(t.vid + 1, t.hid), this.getDirItem(t.vid - 1, t.hid), this.getDirItem(t.vid, t.hid - 1), this.getDirItem(t.vid, t.hid + 1), t];
    for (var a = 0; a < o.length; a++) {
      var n = o[a];
      if (n && 0 == n.isTraverse && t.index == n.index) {
        n.isTraverse = true;
        e && e(n, a);
        this.traverseAround(n, e);
      }
    }
  };
  _ctor.prototype.getDirItem = function (t, e) {
    if (t >= this.itemlist.length || t < 0) {
      return null;
    } else {
      if (e >= this.itemlist[t].length || e < 0) {
        return null;
      } else {
        return this.itemlist[t][e];
      }
    }
  };
  _ctor.prototype.lockTouch = function (t) {
    this.mask.active = t;
  };
  _ctor.prototype.tipsClick = function () {
    var t = this;
    $z1platform.default.playVideo().then(function (e) {
      if (e) {
        $z1platform.default.tdReport("玫瑰挑战_视频获得提示");
        t.levelCfg.tipsSteps.length > t.maxTipStep && t.maxTipStep++;
        t.checkTips();
      } else {
        $z1GameData.default.showMsg("完整观看视频才可领取奖励");
      }
    });
  };
  _ctor.prototype.checkTips = function () {
    var t = this;
    if (this.maxTipStep > this.tipStep) {
      this.tipStep++;
      this.scheduleOnce(function () {
        t.showTips(t.levelCfg.tipsSteps[t.tipStep]);
      });
    }
  };
  _ctor.prototype.showTips = function (t) {
    this.itemlist[4][t].isTips = true;
    var e = this.layout.children[this.layout.childrenCount - 5 + t];
    this.arrow.x = e.x;
    this.arrow.y = e.y;
    this.arrow.active = true;
    this.isCanTips = false;
  };
  _ctor.prototype.update = function () {
    this.btnTips.active = !this.arrow.active && this.isCanTips && this.levelCfg.tipsSteps.length - 1 > this.maxTipStep;
  };
  _ctor.prototype.closeClick = function () {
    this.node.active = false;
    $z1SoundManager.default.playSound("click");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_FigureStart, 3, false, null, 1);
  };
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "layout"
  })], _ctor.prototype, "layout", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "lineRoot"
  })], _ctor.prototype, "lineRoot", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "root"
  })], _ctor.prototype, "root", undefined);
  cc__decorate([ccp_property({
    type: [cc.Node]
  })], _ctor.prototype, "itemPrefab", undefined);
  cc__decorate([ccp_property({
    type: cc.Node
  })], _ctor.prototype, "arrow", undefined);
  cc__decorate([ccp_property({
    type: cc.Node
  })], _ctor.prototype, "mask", undefined);
  cc__decorate([ccp_property({
    type: cc.Node
  })], _ctor.prototype, "btnTips", undefined);
  cc__decorate([ccp_property({
    type: cc.Label
  })], _ctor.prototype, "setpDes", undefined);
  cc__decorate([ccp_property({
    type: cc.RichText
  })], _ctor.prototype, "des1", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameFigure")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameFigure;