Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var def_GuideManager = function () {
  function _ctor() {}
  Object.defineProperty(_ctor, "instance", {
    get: function () {
      this.instance_ || (this.instance_ = new _ctor());
      return this.instance_;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.log = function () {};
  Object.defineProperty(_ctor.prototype, "guideId", {
    get: function () {
      return $z1GameData.default.playerData.base.guide;
    },
    set: function (t) {
      $z1GameData.default.setGuide(t, false);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "guideStep", {
    get: function () {
      return $z1GameData.default.playerData.base.guideStep;
    },
    set: function (t) {
      $z1GameData.default.setGuideStep(t, false);
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getCurGuideConf = function () {
    return $z1GameData.default.GuideDict[this.guideId][this.guideStep];
  };
  _ctor.prototype.getGuideConf = function (t, e) {
    return $z1GameData.default.GuideDict[t][e];
  };
  _ctor.prototype.smallerThenGuild = function (t, e) {
    if (this.guideId != t) {
      return this.guideId < t;
    } else {
      return this.guideStep < e;
    }
  };
  _ctor.prototype.checkGuide = function (t, e) {
    if (t) {
      if (e) {
        return this.guideId == t && this.guideStep == e;
      } else {
        return this.guideId == t;
      }
    } else {
      return 0 != this.guideId;
    }
  };
  _ctor.prototype.completeGuide = function (t, e) {
    t = t || this.guideId;
    e = e || this.guideStep;
    var o = $z1GameData.default.GuideDict[t][e];
    if (o && $z1GameData.default.GuideDict[t][e + 1]) {
      this.guideStep++;
    } else if (o && o.saveGuide > 0) {
      $z1GameData.default.setGuide(o.saveGuide, false);
      $z1GameData.default.setGuideStep(1, true);
    } else if (o && 0 == o.saveGuide) {
      $z1GameData.default.setGuide(0, false), $z1GameData.default.setGuideStep(0, true);
    }
  };
  return _ctor;
}();
exports.default = def_GuideManager;