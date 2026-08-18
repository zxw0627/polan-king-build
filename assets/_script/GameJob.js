var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1BundleManager = require("BundleManager");
var $z1GuideManager = require("GuideManager");
var $z1SoundManager = require("SoundManager");
var $z1UIManager = require("UIManager");
var $z1Util = require("Util");
var $z1platform = require("platform");
var $z1BaseView = require("BaseView");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var ccp_menu = cc__decorator.menu;
var def_GameJob = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.content = null;
    e.item = null;
    e.isJoin = false;
    e.info = $z1GameData.default.configInfo.job;
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
    var t = this;
    if ($z1GuideManager.default.instance.checkGuide(4, 2)) {
      $z1GuideManager.default.instance.completeGuide();
      cc.director.emit($z1GameType.default.CLOSE_GUIDE);
    }
    $z1SoundManager.default.playSound("up");
    this.isJoin = true;
    var e = $z1GameData.default.getJobBaseAttributeByIndex(this.selectIndex)[2];
    var o = $z1GameData.default.playerData.job.lv[this.selectIndex];
    var a = $z1GameData.default.getJobGradeUp(o, e);
    if ($z1GameData.default.UseCoin(a, false)) {
      $z1platform.default.tdReport("货币升级雇佣伙伴");
      this.gradeUp();
    } else {
      if (Number($z1platform.default.netConf.zs_video_plane)) {
        $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_Video, 2, false, null, {
          openType: 2
        });
      } else {
        $z1platform.default.playVideo().then(function (e) {
          if (e) {
            $z1platform.default.tdReport("观看视频升级雇佣伙伴");
            t.gradeUp();
          }
        }).catch(function () {});
      }
      this.unschedule(this.clickGradeUp);
    }
  };
  _ctor.prototype.gradeUp = function () {
    $z1GameData.default.playerData.job.lv[this.selectIndex]++;
    var t = $z1GameData.default.playerData.job.lv[this.selectIndex];
    if (10 == t && this.selectIndex < this.table.length - 1) {
      var e = $z1GameData.default.getJobBaseAttributeByIndex(this.selectIndex + 1)[2];
      var o = $z1GameData.default.getJobGradeUp(t, e);
      this.table[this.selectIndex + 1].unlock.active = true;
      this.table[this.selectIndex + 1].video.active = $z1GameData.default.playerData.res.coin < o;
    } else {
      20 == t && $z1GameData.default.addJobFactor(this.selectIndex);
    }
    this.refreshData(this.selectIndex);
    cc.director.emit($z1GameType.default.REFERSH_AUTO);
  };
  _ctor.prototype.refreshData = function (t) {
    var e = $z1GameData.default.playerData.job.lv[t];
    var o = $z1GameData.default.getJobBaseAttributeByIndex(t)[2];
    var a = $z1GameData.default.getJobGradeUp(e, o);
    this.table[t].unlock.active = 0 == t || $z1GameData.default.playerData.job.lv[t - 1] >= 10;
    this.table[t].name.setLabel(this.info.name[t]);
    this.table[t].lv.setLabel("等级：" + e);
    this.table[t].cost.setLabel("费用：" + $z1Util.default.formatCoin(a));
    this.table[t].value.setLabel("+" + $z1Util.default.formatCoin($z1GameData.default.getJobAddAttribute(t, e)) + "/秒");
    this.table[t].video.active = this.table[t].unlock.active && $z1GameData.default.playerData.res.coin < a;
    this.table[t].red.active = this.table[t].unlock.active && $z1GameData.default.playerData.res.coin >= a;
  };
  _ctor.prototype.initData = function () {
    var t = this;
    this.table = [];
    var e = this.info.name.length;
    var o = function (e) {
      $z1GameData.default.playerData.job.lv[e];
      var o = a.content.children[e];
      o || (o = cc.instantiate(a.item)).setParent(a.content);
      o.active = true;
      var n = o.$("head");
      var i = o.$("btnGradeUp");
      $z1BundleManager.default.setSprite(n, "job/job_" + e, $z1BundleManager.default.uiBundle);
      a.table.push({
        unlock: o.$("unlock"),
        name: o.$("name"),
        lv: o.$("lv"),
        cost: i.$("cost"),
        value: i.$("value"),
        red: i.$("red"),
        video: i.$("video")
      });
      i.on("touchstart", function () {
        if (t.table[e].unlock.active) {
          t.isJoin = false;
          t.selectIndex = e;
          t.schedule(t.clickGradeUp, .1);
        } else {
          $z1GameData.default.showMsg("请先将前一位升到10级");
        }
      }, a);
      i.on("touchend", function () {
        if (t.table[e].unlock.active) {
          if (!t.isJoin) {
            t.isJoin = true, t.clickGradeUp();
          }
          t.unschedule(t.clickGradeUp);
        }
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
    var o = this;
    t.prototype.onShow.call(this, e);
    this.refresh();
    cc.tween(this.bg).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).call(function () {
      if ($z1GuideManager.default.instance.checkGuide(4, 2) && 0 == $z1GameData.default.playerData.job.lv[0]) {
        var t = o.content.children[0].$("btnGradeUp");
        var e = o.node.convertToNodeSpaceAR(t.parent.convertToWorldSpaceAR(t.position));
        console.log("🚀 ~ file: GameJob.ts:173 ~ GameJob ~ .call ~ GameData.playerData.res.coin:", $z1GameData.default.playerData.res.coin);
        $z1GameData.default.playerData.res.coin >= 1e4 && $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GUIDE, 4, false, null, {
          pos: e,
          size: t.getContentSize()
        });
      }
    }).start();
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
    cc.director.on($z1GameType.default.REFERSH_STATE, this.refresh, this);
    cc.director.on($z1GameType.default.VIDEO_GRADEUP, this.gradeUp, this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
    cc.director.off($z1GameType.default.REFERSH_STATE, this.refresh, this);
    cc.director.off($z1GameType.default.VIDEO_GRADEUP, this.gradeUp, this);
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
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameJob")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameJob;