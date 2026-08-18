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
var def_GameRole = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.lv = null;
    e.btnGradeUp = null;
    e.cost = null;
    e.value = null;
    e.video = null;
    e.red = null;
    e.lblClickValue = null;
    e.jobContent = null;
    e.buildContent = null;
    e.jobItem = null;
    e.jobFactor = null;
    e.buildFactor = null;
    e.btnClose = null;
    e.isJoin = false;
    e.curLv = 0;
    e.curCost = 0;
    e.curAdd = 0;
    e.JobTable = [];
    e.BuildTable = [];
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
    this.initJobData();
    this.initBuildData();
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
    var o = this;
    t.prototype.onShow.call(this, e);
    cc.tween(this.bg).to(.3, {
      scale: 1
    }, {
      easing: "backOut"
    }).call(function () {
      if ($z1GuideManager.default.instance.checkGuide(2, 2)) {
        var t = o.node.convertToNodeSpaceAR(o.btnGradeUp.parent.convertToWorldSpaceAR(o.btnGradeUp.position));
        $z1GameData.default.playerData.res.coin >= 10 && $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GUIDE, 4, false, null, {
          pos: t,
          size: o.btnGradeUp.getContentSize()
        });
      }
    }).start();
    this.initRoleInfo();
  };
  _ctor.prototype.addEvent = function () {
    var e = this;
    t.prototype.addEvent.call(this);
    cc.director.on($z1GameType.default.REFERSH_STATE, this.refreshInfo, this);
    cc.director.on($z1GameType.default.VIDEO_GRADEUP, this.gradeUp, this);
    this.btnGradeUp.on("touchstart", function () {
      e.isJoin = false;
      e.schedule(e.clickGradeUp, .1);
    }, this);
    this.btnGradeUp.on("touchend", function () {
      if (!e.isJoin) {
        e.isJoin = true;
        e.clickGradeUp();
      }
      e.unschedule(e.clickGradeUp);
    }, this);
    this.btnGradeUp.on("touchcancel", function () {
      e.unschedule(e.clickGradeUp);
    }, this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
    cc.director.off($z1GameType.default.REFERSH_STATE, this.refreshInfo, this);
    cc.director.off($z1GameType.default.VIDEO_GRADEUP, this.gradeUp, this);
  };
  _ctor.prototype.initRoleInfo = function () {
    this.refreshInfo();
    this.refreshJob();
    this.refreshBuild();
  };
  _ctor.prototype.refreshInfo = function () {
    this.buildFactor.string = $z1GameData.default.curBuildFactor + "%";
    this.jobFactor.string = $z1GameData.default.curJobFactor + "%";
    this.curLv = $z1GameData.default.playerData.base.lv;
    this.curCost = $z1GameData.default.playerGradeUp(this.curLv);
    this.curAdd = $z1GameData.default.getAddAttribute(this.curLv);
    this.lv.string = "等级：" + this.curLv;
    this.cost.string = "费用：" + $z1Util.default.formatCoin(this.curCost);
    this.value.string = "+" + $z1Util.default.formatCoin(this.curAdd) + "/点击";
    this.video.active = $z1GameData.default.playerData.res.coin < this.curCost;
    this.red.active = $z1GameData.default.playerData.res.coin >= this.curCost;
    this.lblClickValue.string = "当前点击收益：" + $z1Util.default.formatCoin($z1GameData.default.getSelfAttribute());
  };
  _ctor.prototype.gradeUp = function () {
    $z1GameData.default.curVideoFactor = $z1GameData.default.isLight ? $z1GameData.default.curVideoFactor : 1;
    $z1GameData.default.playerData.base.lv++;
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
    this.refreshInfo();
  };
  _ctor.prototype.clickGradeUp = function () {
    var t = this;
    if ($z1GuideManager.default.instance.checkGuide(2, 2)) {
      $z1GuideManager.default.instance.completeGuide();
      cc.director.emit($z1GameType.default.CLOSE_GUIDE);
      var e = this.node.convertToNodeSpaceAR(this.btnClose.parent.convertToWorldSpaceAR(this.btnClose.position));
      $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GUIDE, 4, false, null, {
        pos: e,
        size: this.btnClose.getContentSize(),
        isClose: true
      });
    }
    this.isJoin = true;
    $z1SoundManager.default.playSound("up");
    if ($z1GameData.default.UseCoin(this.curCost)) {
      this.gradeUp();
    } else {
      if (Number($z1platform.default.netConf.zs_video_plane)) {
        $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_Video, 2, false, null, {
          openType: 1
        });
      } else {
        $z1platform.default.playVideo().then(function (e) {
          if (e) {
            $z1platform.default.tdReport("观看视频升级主角等级");
            t.gradeUp();
          }
        }).catch(function () {});
      }
      this.unschedule(this.clickGradeUp);
    }
  };
  _ctor.prototype.initJobData = function () {
    this.JobTable = [];
    var t = $z1GameData.default.configInfo.job.name.length;
    for (var e = 0; e < t; e++) {
      var o = this.jobContent.children[e];
      o || (o = cc.instantiate(this.jobItem)).setParent(this.jobContent);
      o.active = true;
      var a = o.$("name");
      var n = o.$("head");
      var i = o.$("factor");
      $z1BundleManager.default.setSprite(n, "job/job_" + e, $z1BundleManager.default.uiBundle);
      a.setLabel($z1GameData.default.configInfo.job.name[e]);
      i.setLabel("+" + $z1GameData.default.configInfo.job.factor[e] + "%");
      this.JobTable.push({
        name: a,
        factor: i
      });
    }
  };
  _ctor.prototype.refreshJob = function () {
    var t = $z1GameData.default.configInfo.job.name.length;
    var e = function (t) {
      var e = o.jobContent.children[t];
      if ($z1GameData.default.playerData.job.lv[t] < 20) {
        cc.assetManager.getBundle("internal").load("materials/builtin-2d-gray-sprite", function (t, o) {
          e.$("panel_3").getComponent(cc.Sprite).setMaterial(0, o);
          e.$("head").getComponent(cc.Sprite).setMaterial(0, o);
        });
      } else {
        cc.assetManager.getBundle("internal").load("materials/builtin-2d-sprite", function (t, o) {
          e.$("panel_3").getComponent(cc.Sprite).setMaterial(0, o);
          e.$("head").getComponent(cc.Sprite).setMaterial(0, o);
        });
      }
      var a = $z1GameData.default.playerData.job.lv[t] < 20 ? new cc.Color().fromHEX("#808080") : new cc.Color().fromHEX("#638D42");
      o.JobTable[t].name.color = a;
      o.JobTable[t].factor.color = a;
    };
    var o = this;
    for (var a = 0; a < t; a++) {
      e(a);
    }
  };
  _ctor.prototype.initBuildData = function () {
    this.BuildTable = [];
    var t = $z1GameData.default.configInfo.build.name.length;
    for (var e = 0; e < t; e++) {
      var o = this.buildContent.children[e];
      o || (o = cc.instantiate(this.jobItem)).setParent(this.buildContent);
      o.active = true;
      var a = o.$("name");
      var n = o.$("head");
      var i = o.$("factor");
      $z1BundleManager.default.setSprite(n, "build/build_" + e, $z1BundleManager.default.uiBundle);
      a.setLabel($z1GameData.default.configInfo.build.name[e]);
      i.setLabel("+" + $z1GameData.default.configInfo.build.factor[e] + "%");
      this.BuildTable.push({
        name: a,
        factor: i
      });
    }
  };
  _ctor.prototype.refreshBuild = function () {
    var t = $z1GameData.default.configInfo.build.name.length;
    var e = function (t) {
      var e = o.buildContent.children[t];
      if (0 == $z1GameData.default.playerData.build.unlock[t]) {
        cc.assetManager.getBundle("internal").load("materials/builtin-2d-gray-sprite", function (t, o) {
          e.$("panel_3").getComponent(cc.Sprite).setMaterial(0, o);
          e.$("head").getComponent(cc.Sprite).setMaterial(0, o);
        });
      } else {
        cc.assetManager.getBundle("internal").load("materials/builtin-2d-sprite", function (t, o) {
          e.$("panel_3").getComponent(cc.Sprite).setMaterial(0, o);
          e.$("head").getComponent(cc.Sprite).setMaterial(0, o);
        });
      }
      var a = 0 == $z1GameData.default.playerData.build.unlock[t] ? new cc.Color().fromHEX("#808080") : new cc.Color().fromHEX("#638D42");
      o.BuildTable[t].name.color = a;
      o.BuildTable[t].factor.color = a;
    };
    var o = this;
    for (var a = 0; a < t; a++) {
      e(a);
    }
  };
  _ctor.prototype.close = function (t) {
    undefined === t && (t = null);
    t && $z1SoundManager.default.playSound("click");
    this.node.active = false;
    if ($z1GuideManager.default.instance.checkGuide(3, 1)) {
      cc.director.emit($z1GameType.default.CLOSE_GUIDE);
      $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GUIDE, 4, false, null, {
        pos: cc.v3(),
        size: cc.size(200, 200)
      });
    }
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
    displayName: "等级"
  })], _ctor.prototype, "lv", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "升级按钮"
  })], _ctor.prototype, "btnGradeUp", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "升级花费"
  })], _ctor.prototype, "cost", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "升级收益"
  })], _ctor.prototype, "value", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "看视频升级"
  })], _ctor.prototype, "video", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "红点"
  })], _ctor.prototype, "red", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "点击收益"
  })], _ctor.prototype, "lblClickValue", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "兼职根节点"
  })], _ctor.prototype, "jobContent", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "企业根节点"
  })], _ctor.prototype, "buildContent", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "兼职预制"
  })], _ctor.prototype, "jobItem", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "兼职加成"
  })], _ctor.prototype, "jobFactor", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "企业加成"
  })], _ctor.prototype, "buildFactor", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "关闭按钮"
  })], _ctor.prototype, "btnClose", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameRole")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameRole;