var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1PlatformAd = require("PlatformAd");
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
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
var def_GameHome = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.bg = null;
    e.lblCoin = null;
    e.coinIcon = null;
    e.lblClickValue = null;
    e.lblAutoValue = null;
    e.lblAssetValue = null;
    e.autoPro = null;
    e.lblAutoTime = null;
    e.addPro = null;
    e.lblAddTime = null;
    e.btnCompostion = null;
    e.head = null;
    e.top = null;
    e.redPoints = [];
    e.btnRole = null;
    e.btnJob = null;
    e.light = null;
    e.txtClickCount = null;
    e.btnRecorderVideo = null;
    e.videoTimeNode = null;
    e.btnTalent = null;
    e.btnAddDesk = null;
    e.btnSide = null;
    e.btnCaishen = null;
    e.universeRed = null;
    e.recorderState = "未录制";
    e.currentDataTime = new Date();
    e.curCoin = 0;
    e.clickValue = 0;
    e.autoValue = 0;
    e.assetValue = 0;
    e.rolePos = null;
    e.clickCount = 0;
    e.lv = 0;
    e.lastAutoT = 0;
    e.lastAddT = 0;
    e.timecounter = 10;
    e.lastBigTime = 0;
    e.curCaishenTargetPos = cc.v3();
    e.caishenInfo = {
      radiu: 79,
      speed: 200,
      state: 1
    };
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    t.prototype.onLoad.call(this);
  };
  _ctor.prototype.onEnable = function () {
    t.prototype.onEnable.call(this);
    $z1platform.default.tdReport("进入主界面");
    this.addEvent();
    this.btnTalent.active = cc.sys.isBrowser;
  };
  _ctor.prototype.start = function () {
    var e = this;
    t.prototype.start.call(this);
    this.rolePos = this.node.getChildByName("rolePos");
    var o = $z1GameData.default.configInfo.job.name.length;
    cc.assetManager.loadBundle("sp", function (t, a) {
      var n = 0;
      e.schedule(function () {
        var t = e.rolePos.children[n].children[1];
        var o = "role/" + n + "/idle";
        a.load(o, sp.SkeletonData, function (e, o) {
          var a = t.getComponent(sp.Skeleton);
          a.skeletonData = o;
          a.premultipliedAlpha = true;
          a.setAnimation(0, "idle", true);
        });
        n++;
      }, 0, o, .1);
    });
  };
  _ctor.prototype.recorder60End = function () {
    if ("录制中" == this.recorderState) {
      $z1PlatformAd.default.platform.recorderStop();
      this.recorderState = "录制完成";
      this.videoTimeNode.children[1].getComponent(cc.Animation).stop();
    }
  };
  _ctor.prototype.openShare = function () {
    var t = Reflect.has($z1PlatformAd.default.platform.params, "recorderTime") ? $z1PlatformAd.default.platform.params.recorderTime : 5;
    if (t < 3) {
      $z1GameData.default.showMsg("录制时间小于3秒");
    } else if (t > 300) {
      $z1GameData.default.showMsg("录制时间大于300秒");
    } else {
      $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_SHARE, 2);
    }
  };
  _ctor.prototype.recorderVideoClick = function () {
    $z1SoundManager.default.playSound("click");
    switch (this.recorderState) {
      case "未录制":
        this.recorderState = "录制中";
        $z1PlatformAd.default.platform.recorderStart();
        this.scheduleOnce(this.recorder60End, 60);
        this.videoTimeNode.children[1].getComponent(cc.Animation).play();
        break;
      case "录制中":
        this.recorderState = "未录制";
        $z1PlatformAd.default.platform.recorderStop();
        this.unschedule(this.recorder60End);
        this.openShare();
        break;
      case "录制完成":
        this.recorderState = "未录制";
        this.openShare();
    }
  };
  _ctor.prototype.setTextClickCount = function () {
    this.txtClickCount.string = $z1GameData.default.playerData.base.compositonCount.toString();
  };
  _ctor.prototype.onShow = function (e) {
    var o = this;
    t.prototype.onShow.call(this, e);
    this.init();
    this.updateRes();
    this.schedule(function () {
      if (0 != $z1GameData.default.canupdate) {
        $z1GameData.default.AssetAutoAdd();
        $z1GameData.default.StarAutoAdd();
        $z1GameData.default.GalaxyAutoAdd();
        o.autoAddCoin();
        o.scheduleOnce(function () {
          cc.director.emit($z1GameType.default.REFERSH_STATE);
        });
        o.lastAddT > 0 && o.Cs_Add();
        o.lastAutoT > 0 && o.Cs_Auto();
        o.refreshRedPointState();
      }
    }, 1);
    $z1SoundManager.default.init("BGM");
    this.checkGuideStep();
    Number($z1platform.default.netConf.zs_caishen_show) && this.delayCaishen();
    if (cc.sys.platform != cc.sys.BYTEDANCE_GAME) {
      this.videoTimeNode.active = false;
      this.btnRecorderVideo.active = false;
      this.btnAddDesk.active = false;
      this.btnSide.active = false;
    } else {
      this.btnSide.active = 1 == Number($z1platform.default.netConf.zs_side_show) && 0 == $z1GameData.default.playerData.base.isGetSideIntoGift;
      if (cc.sys.os == cc.sys.OS_IOS) {
        this.btnAddDesk.active = 0 == $z1GameData.default.playerData.base.isAddDesk, console.log("进入苹果检测");
      } else {
        $z1PlatformAd.default.platform.checkDesk().then(function (t) {
          if (t) {
            console.log("安卓检测已添加桌面");
            o.btnAddDesk.active = false;
          } else {
            console.log("安卓检测未添加桌面");
            o.btnAddDesk.active = true;
          }
        });
      }
    }
  };
  _ctor.prototype.checkGuideStep = function () {
    if ($z1GuideManager.default.instance.checkGuide(1, 1) && 0 == $z1GameData.default.playerData.res.coin || $z1GuideManager.default.instance.checkGuide(3, 1)) {
      $z1UIManager.UIManager.inst.returnHome();
      $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GUIDE, 4, false, null, {
        pos: cc.v3(),
        size: cc.size(200, 200)
      });
    }
  };
  _ctor.prototype.init = function () {
    this.refreshClickValue();
    this.refreshAutoValue();
    this.refreshCompotionState();
    this.targetPos = this.node.convertToNodeSpaceAR(this.top.convertToWorldSpaceAR(this.head.position));
    this.targetPos = cc.v3(this.targetPos.x, this.targetPos.y * $z1Util.default.getWindowScaling());
  };
  _ctor.prototype.refreshRedPointState = function () {
    for (var t = 0; t < this.redPoints.length; t++) {
      var e = false;
      var o = 0;
      var a = undefined;
      var n = undefined;
      switch (t) {
        case $z1GameType.RED_TYPE.升级:
          e = this.curCoin >= $z1GameData.default.playerGradeUp($z1GameData.default.playerData.base.lv);
          break;
        case $z1GameType.RED_TYPE.雇佣:
          o = $z1GameData.default.configInfo.job.name.length;
          for (var i = 0; i < o; i++) {
            var r = $z1GameData.default.playerData.job.lv[i];
            if (!(0 == i || $z1GameData.default.playerData.job.lv[i - 1] >= 10)) {
              break;
            }
            var s = $z1GameData.default.getJobBaseAttributeByIndex(i)[2];
            var u = $z1GameData.default.getJobGradeUp(r, s);
            if (this.curCoin >= u) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.房产:
          n = $z1GameData.default.playerData.real;
          o = (a = $z1GameData.default.configInfo.real).name.length;
          for (var d = 0; d < o; d++) {
            if (0 == n.unlock[d] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[d])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.古董:
          n = $z1GameData.default.playerData.art;
          o = (a = $z1GameData.default.configInfo.art).name.length;
          for (var p = 0; p < o; p++) {
            if (0 == n.unlock[p] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[p])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.企业:
          n = $z1GameData.default.playerData.build;
          o = (a = $z1GameData.default.configInfo.build).name.length;
          for (var f = 0; f < o; f++) {
            if (0 == n.unlock[f] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[f])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.星球:
          n = $z1GameData.default.playerData.star;
          o = (a = $z1GameData.default.configInfo.star).name.length;
          for (var h = 0; h < o; h++) {
            if (0 == n.unlock[h] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[h])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.城市:
          o = $z1GameData.default.configInfo.city.name.length;
          for (var y = 0; y < o; y++) {
            r = $z1GameData.default.playerData.city.lv[y];
            s = $z1GameData.default.getCityBaseAttributeByIndex(y)[2];
            u = $z1GameData.default.getCityGradeUp(r, s);
            if (this.curCoin >= u) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.星系:
          n = $z1GameData.default.playerData.galaxy;
          o = (a = $z1GameData.default.configInfo.galaxy).name.length;
          for (var v = 0; v < o; v++) {
            var m = Math.ceil(n.gain[v] / $z1GameData.default.formatAddValue(a.add[v]));
            if (0 == n.unlock[v] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[v]) || m >= 60) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.飞船:
          n = $z1GameData.default.playerData.airship;
          o = (a = $z1GameData.default.configInfo.airship).name.length;
          for (var g = 0; g < o; g++) {
            if (0 == n.unlock[g] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[g])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.空间站:
          n = $z1GameData.default.playerData.spaceStation;
          o = (a = $z1GameData.default.configInfo.spaceStation).name.length;
          for (var b = 0; b < o; b++) {
            if (0 == n.unlock[b] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[b])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.银河废墟:
          n = $z1GameData.default.playerData.galacticRuins;
          o = (a = $z1GameData.default.configInfo.galacticRuins).name.length;
          for (var _ = 0; _ < o; _++) {
            if (0 == n.unlock[_] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[_])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.流亡部落:
          n = $z1GameData.default.playerData.exileTribe;
          o = (a = $z1GameData.default.configInfo.exileTribe).name.length;
          for (var D = 0; D < o; D++) {
            if (0 == n.unlock[D] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[D])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.星际城市:
          n = $z1GameData.default.playerData.starCity;
          o = (a = $z1GameData.default.configInfo.starCity).name.length;
          for (var S = 0; S < o; S++) {
            if (0 == n.unlock[S] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[S])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.三T文明:
          n = $z1GameData.default.playerData.threeT;
          o = (a = $z1GameData.default.configInfo.threeT).name.length;
          for (var w = 0; w < o; w++) {
            if (0 == n.unlock[w] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[w])) {
              e = true;
              break;
            }
          }
          break;
        case $z1GameType.RED_TYPE.慈心宇宙:
          n = $z1GameData.default.playerData.universe;
          o = (a = $z1GameData.default.configInfo.universe).name.length;
          for (var E = 0; E < o; E++) {
            if (0 == n.unlock[E] && this.curCoin >= $z1GameData.default.formatAddValue(a.unlock[E])) {
              e = true;
              break;
            }
          }
      }
      this.redPoints[t].active = e;
      this.universeRed.active = this.redPoints[$z1GameType.RED_TYPE.飞船].active || this.redPoints[$z1GameType.RED_TYPE.空间站].active || this.redPoints[$z1GameType.RED_TYPE.银河废墟].active || this.redPoints[$z1GameType.RED_TYPE.流亡部落].active || this.redPoints[$z1GameType.RED_TYPE.星际城市].active || this.redPoints[$z1GameType.RED_TYPE.三T文明].active || this.redPoints[$z1GameType.RED_TYPE.慈心宇宙].active;
    }
  };
  _ctor.prototype.refreshClickValue = function () {
    this.clickValue = $z1GameData.default.getSelfAttribute();
    this.lblClickValue.string = $z1Util.default.formatCoin(this.clickValue) + "/次";
  };
  _ctor.prototype.refreshAutoValue = function () {
    this.autoValue = $z1GameData.default.getAutoValue();
    this.lblAutoValue.string = $z1Util.default.formatCoin(this.autoValue) + "/秒";
  };
  _ctor.prototype.refreshAssetValue = function () {
    this.assetValue = $z1GameData.default.curAssetValue;
    this.lblAssetValue.string = $z1Util.default.formatCoin(this.assetValue);
  };
  _ctor.prototype.openTalent = function () {};
  _ctor.prototype.openRole = function () {
    if ($z1GuideManager.default.instance.checkGuide(2, 1)) {
      $z1GuideManager.default.instance.completeGuide();
      cc.director.emit($z1GameType.default.CLOSE_GUIDE);
    }
    $z1SoundManager.default.playSound("click");
    $z1platform.default.tdReport("进入升级界面");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_ROLE);
  };
  _ctor.prototype.openJob = function () {
    if ($z1GuideManager.default.instance.checkGuide(4, 1) && this.curCoin >= 1e4) {
      $z1GuideManager.default.instance.completeGuide();
      cc.director.emit($z1GameType.default.CLOSE_GUIDE);
    }
    $z1SoundManager.default.playSound("click");
    $z1platform.default.tdReport("进入雇佣界面");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_JOB);
  };
  _ctor.prototype.openAsset = function (t, e) {
    $z1SoundManager.default.playSound("click");
    switch (Number(e)) {
      case $z1GameType.ASSET_TYPE.art:
        $z1platform.default.tdReport("进入古董界面");
        break;
      case $z1GameType.ASSET_TYPE.build:
        $z1platform.default.tdReport("进入企业界面");
        break;
      case $z1GameType.ASSET_TYPE.real:
        $z1platform.default.tdReport("进入房产界面");
    }
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_Asset, 1, false, null, e);
  };
  _ctor.prototype.openCity = function () {
    $z1SoundManager.default.playSound("click");
    $z1platform.default.tdReport("进入城市界面");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_CITY);
  };
  _ctor.prototype.openStar = function () {
    $z1SoundManager.default.playSound("click");
    $z1platform.default.tdReport("进入设置界面");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_STAR);
  };
  _ctor.prototype.openSetting = function () {
    $z1SoundManager.default.playSound("click");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_SETTING);
  };
  _ctor.prototype.openSide = function () {
    $z1SoundManager.default.playSound("click");
    $z1platform.default.tdReport("打开侧边栏礼包界面");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_SIDEINTO);
  };
  _ctor.prototype.openGalaxy = function () {
    $z1SoundManager.default.playSound("click");
    $z1platform.default.tdReport("打开星系界面");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GALAXY);
  };
  _ctor.prototype.clickAddCoin = function (t) {
    var e = this;
    $z1SoundManager.default.playSound("fly");
    var o = t.getLocation();
    o = this.node.convertToNodeSpaceAR(o);
    var a = $z1GameData.default.playerData.base.compositonCount;
    for (var n = 0; n < a; n++) {
      this.scheduleOnce(function () {
        $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_COIN_FLY, 4, false, null, {
          x: o.x,
          y: o.y,
          targetPos: e.targetPos
        }, true);
      }, .05 * n);
    }
    $z1GameData.default.AddCoin(this.clickValue * a, false);
    this.refreshRedPointState();
    if ($z1GuideManager.default.instance.checkGuide(3, 1)) {
      cc.director.emit($z1GameType.default.CLOSE_GUIDE);
      $z1GuideManager.default.instance.completeGuide();
    } else if ($z1GuideManager.default.instance.checkGuide(1, 1)) {
      $z1GameData.default.guideClickCount++, $z1GameData.default.guideClickCount >= 5 && (cc.director.emit($z1GameType.default.CLOSE_GUIDE), $z1GuideManager.default.instance.completeGuide());
    }
    if (cc.director.getTotalTime() - this.lastBigTime > 500) {
      this.lastBigTime = cc.director.getTotalTime();
      cc.Tween.stopAllByTarget(this.lblCoin.node);
      cc.Tween.stopAllByTarget(this.coinIcon);
      cc.tween(this.lblCoin.node).to(.25, {
        scale: 1.3
      }).delay(.25).to(.25, {
        scale: 1
      }).start();
      cc.tween(this.coinIcon).to(.25, {
        scale: 1.3
      }).delay(.25).to(.25, {
        scale: 1
      }).start();
    }
  };
  _ctor.prototype.autoAddCoin = function (t) {
    undefined === t && (t = true);
    $z1GameData.default.playerData.res.coin += this.autoValue;
    t && $z1GameData.default.SaveData();
  };
  _ctor.prototype.videoAuto = function () {
    var t = this;
    if (this.lastAutoT > 0) {
      $z1GameData.default.showMsg("已存在该效果");
    } else {
      $z1platform.default.playVideo().then(function (e) {
        if (e) {
          $z1platform.default.tdReport("观看视频获得自动点击");
          t.initAutoInfo();
        }
      }).catch(function () {});
    }
  };
  _ctor.prototype.initAutoInfo = function () {
    this.lastAutoT = 300;
    this.autoPro.node.active = true;
    this.refreshAutoInfo();
  };
  _ctor.prototype.Cs_Auto = function () {
    this.lastAutoT--;
    this.refreshAutoInfo();
    this.lastAutoT <= 0 && (this.autoPro.node.active = false);
  };
  _ctor.prototype.refreshAutoInfo = function () {
    this.lblAutoTime.string = this.lastAutoT + "秒";
    this.autoPro.fillRange = this.lastAutoT / 300;
    var t = $z1GameData.default.playerData.base.compositonCount;
    $z1GameData.default.AddCoin(this.clickValue * t, false);
  };
  _ctor.prototype.addCompostionCount = function () {
    var t = this;
    $z1platform.default.playVideo().then(function (e) {
      if (e) {
        $z1platform.default.tdReport("观看视频增加单次点击次数");
        $z1GameData.default.playerData.base.compositonCount++;
        t.refreshCompotionState();
        $z1GameData.default.showMsg("单次点击收益x" + $z1GameData.default.playerData.base.compositonCount);
        $z1GameData.default.SaveData();
        t.setTextClickCount();
      }
    }).catch(function () {});
  };
  _ctor.prototype.refreshCompotionState = function () {
    this.btnCompostion.active = $z1GameData.default.playerData.base.compositonCount < 10;
  };
  _ctor.prototype.videoAdd = function () {
    var t = this;
    if (this.lastAddT > 0) {
      $z1GameData.default.showMsg("已存在该效果");
    } else {
      $z1platform.default.playVideo().then(function (e) {
        if (e) {
          $z1platform.default.tdReport("观看视频获得1.5倍奖励");
          t.initAddInfo();
        }
      }).catch(function () {});
    }
  };
  _ctor.prototype.initAddInfo = function () {
    $z1GameData.default.isLight = true;
    this.light.active = true;
    $z1GameData.default.curVideoFactor *= 1.5;
    this.refreshAutoValue();
    this.refreshClickValue();
    this.lastAddT = 300;
    this.addPro.node.active = true;
    this.refreshAddInfo();
  };
  _ctor.prototype.Cs_Add = function () {
    this.lastAddT--;
    this.refreshAddInfo();
    if (this.lastAddT <= 0) {
      $z1GameData.default.isLight = false;
      this.refreshAutoValue();
      this.refreshClickValue();
      this.addPro.node.active = false;
      this.light.active = false;
    }
  };
  _ctor.prototype.refreshAddInfo = function () {
    this.lblAddTime.string = this.lastAddT + "秒";
    this.addPro.fillRange = this.lastAddT / 300;
  };
  _ctor.prototype.update = function (t) {
    if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
      if ("未录制" == this.recorderState) {
        this.btnRecorderVideo.children[0].active = true;
        this.btnRecorderVideo.children[1].active = false;
        this.btnRecorderVideo.children[2].active = false;
        this.videoTimeNode.active = false;
      } else if ("录制中" == this.recorderState) {
        this.btnRecorderVideo.children[0].active = false;
        this.btnRecorderVideo.children[1].active = true;
        this.btnRecorderVideo.children[2].active = false;
        this.videoTimeNode.active = true;
        if (Reflect.has($z1PlatformAd.default.platform.params, "recorderStartTime")) {
          var e = new Date().getTime() / 1e3 - $z1PlatformAd.default.platform.params.recorderStartTime;
          this.videoTimeNode.children[3].getComponent(cc.Label).string = e >= 60 ? "01:00" : "00:" + (e >= 10 ? Math.floor(e) : "0" + Math.floor(e));
        }
      } else if ("录制完成" == this.recorderState) {
        this.btnRecorderVideo.children[0].active = false;
        this.btnRecorderVideo.children[1].active = false;
        this.btnRecorderVideo.children[2].active = true;
        this.videoTimeNode.active = true;
        this.videoTimeNode.children[1].opacity = 255;
        this.videoTimeNode.children[3].getComponent(cc.Label).string = "01:00";
      }
    }
    this.light.angle -= 100 * t;
    for (var o = 0; o < $z1GameData.default.configInfo.job.name.length; o++) {
      var a = $z1GameData.default.playerData.job.lv[o];
      this.rolePos.children[o + 1].active = 0 != a;
    }
    this.curCoin != $z1GameData.default.playerData.res.coin && this.updateRes();
    if (0 != $z1GameData.default.canupdate) {
      this.assetValue != $z1GameData.default.curAssetValue && this.refreshAssetValue();
      this.timecounter -= t;
      if (this.timecounter <= 0) {
        this.timecounter = 5, $z1GameData.default.setlastLeveTime(new Date().getTime());
      }
    }
  };
  _ctor.prototype.coinSaleAni = function () {
    var t = this.lblCoin.node;
    var e = t.parent.$("huang");
    if (1.3 == t.scale) {
      cc.Tween.stopAllByTarget(t);
      cc.Tween.stopAllByTarget(e);
    }
    if (t.scale > 1) {
      cc.tween(t).delay(.25).to(.25, {
        scale: 1
      }).start();
      cc.tween(e).delay(.25).to(.25, {
        scale: 1
      }).start();
    } else {
      cc.tween(t).to(.25, {
        scale: 1.3
      }).delay(.25).to(.25, {
        scale: 1
      }).start();
      cc.tween(e).to(.25, {
        scale: 1.3
      }).delay(.25).to(.25, {
        scale: 1
      }).start();
    }
  };
  _ctor.prototype.updateRes = function () {
    var t = this;
    this.curCoin = $z1GameData.default.playerData.res.coin;
    this.lblCoin.string = $z1Util.default.formatCoin(this.curCoin, 3);
    this.setTextClickCount();
    $z1GameData.default.isOpenGuide || this.scheduleOnce(function () {
      if ($z1GuideManager.default.instance.checkGuide(2, 1) && t.curCoin >= 10) {
        $z1GameData.default.isOpenGuide = true;
        var e = t.node.convertToNodeSpaceAR(t.btnRole.parent.convertToWorldSpaceAR(t.btnRole.position));
        $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GUIDE, 4, false, function () {
          $z1UIManager.UIManager.inst.returnHome();
        }, {
          pos: e,
          size: t.btnRole.getContentSize()
        });
      } else if ($z1GuideManager.default.instance.checkGuide(4, 1) && t.curCoin >= 1e4) {
        $z1GameData.default.isOpenGuide = true;
        e = t.node.convertToNodeSpaceAR(t.btnJob.parent.convertToWorldSpaceAR(t.btnJob.position));
        $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_GUIDE, 4, false, function () {
          $z1UIManager.UIManager.inst.returnHome();
        }, {
          pos: e,
          size: t.btnJob.getContentSize()
        });
      }
    });
  };
  _ctor.prototype.addDesk = function () {
    var t = this;
    $z1platform.default.tdReport("点击添加桌面");
    $z1GameData.default.isAdd = true;
    $z1PlatformAd.default.platform.addDesk().then(function (e) {
      if (e) {
        $z1platform.default.tdReport("添加桌面成功");
        t.btnAddDesk.active = false;
        $z1GameData.default.playerData.base.isAddDesk = 1;
        $z1GameData.default.SaveData();
      } else {
        $z1GameData.default.showMsg("添加失败");
      }
    });
  };
  _ctor.prototype.refreshSideInto = function () {
    this.btnSide.active = false;
    this.lastAddT += 1800;
    this.lastAutoT += 1800;
    this.autoPro.node.active = true;
    $z1GameData.default.isLight = true;
    this.light.active = true;
    $z1GameData.default.curVideoFactor *= 1.5;
    this.refreshAutoValue();
    this.refreshClickValue();
    this.addPro.node.active = true;
    $z1GameData.default.playerData.base.isGetSideIntoGift = 1;
    $z1GameData.default.SaveData();
  };
  _ctor.prototype.startCaishenFly = function () {
    var t = this;
    this.btnCaishen.position = cc.v3(-600, 0);
    this.btnCaishen.active = true;
    this.curCaishenTargetPos = cc.v3(this.node.width / 2 - this.caishenInfo.radiu, 0);
    var e = this.getDis(this.btnCaishen.position.clone(), this.curCaishenTargetPos.clone());
    cc.tween(this.btnCaishen).to(e / this.caishenInfo.speed, {
      position: this.curCaishenTargetPos.clone()
    }).call(function () {
      t.goNext();
    }).start();
  };
  _ctor.prototype.goNext = function () {
    var t = this;
    var e = [1, 2, 3, 4];
    var o = e.indexOf(this.caishenInfo.state);
    e.splice(o, 1);
    this.caishenInfo.state = e[$z1Util.default.Range(0, e.length - 1)];
    var a = 0;
    switch (this.caishenInfo.state) {
      case 1:
        a = $z1Util.default.Range(-this.node.height / 2 + this.caishenInfo.radiu, this.node.height / 2 - this.caishenInfo.radiu);
        this.curCaishenTargetPos = cc.v3(this.node.width / 2 - this.caishenInfo.radiu, a);
        break;
      case 2:
        a = $z1Util.default.Range(-this.node.height / 2 + this.caishenInfo.radiu, this.node.height / 2 - this.caishenInfo.radiu);
        this.curCaishenTargetPos = cc.v3(-this.node.width / 2 + this.caishenInfo.radiu, a);
        break;
      case 3:
        a = $z1Util.default.Range(-this.node.width / 2 + this.caishenInfo.radiu, this.node.width / 2 - this.caishenInfo.radiu);
        this.curCaishenTargetPos = cc.v3(a, -this.node.height / 2 + this.caishenInfo.radiu);
        break;
      case 4:
        a = $z1Util.default.Range(-this.node.width / 2 + this.caishenInfo.radiu, this.node.width / 2 - this.caishenInfo.radiu);
        this.curCaishenTargetPos = cc.v3(a, this.node.height / 2 - this.caishenInfo.radiu);
    }
    var n = this.getDis(this.btnCaishen.position.clone(), this.curCaishenTargetPos.clone());
    cc.tween(this.btnCaishen).to(n / this.caishenInfo.speed, {
      position: this.curCaishenTargetPos.clone()
    }).call(function () {
      t.goNext();
    }).start();
  };
  _ctor.prototype.getDis = function (t, e) {
    var o = t.x - e.x;
    var a = t.y - e.y;
    return Math.sqrt(o * o + a * a);
  };
  _ctor.prototype.clickCaishen = function () {
    $z1platform.default.tdReport("点击财神");
    cc.Tween.stopAllByTarget(this.btnCaishen);
    this.btnCaishen.active = false;
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_CAISHEN, 2);
  };
  _ctor.prototype.delayCaishen = function () {
    this.scheduleOnce(this.startCaishenFly, 60);
  };
  _ctor.prototype.figureClick = function () {
    $z1SoundManager.default.playSound("click");
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_FigureStart);
  };
  _ctor.prototype.universeClick = function () {
    $z1SoundManager.default.playSound("click");
    this.node.$("Top").$("GameUniverse").active = true;
  };
  _ctor.prototype.addEvent = function () {
    t.prototype.addEvent.call(this);
    this.bg.on(cc.Node.EventType.TOUCH_END, this.clickAddCoin, this);
    cc.director.on($z1GameType.default.REFERSH_CLICK, this.refreshClickValue, this);
    cc.director.on($z1GameType.default.REFERSH_AUTO, this.refreshAutoValue, this);
    this.btnAddDesk.on(cc.Node.EventType.TOUCH_START, this.addDesk, this);
    cc.director.on($z1GameType.default.GET_SIDEINTO_GIFT, this.refreshSideInto, this);
    cc.director.on($z1GameType.default.CLOSE_CAISHEN, this.delayCaishen, this);
  };
  _ctor.prototype.removeEvent = function () {
    t.prototype.removeEvent.call(this);
    this.bg.off(cc.Node.EventType.TOUCH_END, this.clickAddCoin, this);
    cc.director.off($z1GameType.default.REFERSH_CLICK, this.refreshClickValue, this);
    cc.director.off($z1GameType.default.REFERSH_AUTO, this.refreshAutoValue, this);
    cc.director.off($z1GameType.default.GET_SIDEINTO_GIFT, this.refreshSideInto, this);
    cc.director.off($z1GameType.default.CLOSE_CAISHEN, this.delayCaishen, this);
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
    displayName: "金币"
  })], _ctor.prototype, "lblCoin", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "金币图标"
  })], _ctor.prototype, "coinIcon", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "每次点击增加"
  })], _ctor.prototype, "lblClickValue", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "每秒自动增加"
  })], _ctor.prototype, "lblAutoValue", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "总资产"
  })], _ctor.prototype, "lblAssetValue", undefined);
  cc__decorate([ccp_property({
    type: cc.Sprite,
    displayName: "自动收益进度"
  })], _ctor.prototype, "autoPro", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "自动收益剩余时间"
  })], _ctor.prototype, "lblAutoTime", undefined);
  cc__decorate([ccp_property({
    type: cc.Sprite,
    displayName: "1.5倍收益进度"
  })], _ctor.prototype, "addPro", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "1.5倍收益剩余时间"
  })], _ctor.prototype, "lblAddTime", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "单点收益次数增加按钮"
  })], _ctor.prototype, "btnCompostion", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "头像"
  })], _ctor.prototype, "head", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "顶对齐根节点"
  })], _ctor.prototype, "top", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "红点列表"
  })], _ctor.prototype, "redPoints", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "升级按钮"
  })], _ctor.prototype, "btnRole", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "雇佣按钮"
  })], _ctor.prototype, "btnJob", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "收益灯"
  })], _ctor.prototype, "light", undefined);
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "连点次数"
  })], _ctor.prototype, "txtClickCount", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "录制按钮"
  })], _ctor.prototype, "btnRecorderVideo", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "录制时间"
  })], _ctor.prototype, "videoTimeNode", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "达人按钮"
  })], _ctor.prototype, "btnTalent", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "添加桌面"
  })], _ctor.prototype, "btnAddDesk", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "侧边栏礼包界面"
  })], _ctor.prototype, "btnSide", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "财神"
  })], _ctor.prototype, "btnCaishen", undefined);
  cc__decorate([ccp_property({
    type: cc.Node,
    displayName: "宇宙红点"
  })], _ctor.prototype, "universeRed", undefined);
  return cc__decorate([ccp_ccclass, ccp_menu("ui界面/GameHome")], _ctor);
}($z1BaseView.BaseView);
exports.default = def_GameHome;