var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1UIManager = require("UIManager");
var $z1Util = require("Util");
var $z1GameType = require("GameType");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_GameData = function () {
  function _ctor() {}
  var e;
  e = _ctor;
  _ctor.setGuide = function (t, o) {
    undefined === o && (o = true);
    e.playerData.base.guide = t;
    o && e.SaveData();
  };
  _ctor.setGuideStep = function (t, o) {
    undefined === o && (o = true);
    e.playerData.base.guideStep = t;
    o && e.SaveData();
  };
  _ctor.UseCoin = function (t, e) {
    undefined === e && (e = true);
    t = Number(t);
    return !(this.playerData.res.coin < t || (this.playerData.res.coin -= t, e && this.SaveData(), 0));
  };
  _ctor.AddCoin = function (t, e) {
    undefined === e && (e = true);
    t = Number(t);
    this.playerData.res.coin += t;
    e && this.SaveData();
  };
  _ctor.getSelfAttribute = function () {
    var t = this.playerData.base.lv;
    var o = 2;
    o = 2 + 2 * t + t * (t - 1);
    o = Math.round(o * (1 + (this.curJobFactor + this.curBuildFactor + this.curTreasureFactor) / 100));
    var a = 1 == this.curVideoFactor ? 0 : o;
    return (o = Math.round(o * this.curVideoFactor + a)) * e.curCoinFakeFactor;
  };
  _ctor.getAddAttribute = function (t) {
    return 2 + 2 * t;
  };
  _ctor.playerGradeUp = function (t) {
    return Math.round(10 * Math.pow(1.05, t));
  };
  _ctor.getJobGradeUp = function (t, e) {
    return Math.round(e * Math.pow(1.02, t * (t + 1) / 2));
  };
  _ctor.getJobAddAttribute = function (t, e) {
    var o = this.getJobBaseAttributeByIndex(t);
    return o[0] + e * o[1];
  };
  _ctor.getJobCurAttribute = function (t, e) {
    var o = this.getJobBaseAttributeByIndex(t);
    return o[0] * e + e * (e - 1) * o[1] / 2;
  };
  _ctor.getJobBaseAttributeByIndex = function (t) {
    var e = Math.pow(10, Math.floor(t / 2));
    var o = Math.pow(10, Math.floor(t / 2));
    var a = Math.pow(10, Math.floor(t / 2));
    if (t % 2 == 0) {
      a = this.configInfo.job.unlock * e;
      e = this.configInfo.job.baseAttribute * e;
      o = this.configInfo.job.dValue * o;
    } else {
      a = this.configInfo.job.unlock * e * 5;
      e = this.configInfo.job.baseAttribute * e * 5;
      o = this.configInfo.job.dValue * o * 5;
    }
    return [e, o, a];
  };
  _ctor.getJobCurFactor = function () {
    var t = this.configInfo.job;
    var e = t.name.length;
    for (var o = 0; o < e; o++) {
      this.playerData.job.lv[o] >= 20 && (this.curJobFactor += t.factor[o]);
    }
  };
  _ctor.addJobFactor = function (t) {
    this.curJobFactor += this.configInfo.job.factor[t];
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
  };
  _ctor.getBuildCurFactor = function () {
    var t = this.configInfo.build;
    var e = this.playerData.build;
    var o = e.unlock.length;
    for (var a = 0; a < o; a++) {
      0 != e.unlock[a] && (this.curBuildFactor += t.factor[a]);
    }
  };
  _ctor.unlockAsset = function (t, o, a, n) {
    undefined === n && (n = true);
    this.curAssetValue += a;
    switch (t) {
      case $z1GameType.ASSET_TYPE.real:
        e.showMsg("获得房地产:" + e.configInfo.real.name[o]);
        this.playerData.real.unlock[o] = 1;
        break;
      case $z1GameType.ASSET_TYPE.art:
        e.showMsg("获得美术品:" + e.configInfo.art.name[o]);
        this.playerData.art.unlock[o] = 1;
        break;
      case $z1GameType.ASSET_TYPE.build:
        e.showMsg("获得企业:" + e.configInfo.build.name[o]);
        this.playerData.build.unlock[o] = 1;
        this.curBuildFactor += this.configInfo.build.factor[o];
    }
    cc.director.emit($z1GameType.default.REFERSH_ASSET);
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
    n && this.SaveData();
  };
  _ctor.sellAsset = function (t, e, o, a) {
    undefined === a && (a = true);
    this.curAssetValue -= o;
    switch (t) {
      case $z1GameType.ASSET_TYPE.real:
        this.playerData.real.unlock[e] = 0;
        this.playerData.real.gain[e] = 0;
        this.AddCoin(o, a);
        break;
      case $z1GameType.ASSET_TYPE.art:
        this.playerData.art.unlock[e] = 0;
        this.playerData.art.gain[e] = 0;
        this.AddCoin(o, a);
        break;
      case $z1GameType.ASSET_TYPE.build:
        this.playerData.build.unlock[e] = 0;
        this.playerData.build.gain[e] = 0;
        this.AddCoin(o, a);
        this.curBuildFactor -= this.configInfo.build.factor[e];
        cc.director.emit($z1GameType.default.REFERSH_CLICK);
    }
  };
  _ctor.sellAllAsset = function (t, e) {
    this.curAssetValue -= e;
    var o = 0;
    switch (t) {
      case $z1GameType.ASSET_TYPE.real:
        o = this.playerData.real.unlock.length;
        for (var a = 0; a < o; a++) {
          this.playerData.real.unlock[a] = 0;
          this.playerData.real.gain[a] = 0;
        }
        this.AddCoin(e);
        break;
      case $z1GameType.ASSET_TYPE.art:
        o = this.playerData.art.unlock.length;
        for (a = 0; a < o; a++) {
          this.playerData.art.unlock[a] = 0;
          this.playerData.art.gain[a] = 0;
        }
        this.AddCoin(e);
        break;
      case $z1GameType.ASSET_TYPE.build:
        o = this.playerData.build.unlock.length;
        for (a = 0; a < o; a++) {
          if (0 != this.playerData.build.unlock[a]) {
            this.playerData.build.unlock[a] = 0;
            this.playerData.build.gain[a] = 0;
            this.curBuildFactor -= this.configInfo.build.factor[a];
          }
        }
        this.AddCoin(e);
        cc.director.emit($z1GameType.default.REFERSH_CLICK);
    }
  };
  _ctor.AssetAutoAdd = function (t, o) {
    undefined === t && (t = 1);
    undefined === o && (o = false);
    var a = e.playerData.real;
    var n = a.unlock.length;
    for (var i = 0; i < n; i++) {
      if (0 != a.unlock[i]) {
        var c = e.formatAddValue(e.configInfo.real.add[i]) * t;
        a.gain[i] += c;
        e.curAssetValue += c;
      }
    }
    n = (a = e.playerData.art).unlock.length;
    for (i = 0; i < n; i++) {
      if (0 != a.unlock[i]) {
        c = e.formatAddValue(e.configInfo.art.add[i]) * t;
        a.gain[i] += c;
        e.curAssetValue += c;
      }
    }
    n = (a = e.playerData.build).unlock.length;
    for (i = 0; i < n; i++) {
      if (0 != a.unlock[i]) {
        c = e.formatAddValue(e.configInfo.build.add[i]) * t;
        a.gain[i] += c;
        e.curAssetValue += c;
      }
    }
    o && this.SaveData();
    cc.director.emit($z1GameType.default.REFERSH_ASSET);
  };
  _ctor.formatAddValue = function (t) {
    var e = t.split("-");
    return Number(e[0]) * Math.pow(10, Number(e[1]));
  };
  _ctor.getCurAssetValue = function (t) {
    undefined === t && (t = 1);
    var e = this.playerData.real;
    var o = e.unlock.length;
    for (var a = 0; a < o; a++) {
      0 != e.unlock[a] && (this.curAssetValue += this.formatAddValue(this.configInfo.real.unlock[a]) + e.gain[a]);
    }
    o = (e = this.playerData.art).unlock.length;
    for (a = 0; a < o; a++) {
      0 != e.unlock[a] && (this.curAssetValue += this.formatAddValue(this.configInfo.art.unlock[a]) + e.gain[a]);
    }
    o = (e = this.playerData.build).unlock.length;
    for (a = 0; a < o; a++) {
      0 != e.unlock[a] && (this.curAssetValue += this.formatAddValue(this.configInfo.build.unlock[a]) + e.gain[a]);
    }
  };
  _ctor.getAutoValue = function () {
    var t = 0;
    var o = this.playerData.job.lv.length;
    for (var a = 0; a < o && (i = this.playerData.job.lv[a]); a++) {
      t += this.getJobCurAttribute(a, i);
    }
    var n = this.configInfo.city.name.length;
    for (a = 0; a < n; a++) {
      var i;
      i = this.playerData.city.lv[a];
      if (i) {
        t += this.getCityCurAttribute(a, i);
      }
    }
    var r = 1 == this.curVideoFactor ? 0 : t;
    return (t = Math.round(t * this.curVideoFactor + r)) + e.curFakeAddCoin;
  };
  _ctor.getAutoOfflineValue = function (t) {
    return this.getAutoValue() * t;
  };
  _ctor.getCityGradeUp = function (t, e) {
    return Math.round(e * Math.pow(1.02, t * (t + 1) / 2));
  };
  _ctor.getCityAddAttribute = function (t, e) {
    var o = this.getCityBaseAttributeByIndex(t);
    return o[0] + e * o[1];
  };
  _ctor.getCityCurAttribute = function (t, e) {
    var o = this.getCityBaseAttributeByIndex(t);
    return o[0] * e + e * (e - 1) * o[1] / 2;
  };
  _ctor.getCityBaseAttributeByIndex = function (t) {
    var e = Math.pow(10, Math.floor(t / 2));
    var o = Math.pow(10, Math.floor(t / 2));
    var a = Math.pow(10, Math.floor(t / 2));
    if (t % 2 == 0) {
      a = this.formatAddValue(this.configInfo.city.unlock) * e;
      e = this.formatAddValue(this.configInfo.city.baseAttribute) * e;
      o = this.formatAddValue(this.configInfo.city.dValue) * o;
    } else {
      a = this.formatAddValue(this.configInfo.city.unlock) * e * 5;
      e = this.formatAddValue(this.configInfo.city.baseAttribute) * e * 5;
      o = this.formatAddValue(this.configInfo.city.dValue) * o * 5;
    }
    return [e, o, a];
  };
  _ctor.unlockStar = function (t, e) {
    undefined === e && (e = true);
    this.playerData.star.unlock[t] = 1;
    e && this.SaveData();
  };
  _ctor.getStarGain = function (t) {
    undefined === t && (t = true);
    e.playerData.res.coin += e.playerData.star.curGain;
    e.playerData.star.curGain = 0;
    t && this.SaveData();
  };
  _ctor.StarAutoAdd = function (t, o) {
    undefined === t && (t = 1);
    undefined === o && (o = false);
    var a = e.playerData.star;
    var n = e.configInfo.star;
    var i = a.unlock.length;
    for (var c = 0; c < i; c++) {
      if (0 != a.unlock[c]) {
        a.curGain += e.formatAddValue(n.add[c]) * t;
        a.maxGain += e.formatAddValue(n.add[c]) * t;
      }
    }
    a = e.playerData.airship;
    n = e.configInfo.airship;
    i = a.unlock.length;
    for (c = 0; c < i; c++) {
      if (0 != a.unlock[c]) {
        a.curGain += e.formatAddValue(n.add[c]) * t;
        a.maxGain += e.formatAddValue(n.add[c]) * t;
      }
    }
    a = e.playerData.spaceStation;
    n = e.configInfo.spaceStation;
    i = a.unlock.length;
    for (c = 0; c < i; c++) {
      if (0 != a.unlock[c]) {
        a.curGain += e.formatAddValue(n.add[c]) * t;
        a.maxGain += e.formatAddValue(n.add[c]) * t;
      }
    }
    var l = ["galacticRuins", "exileTribe", "starCity", "threeT", "universe"];
    for (c = 0; c < l.length; c++) {
      a = e.playerData[l[c]];
      n = e.configInfo[l[c]];
      i = a.unlock.length;
      for (var s = 0; s < i; s++) {
        if (0 != a.unlock[s]) {
          a.curGain += e.formatAddValue(n.add[s]) * t;
          a.maxGain += e.formatAddValue(n.add[s]) * t;
        }
      }
    }
    o && this.SaveData();
    cc.director.emit($z1GameType.default.REFERSH_STAR);
  };
  _ctor.unlockGalaxy = function (t, o) {
    undefined === o && (o = true);
    e.showMsg("获得星系:" + e.configInfo.galaxy.name[t]);
    this.playerData.galaxy.unlock[t] = 1;
    o && this.SaveData();
  };
  _ctor.GalaxyAutoAdd = function (t, o) {
    undefined === t && (t = 1);
    undefined === o && (o = false);
    var a = e.playerData.galaxy;
    var n = a.unlock.length;
    for (var i = 0; i < n; i++) {
      if (0 != a.unlock[i]) {
        var c = e.formatAddValue(e.configInfo.galaxy.add[i]) * t;
        a.gain[i] += c;
        a.maxGain += c;
      }
    }
    o && this.SaveData();
    cc.director.emit($z1GameType.default.REFERSH_GALAXY);
  };
  _ctor.getGalaxyGain = function (t, o) {
    undefined === o && (o = true);
    e.playerData.res.coin += e.playerData.galaxy.gain[t];
    e.playerData.galaxy.gain[t] = 0;
    o && this.SaveData();
  };
  _ctor.randomTreasure = function (t) {
    var o = this.configInfo.galaxy.treasure[t].list;
    var a = this.configInfo.galaxy.treasure[t].rate;
    var n = [];
    for (var r = 0; r < o.length; r++) {
      var c = o[r];
      if (e.treasureCfg[c].isShow) {
        var l = a[r];
        for (var s = 0; s < l; s++) {
          n.push(c);
        }
      }
    }
    return n[$z1Util.default.Range(0, n.length - 1)];
  };
  _ctor.getTreasureCurFactor = function () {
    for (var t in e.treasureCfg) {
      var o = e.treasureCfg[t];
      if (o.isShow && o.isHandBook) {
        this.handBookData.push(Number(t));
        e.playerData.galaxy.treasure.indexOf(Number(t)) < 0 || (this.curTreasureFactor += o.factor);
      }
    }
  };
  _ctor.unlockTreasure = function (t, o, a) {
    undefined === a && (a = true);
    e.playerData.galaxy.gain[t] = 0;
    e.playerData.galaxy.treasure.push(o);
    console.log("🚀 ~ file: GameData.ts:567 ~ GameData ~ unlockTreasure ~ id:", o);
    this.curTreasureFactor += e.treasureCfg[o].factor;
    cc.director.emit($z1GameType.default.REFERSH_CLICK);
    a && this.SaveData();
  };
  _ctor.sellTreasure = function (t, e) {
    undefined === e && (e = true);
    this.AddCoin(t);
    e && this.SaveData();
  };
  _ctor.setlastLeveTime = function (t) {
    e.playerData.base.lastLeveTime = t;
    e.SaveData();
  };
  _ctor.SaveData = function () {
    cc.sys.localStorage.setItem("playerData", JSON.stringify(e.playerData));
  };
  _ctor.showMsg = function (t) {
    $z1UIManager.UIManager.inst.openView($z1GameType.UIConst.UI_MSG, 3, false, null, t, true);
  };
  _ctor.playerData = {
    res: {
      coin: 0
    },
    base: {
      lv: 0,
      lastLeveTime: 0,
      compositonCount: 1,
      guide: 1,
      guideStep: 1,
      isAddDesk: 0,
      isGetSideIntoGift: 0,
      lastDay: 0
    },
    job: {
      lv: []
    },
    real: {
      unlock: [],
      gain: []
    },
    art: {
      unlock: [],
      gain: []
    },
    build: {
      unlock: [],
      gain: []
    },
    city: {
      lv: []
    },
    star: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    galaxy: {
      unlock: [],
      gain: [],
      maxGain: 0,
      treasure: []
    },
    airship: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    spaceStation: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    galacticRuins: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    exileTribe: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    starCity: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    threeT: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    universe: {
      unlock: [],
      curGain: 0,
      maxGain: 0
    },
    figure: {
      isGameWin: false,
      gameCount: 5,
      tryCount: 0
    }
  };
  _ctor.curCoinFakeFactor = 1;
  _ctor.curFakeAddCoin = 0;
  _ctor.openFakeAddCoin = false;
  _ctor.isOpenGuide = false;
  _ctor.guideClickCount = 0;
  _ctor.canupdate = false;
  _ctor.curJobFactor = 0;
  _ctor.curBuildFactor = 0;
  _ctor.curAssetValue = 0;
  _ctor.curVideoFactor = 1;
  _ctor.bSoundVal = 1;
  _ctor.bMusicVal = 1;
  _ctor.curTreasureFactor = 0;
  _ctor.handBookData = [];
  _ctor.isLight = false;
  _ctor.isAdd = false;
  _ctor.isSideInto = false;
  _ctor.GuideDict = {
    1: {
      1: {
        id: 1,
        step: 1,
        name: "旁白",
        desc: "<color=#FFFFFF><color=#E06464> 点击屏幕 </color>卖出废品获得金钱</color>",
        saveGuide: 2,
        type: 1,
        descType: 1
      }
    },
    2: {
      1: {
        id: 2,
        step: 1,
        name: "点级升级界面按钮",
        desc: "<color=#FFFFFF><color=#E06464> 点击进入 </color>升级界面</color>",
        saveGuide: -1,
        descType: 2
      },
      2: {
        id: 2,
        step: 2,
        name: "点击升级",
        desc: "<color=#FFFFFF>提升你的等级，加快收购破烂获得的收益</color>",
        saveGuide: 3,
        descType: 3
      }
    },
    3: {
      1: {
        id: 3,
        step: 1,
        name: "旁白",
        desc: "<color=#FFFFFF><color=#E06464> 点击屏幕 </color>卖出废品获得更多金钱</color>",
        saveGuide: 4,
        type: 1,
        descType: 1
      }
    },
    4: {
      1: {
        id: 4,
        step: 1,
        name: "点级雇佣界面按钮",
        desc: "<color=#FFFFFF><color=#E06464> 雇佣其他人 </color>可以自动帮你赚取收益</color>",
        saveGuide: -1,
        descType: 3
      },
      2: {
        id: 4,
        step: 2,
        name: "点级雇佣",
        desc: "<color=#FFFFFF><color=#E06464> 点击雇佣 </color>小伙伴！</color>",
        saveGuide: 5,
        descType: 3
      }
    },
    5: {
      1: {
        id: 5,
        step: 1,
        name: "结束步骤",
        desc: "",
        saveGuide: -1
      }
    }
  };
  _ctor.treasureCfg = {
    1: {
      id: 1,
      name: "筋斗云",
      desc: "传说中的筋斗云，需要秉性纯良的人才能驾驭，也可以换来不错的收益",
      time: 300,
      factor: 300,
      isHandBook: 1,
      isShow: 1
    },
    2: {
      id: 2,
      name: "螺旋手里剑",
      desc: "大螺旋星系的特有产物，有很强大的破坏力，不要轻易靠近",
      time: 300,
      factor: 400,
      isHandBook: 1,
      isShow: 1
    },
    3: {
      id: 3,
      name: "神光棒",
      desc: "少年，你相信光吗？",
      time: 300,
      factor: 500,
      isHandBook: 1,
      isShow: 1
    },
    4: {
      id: 4,
      name: "外星模型",
      desc: "哪个小孩子的玩具跑到太空来了？",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    5: {
      id: 5,
      name: "玉兔",
      desc: "一只喜欢吃月饼的兔子，看着很温顺但是千万不要惹怒它，咬人可凶了",
      time: 300,
      factor: 600,
      isHandBook: 1,
      isShow: 1
    },
    6: {
      id: 6,
      name: "AI导弹",
      desc: "导弹确实是导弹，但是这个AI正不正经就不知道了",
      time: 300,
      factor: 600,
      isHandBook: 1,
      isShow: 1
    },
    7: {
      id: 7,
      name: "冰棍",
      desc: "哪个好人在宇宙里吃冰棍啊？",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    8: {
      id: 8,
      name: "大哥大",
      desc: "这玩意儿有些年头了，这亮起的显示屏难道是说还能继续使用？",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    9: {
      id: 9,
      name: "外星飞船",
      desc: "外表完好其实核心已经完全损坏，当个收藏品应该也还不错",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    10: {
      id: 10,
      name: "极品拖鞋",
      desc: "从这个拖鞋上散发着一种可怕的气息，不经让我想起了一位放荡不羁的故人",
      time: 300,
      factor: 700,
      isHandBook: 1,
      isShow: 1
    },
    11: {
      id: 11,
      name: "机械手套",
      desc: "如果我戴上手套打个响指，会不会发生一些不可思议的事情？",
      time: 300,
      factor: 800,
      isHandBook: 1,
      isShow: 1
    },
    12: {
      id: 12,
      name: "橡胶草帽",
      desc: "战斗吧！伙伴们！我们的征途是，星辰大海！",
      time: 300,
      factor: 900,
      isHandBook: 1,
      isShow: 1
    },
    13: {
      id: 13,
      name: "路由器",
      desc: "那么问题来了，从哪里搞一根可以连网的网线呢？",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    14: {
      id: 14,
      name: "破碎盾牌",
      desc: "队长！你怎么了队长！为什么你的盾牌变成这样了！",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    15: {
      id: 15,
      name: "宇宙奇行种",
      desc: "极具特色的长相，如果真有外星友人希望不要是这个样子",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    16: {
      id: 16,
      name: "神秘戒指",
      desc: "神秘套装的其中一个，戴上这个戒指你讲获得无与伦比的手速",
      time: 300,
      factor: 1e3,
      isHandBook: 1,
      isShow: 1
    },
    17: {
      id: 17,
      name: "神秘权杖",
      desc: "神秘套装的其中一个，象征权力和尊贵的长杖。",
      time: 300,
      factor: 1e3,
      isHandBook: 1,
      isShow: 1
    },
    18: {
      id: 18,
      name: "神秘王冠",
      desc: "神秘套装的其中一个，象征着帝王的身份与权威。",
      time: 300,
      factor: 1e3,
      isHandBook: 1,
      isShow: 1
    },
    19: {
      id: 19,
      name: "滋水王八",
      desc: "太空里怎么会有一个会吐水的龟？，感觉还有其他物种",
      time: 300,
      factor: 1100,
      isHandBook: 1,
      isShow: 1
    },
    20: {
      id: 20,
      name: "蒜头蛤蟆",
      desc: "背上长大蒜的蛤蟆也太奇怪了点，感觉还有其他物种",
      time: 300,
      factor: 1100,
      isHandBook: 1,
      isShow: 1
    },
    21: {
      id: 21,
      name: "太空陨石",
      desc: "宇宙中随处可见的石头，除了硬一点以外没有别的特点。",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    22: {
      id: 22,
      name: "甜甜圈",
      desc: "或许是哪个宇航员不小心带到太空来的，不知道还能不能吃。",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    23: {
      id: 23,
      name: "无害雕像",
      desc: "比......收声！怎么能随便念出那位大人的名字！",
      time: 300,
      factor: 1200,
      isHandBook: 1,
      isShow: 1
    },
    24: {
      id: 24,
      name: "冰西瓜",
      desc: "炎炎夏日的解暑必备，切开的瓜会不会变质啊",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    25: {
      id: 25,
      name: "遮阳伞",
      desc: "有没有一种可能，拿遮阳伞挡住恒星的光照也是有用的？",
      time: 30,
      factor: 0,
      isHandBook: 0,
      isShow: 1
    },
    26: {
      id: 26,
      name: "一星彩珠",
      desc: "珠子内部镶嵌着一颗星星，不出意外应该是有七颗珠子，集齐后会有惊喜喔~",
      time: 300,
      factor: 600,
      isHandBook: 1,
      isShow: 1
    },
    27: {
      id: 27,
      name: "二星彩珠",
      desc: "珠子内部镶嵌着二颗星星，不出意外应该是有七颗珠子，集齐后会有惊喜喔~",
      time: 300,
      factor: 700,
      isHandBook: 1,
      isShow: 1
    },
    28: {
      id: 28,
      name: "三星彩珠",
      desc: "珠子内部镶嵌着三颗星星，不出意外应该是有七颗珠子，集齐后会有惊喜喔~",
      time: 300,
      factor: 800,
      isHandBook: 1,
      isShow: 1
    },
    29: {
      id: 29,
      name: "四星彩珠",
      desc: "珠子内部镶嵌着四颗星星，不出意外应该是有七颗珠子，集齐后会有惊喜喔~",
      time: 300,
      factor: 900,
      isHandBook: 1,
      isShow: 1
    },
    30: {
      id: 30,
      name: "五星彩珠",
      desc: "珠子内部镶嵌着五颗星星，不出意外应该是有七颗珠子，集齐后会有惊喜喔~",
      time: 300,
      factor: 1e3,
      isHandBook: 1,
      isShow: 1
    },
    31: {
      id: 31,
      name: "六星彩珠",
      desc: "珠子内部镶嵌着六颗星星，不出意外应该是有七颗珠子，集齐后会有惊喜喔~",
      time: 300,
      factor: 1200,
      isHandBook: 1,
      isShow: 1
    },
    32: {
      id: 32,
      name: "七星彩珠",
      desc: "珠子内部镶嵌着七颗星星，不出意外应该是有七颗珠子，集齐后会有惊喜喔~",
      time: 300,
      factor: 1500,
      isHandBook: 1,
      isShow: 1
    }
  };
  _ctor.configInfo = {
    job: {
      unlock: 1e4,
      baseAttribute: 2,
      dValue: 2,
      name: ["搬砖人", "嗒嗒司机", "鱼贩子", "白富美", "足球运动员", "武术大师", "呱呱蛙", "练习生", "银莲", "歪嘴战神", "二当家", "乌鸦哥", "神马", "杰克马", "渣渣辉", "泰裤辣", "帮主"],
      factor: [30, 50, 70, 100, 150, 200, 300, 400, 500, 700, 1e3, 1500, 2e3, 2500, 3e3, 4e3, 5e3]
    },
    real: {
      name: ["废品回收站", "独栋别墅", "5层小洋楼", "10层小洋楼", "20层小洋楼", "葡萄庄园", "中世纪城堡"],
      unlock: ["2-8", "5-8", "10-8", "20-8", "50-8", "100-8", "1000-8"],
      add: ["2-4", "5-4", "10-4", "20-4", "50-4", "100-4", "1000-4"]
    },
    art: {
      name: ["镀金马", "黄金衣", "古代剑", "黄金樽", "山水图", "大方鼎", "神秘印章"],
      unlock: ["2000-8", "3000-8", "4000-8", "5000-8", "6000-8", "7000-8", "40-12"],
      add: ["2000-4", "3000-4", "4000-4", "5000-4", "6000-4", "7000-4", "40-8"]
    },
    build: {
      name: ["爱破", "星九克", "二刺螈", "莱克", "雷碧", "六个核弹", "红午", "蓝月壳", "纯牛马", "白事可乐", "康帅博", "娃啥啥", "清场", "奥利给饼干", "靓仔牛奶糖"],
      unlock: ["10-12", "20-12", "30-12", "50-12", "100-12", "200-12", "300-12", "500-12", "1000-12", "2000-12", "3000-12", "5000-12", "1-16", "2-16", "3-16"],
      add: ["10-8", "20-8", "30-8", "50-8", "100-8", "200-8", "300-8", "500-8", "1000-8", "2000-8", "3000-8", "5000-8", "1-12", "2-12", "3-12"],
      factor: [100, 150, 200, 250, 300, 350, 400, 500, 600, 700, 800, 900, 1e3, 1500, 2e3]
    },
    city: {
      name: ["太北", "稀尼", "八里", "轮蹲", "香钢", "新家破", "樱花城", "泡菜城", "扭腰", "面碑"],
      unlock: "1000-12",
      baseAttribute: "1000-8",
      dValue: "1000-8"
    },
    star: {
      name: ["水星", "金星", "火星", "木星", "土星", "天王星", "海王星"],
      unlock: ["1-20", "2-20", "3-20", "5-20", "10-20", "20-20", "30-20"],
      add: ["10-12", "20-12", "30-12", "50-12", "100-12", "200-12", "300-12"]
    },
    galaxy: {
      name: ["太阳系", "银河系", "M78星系", "棒旋星系", "仙女座星系", "漩涡星系", "草帽星系", "黑眼星系", "大螺旋星系", "黑洞", "创生之柱"],
      unlock: ["1-24", "2-24", "3-24", "6-24", "11-24", "21-24", "30-24", "50-24", "100-24", "200-24", "300-24"],
      add: ["10-16", "20-16", "30-16", "50-16", "100-16", "200-16", "300-16", "500-16", "1000-16", "2000-16", "3000-16"],
      desc: ["太阳系的形成大约始于46亿年前一个巨型星际分子云的引力坍缩。太阳系内大部分的质量都集中于太阳。会产出筋斗云喔~", "银河系是太阳系所在的恒星系统，包括一二千亿颗恒星和大量的星团、星云，还有各种类型的星际气体和星际尘埃", "M78为梅西耶天体，M78是位于猎户座的反射星云。不知道少年你相不相信光？", "是一种有棒状结构贯穿星系核的旋涡星系，短棒通常会影响在棒旋星系里的恒星与星际气体的运动。", "仙女星系在东北方向的天空中看起来是纺锤状的椭圆光斑，是肉眼可见的最遥远的天体之一。", "旋涡星系在其对称面附近含有大量的弥漫物质，从正面看，形状像旋涡；从侧面看，便呈梭状。", "因星系中央隆起明亮的核与核附近像草帽的帽檐般向四周辐射散开的宇宙灰尘，使其看起来好似一顶墨西哥草帽而得名。", "因有一条引人入胜的壮观黑暗尘带横亘在明亮的星系核心之前而得名。", "最迷人的地方在于其拥有数以万计的蓝色的恒星，散布其间，大片星际气体好似将这片蓝色舞动成漩涡状。", "黑洞是时空曲率大到光都无法从其事件视界逃脱的天体。", "创生之柱将会被6,000年前爆炸的超新星冲击波摧毁。因为光速是有限的，所以地球上的观测者看不到冲击波接近创生之柱。"],
      treasure: [{
        list: [1, 4, 7, 8, 13],
        rate: [1, 2, 2, 2, 2]
      }, {
        list: [5, 9, 7, 8, 13, 14],
        rate: [1, 1, 5, 5, 5, 5]
      }, {
        list: [3, 6, 7, 8, 13, 14],
        rate: [1, 2, 5, 5, 5, 5]
      }, {
        list: [10, 11, 12, 8, 13],
        rate: [1, 1, 1, 10, 10]
      }, {
        list: [16, 26, 8, 13, 14, 15],
        rate: [1, 1, 5, 5, 5, 5]
      }, {
        list: [17, 27, 13, 14, 15, 21],
        rate: [1, 1, 5, 5, 5, 5]
      }, {
        list: [18, 28, 14, 15, 21, 22],
        rate: [1, 1, 5, 5, 5, 5]
      }, {
        list: [19, 29, 15, 21, 22, 24],
        rate: [1, 1, 5, 5, 5, 5]
      }, {
        list: [20, 2, 21, 22, 24, 25],
        rate: [1, 1, 5, 5, 5, 5]
      }, {
        list: [23, 31, 22, 24, 25, 4],
        rate: [1, 1, 5, 5, 5, 5]
      }, {
        list: [30, 32, 24, 25, 4, 7],
        rate: [1, 1, 5, 5, 5, 5]
      }]
    },
    airship: {
      name: ["生活舱", "供养舱", "重力模拟器", "太阳能帆板", "离子引擎", "防护系统", "控制中枢"],
      unlock: ["1-28", "2-28", "3-28", "6-28", "10-28", "20-28", "30-28"],
      add: ["10-18", "20-18", "30-18", "50-18", "100-18", "200-18", "300-18"]
    },
    spaceStation: {
      name: ["对接舱", "气闸舱", "轨道舱", "生活舱", "后勤服务舱", "轨道控制系统", "通讯系统", "能源系统"],
      unlock: ["1-32", "2-32", "3-32", "6-32", "11-32", "21-32", "30-32", "100-32"],
      add: ["10-20", "20-20", "30-20", "50-20", "100-20", "200-20", "300-20", "1000-20"]
    },
    galacticRuins: {
      name: ["未知文明废墟", "未知能量石", "核聚可控器", "超光速飞行器", "激光科技", "宇宙生命", "银河导航科技", "空间折叠图纸"],
      unlock: ["1-35", "2-35", "3-35", "6-35", "100-34", "200-34", "30-35", "100-35"],
      add: ["1-25", "2-25", "30-24", "50-24", "100-24", "200-24", "300-24", "1000-24"]
    },
    exileTribe: {
      name: ["能源结晶", "宇宙通讯器", "反重力科技", "白洞入口", "超行星爆炸", "宇宙虫洞", "虫洞穿梭机", "戴森环科技"],
      unlock: ["1-40", "2-40", "3-40", "6-40", "11-40", "21-40", "30-40", "100-40"],
      add: ["10-28", "20-28", "30-28", "50-28", "100-28", "200-28", "300-28", "1000-28"]
    },
    starCity: {
      name: ["外接区域", "能量接收区域", "能源转化区域", "文明交流区域", "城市主控区域", "星际主脑区域", "意识储存区域", "意识文明区域"],
      unlock: ["1-44", "2-44", "3-44", "6-44", "11-44", "21-44", "30-44", "100-44"],
      add: ["10-32", "20-32", "30-32", "50-32", "100-32", "200-32", "300-32", "1000-32"]
    },
    threeT: {
      name: ["基础文明", "恒星文明", "银河文明", "宇宙文明", "多元宇宙文明", "多维文明", "造物主文明", "造物主主宰"],
      unlock: ["1-48", "2-48", "3-48", "6-48", "11-48", "21-48", "30-48", "100-48"],
      add: ["1000-34", "2000-34", "3000-34", "5000-34", "10000-34", "20000-34", "30000-34", "100000-34"]
    },
    universe: {
      name: ["宇宙信徒", "智子载体", "智子", "水滴飞行器", "宇宙边缘节点", "宇宙起点", "造物主", "造物主核心"],
      unlock: ["1-52", "2-52", "3-52", "6-52", "11-52", "21-52", "30-52", "100-52"],
      add: ["10-40", "20-40", "30-40", "50-40", "100-40", "200-40", "300-40", "1000-40"]
    },
    figure: {
      1: {
        setp: 7,
        list: ["0,0,1,0,2", "1,1,0,0,3", "3,3,3,3,0", "1,2,3,0,0", "3,1,2,2,0"],
        tipsSteps: [0, 0, 1, 3, 0, 0, 4]
      },
      2: {
        setp: 9,
        list: ["1,1,1,2,3", "2,3,2,0,1", "3,2,2,3,0", "3,2,1,1,2", "2,2,2,0,3"],
        tipsSteps: [4, 4, 4, 0, 0, 0, 0, 3, 3]
      },
      3: {
        setp: 8,
        list: ["1,3,1,1,0", "2,0,0,0,0", "2,3,0,3,2", "2,2,3,0,2", "3,1,1,1,2"],
        tipsSteps: [0, 0, 0, 3, 4, 4, 2, 2]
      },
      4: {
        setp: 9,
        list: ["1,2,0,0,1", "1,3,1,0,0", "0,1,2,0,2", "0,3,3,0,2", "0,1,2,1,0"],
        tipsSteps: [1, 0, 0, 1, 1, 2, 2, 4, 4]
      },
      5: {
        setp: 7,
        list: ["2,2,2,1,3", "2,2,0,2,0", "1,2,1,0,1", "1,1,3,2,1", "2,1,3,1,2"],
        tipsSteps: [2, 2, 3, 0, 4, 2, 4]
      },
      6: {
        setp: 9,
        list: ["0,0,1,2,1", "2,1,2,3,0", "1,0,1,1,0", "2,2,2,0,0", "2,0,3,0,1"],
        tipsSteps: [3, 3, 3, 3, 0, 1, 1, 0, 0]
      },
      7: {
        setp: 7,
        list: ["1,1,1,0,1", "2,3,0,1,1", "2,1,1,3,0", "3,3,1,1,3", "3,2,2,0,3"],
        tipsSteps: [3, 4, 3, 0, 0, 2, 2]
      },
      8: {
        setp: 11,
        list: ["2,2,1,3,3", "3,3,0,1,2", "0,1,1,1,0", "1,3,3,2,1", "1,3,2,3,2"],
        tipsSteps: [3, 3, 3, 4, 4, 4, 2, 2, 0, 0, 0]
      },
      9: {
        setp: 8,
        list: ["2,2,2,0,3", "3,0,0,3,2", "3,0,3,1,1", "3,3,2,2,0", "2,3,2,3,1"],
        tipsSteps: [4, 4, 2, 2, 3, 3, 3, 2]
      },
      10: {
        setp: 7,
        list: ["3,1,0,2,3", "1,0,1,1,2", "0,0,2,3,2", "2,2,2,1,2", "2,2,3,2,3"],
        tipsSteps: [3, 3, 1, 2, 1, 1, 0]
      },
      11: {
        setp: 8,
        list: ["3,0,3,0,2", "0,1,3,0,3", "1,0,0,0,3", "2,3,1,3,3", "2,2,0,2,3"],
        tipsSteps: [0, 1, 1, 1, 4, 4, 3, 0]
      },
      12: {
        setp: 8,
        list: ["0,0,0,2,3", "1,3,3,3,2", "2,3,1,1,1", "1,3,1,1,1", "2,2,2,3,2"],
        tipsSteps: [4, 4, 3, 3, 0, 0, 0, 0]
      },
      13: {
        setp: 7,
        list: ["1,2,2,0,1", "2,0,0,2,0", "0,0,2,1,0", "0,2,3,2,1", "0,3,3,1,0"],
        tipsSteps: [3, 0, 2, 4, 4, 3, 0]
      },
      14: {
        setp: 8,
        list: ["3,3,2,2,3", "3,2,2,3,0", "1,0,2,0,0", "2,3,0,0,1", "1,3,3,1,0"],
        tipsSteps: [4, 4, 4, 4, 3, 0, 0, 1]
      },
      15: {
        setp: 7,
        list: ["2,2,0,2,1", "0,0,2,2,3", "3,3,3,3,2", "0,1,3,2,2", "3,0,1,1,2"],
        tipsSteps: [0, 0, 1, 3, 2, 2, 4]
      },
      16: {
        setp: 8,
        list: ["1,1,2,2,3", "0,0,1,1,1", "2,2,1,2,3", "2,0,0,3,2", "3,2,2,0,2"],
        tipsSteps: [1, 0, 0, 0, 4, 2, 3, 3]
      },
      17: {
        setp: 9,
        list: ["2,1,2,2,0", "0,0,3,0,3", "3,2,3,0,1", "3,3,3,1,1", "3,1,2,3,0"],
        tipsSteps: [4, 4, 4, 4, 0, 2, 1, 1, 1]
      },
      18: {
        setp: 8,
        list: ["0,0,1,3,3", "0,0,3,1,1", "2,3,2,0,3", "3,2,1,1,2", "0,1,1,0,2"],
        tipsSteps: [4, 2, 3, 4, 0, 0, 0, 2]
      },
      19: {
        setp: 9,
        list: ["1,1,1,2,3", "2,3,2,0,1", "3,2,2,3,0", "3,2,1,1,2", "2,2,2,0,3"],
        tipsSteps: [4, 4, 4, 0, 0, 0, 0, 3, 3]
      },
      20: {
        setp: 8,
        list: ["1,3,1,1,0", "2,0,0,0,0", "2,3,0,3,2", "2,2,3,0,2", "3,1,1,1,2"],
        tipsSteps: [0, 0, 0, 3, 4, 4, 2, 2]
      },
      21: {
        setp: 9,
        list: ["1,2,0,0,1", "1,3,1,0,0", "0,1,2,0,2", "0,3,3,0,2", "0,1,2,1,0"],
        tipsSteps: [1, 0, 0, 1, 1, 2, 2, 4, 4]
      },
      22: {
        setp: 7,
        list: ["2,2,2,1,3", "2,2,0,2,0", "1,2,1,0,1", "1,1,3,2,1", "2,1,3,1,2"],
        tipsSteps: [2, 2, 3, 0, 4, 2, 4]
      },
      23: {
        setp: 9,
        list: ["0,0,1,2,1", "2,1,2,3,0", "1,0,1,1,0", "2,2,2,0,0", "2,0,3,0,1"],
        tipsSteps: [3, 3, 3, 3, 0, 1, 1, 0, 0]
      },
      24: {
        setp: 7,
        list: ["1,1,1,0,1", "2,3,0,1,1", "2,1,1,3,0", "3,3,1,1,3", "3,2,2,0,3"],
        tipsSteps: [3, 4, 3, 0, 0, 2, 2]
      },
      25: {
        setp: 11,
        list: ["2,2,1,3,3", "3,3,0,1,2", "0,1,1,1,0", "1,3,3,2,1", "1,3,2,3,2"],
        tipsSteps: [3, 3, 3, 4, 4, 4, 2, 2, 0, 0, 0]
      },
      26: {
        setp: 8,
        list: ["2,2,2,0,3", "3,0,0,3,2", "3,0,3,1,1", "3,3,2,2,0", "2,3,2,3,1"],
        tipsSteps: [4, 4, 2, 2, 3, 3, 3, 2]
      },
      27: {
        setp: 7,
        list: ["3,1,0,2,3", "1,0,1,1,2", "0,0,2,3,2", "2,2,2,1,2", "2,2,3,2,3"],
        tipsSteps: [3, 3, 1, 2, 1, 1, 0]
      },
      28: {
        setp: 8,
        list: ["3,0,3,0,2", "0,1,3,0,3", "1,0,0,0,3", "2,3,1,3,3", "2,2,0,2,3"],
        tipsSteps: [0, 1, 1, 1, 4, 4, 3, 0]
      },
      29: {
        setp: 7,
        list: ["3,3,1,1,3", "2,1,1,1,1", "2,2,3,0,3", "1,1,2,3,3", "3,1,2,2,3"],
        tipsSteps: [2, 1, 0, 0, 1, 3, 3]
      },
      30: {
        setp: 7,
        list: ["1,2,2,0,1", "2,0,0,2,0", "0,0,2,1,0", "0,2,3,2,1", "0,3,3,1,0"],
        tipsSteps: [3, 0, 2, 4, 4, 3, 0]
      },
      31: {
        setp: 8,
        list: ["3,3,2,2,3", "3,2,2,3,0", "1,0,2,0,0", "2,3,0,0,1", "1,3,3,1,0"],
        tipsSteps: [4, 4, 4, 4, 3, 0, 0, 1]
      }
    }
  };
  return e = cc__decorate([ccp_ccclass], _ctor);
}();
exports.default = def_GameData;