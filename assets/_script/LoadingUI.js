var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
var cc__awaiter = __awaiter;
var cc__generator = __generator;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1PlatformAd = require("PlatformAd");
var $z1GameData = require("GameData");
var $z1GameType = require("GameType");
var $z1BundleManager = require("BundleManager");
var $z1GuideManager = require("GuideManager");
var $z1UIManager = require("UIManager");
var $z1Util = require("Util");
var $z1platform = require("platform");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_LoadingUI = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.lblPro = null;
    e.proB = null;
    e.maxLoad = 0;
    e.progress = 0;
    e.bLoadFinish = false;
    e.bNetFinish = false;
    e.channel = "TEST";
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.start = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      var t = this;
      return cc__generator(this, function (e) {
        switch (e.label) {
          case 0:
            zs_sdk.zs_network.init();
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
              this.channel = "WX";
            } else {
              cc.sys.platform == cc.sys.BYTEDANCE_GAME && (this.channel = "TT");
            }
            console.log("🚀 ~ file: LoadingUI.ts:34 ~ LoadingUI ~ start ~ this.channel:", this.channel);
            cc.macro.ENABLE_MULTI_TOUCH = false;
            $z1PlatformAd.default.Init();
            this.progress = 0;
            this.maxLoad = 50;
            cc.assetManager.loadBundle("internal");
            cc.assetManager.loadBundle("ui", null, function (e, o) {
              $z1BundleManager.default.uiBundle = o;
              t.maxLoad += 10;
              cc.assetManager.loadBundle("uiPrefab", null, function (e, o) {
                $z1BundleManager.default.uiPrefabBundle = o;
                t.maxLoad += 10;
                o.preload($z1GameType.UIConst.UI_HOME, function (e) {
                  e && console.error("主界面加载失败", e);
                  t.maxLoad += 10;
                  o.preload($z1GameType.UIConst.UI_LOADING_WINDOW, function (e) {
                    e && console.error("中间加载页加载失败", e);
                    t.maxLoad += 20;
                  });
                });
              });
            });
            return [4, this.loadingNet()];
          case 1:
            e.sent();
            this.loadData();
            this.bNetFinish = true;
            return [2];
        }
      });
    });
  };
  _ctor.prototype.loadData = function () {
    if (cc.sys.localStorage.getItem("playerData")) {
      var t = JSON.parse(cc.sys.localStorage.getItem("playerData"));
      $z1Util.default.correlationData(t, $z1GameData.default.playerData);
      $z1GameData.default.playerData = t;
    }
    var e = $z1GameData.default.playerData.job.lv.length;
    var o = $z1GameData.default.configInfo.job.name.length;
    for (var a = e; a < o; a++) {
      $z1GameData.default.playerData.job.lv.push(0);
    }
    e = $z1GameData.default.playerData.real.unlock.length;
    o = $z1GameData.default.configInfo.real.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.real.unlock.push(0);
      $z1GameData.default.playerData.real.gain.push(0);
    }
    e = $z1GameData.default.playerData.art.unlock.length;
    o = $z1GameData.default.configInfo.art.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.art.unlock.push(0);
      $z1GameData.default.playerData.art.gain.push(0);
    }
    e = $z1GameData.default.playerData.build.unlock.length;
    o = $z1GameData.default.configInfo.build.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.build.unlock.push(0);
      $z1GameData.default.playerData.build.gain.push(0);
    }
    e = $z1GameData.default.playerData.city.lv.length;
    o = $z1GameData.default.configInfo.city.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.city.lv.push(0);
    }
    e = $z1GameData.default.playerData.star.unlock.length;
    o = $z1GameData.default.configInfo.star.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.star.unlock.push(0);
    }
    e = $z1GameData.default.playerData.airship.unlock.length;
    o = $z1GameData.default.configInfo.airship.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.airship.unlock.push(0);
    }
    e = $z1GameData.default.playerData.spaceStation.unlock.length;
    o = $z1GameData.default.configInfo.spaceStation.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.spaceStation.unlock.push(0);
    }
    e = $z1GameData.default.playerData.galaxy.unlock.length;
    o = $z1GameData.default.configInfo.galaxy.name.length;
    for (a = e; a < o; a++) {
      $z1GameData.default.playerData.galaxy.unlock.push(0);
      $z1GameData.default.playerData.galaxy.gain.push(0);
    }
    $z1GameData.default.playerData.base.guideStep = 1;
    $z1GameData.default.getJobCurFactor();
    $z1GameData.default.getBuildCurFactor();
    $z1GameData.default.getCurAssetValue();
    $z1GameData.default.getTreasureCurFactor();
    var n = new Date().getDate();
    if ($z1GameData.default.playerData.base.lastDay != n) {
      $z1GameData.default.playerData.base.lastDay = n;
      $z1GameData.default.playerData.figure.gameCount = 5;
      $z1GameData.default.playerData.figure.isGameWin = false;
      $z1GameData.default.playerData.figure.tryCount = 0;
    }
    $z1GameData.default.SaveData();
  };
  _ctor.prototype.updatePgb = function (t) {
    var e = this;
    if (!this.bLoadFinish) {
      this.lblPro.string = Math.floor(t) + "%";
      this.proB.fillRange = t / 100;
      if (this.maxLoad >= 100 && this.progress >= 100 && this.bNetFinish) {
        this.lblPro.string = "100%", this.proB.fillRange = 1, this.bLoadFinish = true, this.scheduleOnce(function () {
          e.goHome();
        }, .2);
      }
    }
  };
  _ctor.prototype.goHome = function () {
    if (0 != $z1GameData.default.playerData.base.lastLeveTime) {
      var t = (new Date().getTime() - $z1GameData.default.playerData.base.lastLeveTime) / 1e3;
      $z1GameData.default.StarAutoAdd(t);
      $z1GameData.default.AssetAutoAdd(t, true);
      var e = Math.round($z1GameData.default.getAutoOfflineValue(t));
      if (e > 0 && 0 == $z1GuideManager.default.instance.checkGuide(2, 1) && 0 == $z1GuideManager.default.instance.checkGuide(3, 1) && 0 == $z1GuideManager.default.instance.checkGuide(4, 1)) {
        $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_OFFLINE, 2, false, null, {
          time: t,
          value: e
        });
      } else {
        $z1GameData.default.canupdate = true;
      }
    } else {
      $z1GameData.default.canupdate = true;
    }
    cc.director.emit($z1GameType.default.OPEN_VIEW, $z1GameType.UIConst.UI_HOME, 1);
    this.node.active = false;
  };
  _ctor.prototype.update = function (t) {
    this.progress += 100 * t;
    this.progress = Math.min(this.progress, this.maxLoad);
    this.updatePgb(this.progress);
  };
  _ctor.prototype.loadingNet = function () {
    return cc__awaiter(this, undefined, undefined, function () {
      var t = this;
      return cc__generator(this, function () {
        return [2, new Promise(function (e) {
          var o = {};
          t.maxLoad += 30;
          $z1platform.default.setNetConf(o);
          $z1platform.default.version = "1.0.0";
          console.log("🚀 ~ file: LoadingUI.ts:148 ~ zs.network.config ~ result2.gameconf[0]:", o);
          e(true);
        })];
      });
    });
  };
  cc__decorate([ccp_property({
    type: cc.Label,
    displayName: "加载进度值"
  })], _ctor.prototype, "lblPro", undefined);
  cc__decorate([ccp_property({
    type: cc.Sprite,
    displayName: "加载进度条"
  })], _ctor.prototype, "proB", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_LoadingUI;