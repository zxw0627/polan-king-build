Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1GameData = require("GameData");
var def_SoundManager = function () {
  function _ctor() {}
  _ctor.init = function (e) {
    var o = this;
    this.setMusicVal($z1GameData.default.bMusicVal);
    this.setSoundVal($z1GameData.default.bSoundVal);
    if (this.bLoadFinish) {
      _ctor.playMusic(e);
    } else {
      cc.assetManager.loadBundle("sound", function (a, n) {
        if (!a) {
          n.load(e, cc.AudioClip, function (a, n) {
            var i = new cc.AudioSource();
            o.audioSourceDict[n.name] = i;
            i.clip = n;
            _ctor.playMusic(e, true, true);
          });
          n.loadDir("", cc.AudioClip, function (t, a) {
            if (!t) {
              for (var n = 0; n < a.length; n++) {
                var i = a[n];
                if (i.name != e) {
                  var r = new cc.AudioSource();
                  o.audioSourceDict[i.name] = r;
                  r.clip = i;
                }
              }
              o.bLoadFinish = true;
            }
          });
        }
      });
    }
  };
  _ctor.setMusicVal = function (t) {
    cc.audioEngine.setMusicVolume(t);
  };
  _ctor.setSoundVal = function (t) {
    cc.audioEngine.setEffectsVolume(t);
  };
  _ctor.stopMusic = function () {
    cc.audioEngine.stopMusic();
  };
  _ctor.playMusic = function (t, e, o) {
    undefined === e && (e = true);
    undefined === o && (o = false);
    var a = this.audioSourceDict[t];
    if ((o || this.bLoadFinish) && a) {
      this.stopMusic();
      cc.audioEngine.playMusic(a.clip, e);
    }
  };
  _ctor.playSound = function (t, e) {
    undefined === e && (e = false);
    var o = this.audioSourceDict[t];
    if (this.bLoadFinish && o) {
      return cc.audioEngine.playEffect(o.clip, e), o.getDuration();
    } else {
      return 0;
    }
  };
  _ctor.playSound1 = function (t, e) {
    undefined === e && (e = false);
    var o = this.audioSourceDict[t];
    if (this.bLoadFinish && o) {
      return cc.audioEngine.playEffect(o.clip, e);
    } else {
      return -1;
    }
  };
  _ctor.stopSound = function (t) {
    t >= 0 && cc.audioEngine.stopEffect(t);
  };
  _ctor.quickPlaySound = function (t, e) {
    undefined === e && (e = null);
    var o = cc.audioEngine.play(t, false, 1);
    null != e && cc.audioEngine.setFinishCallback(o, e);
  };
  _ctor.quickPlaySoundLoop = function (t) {
    return cc.audioEngine.play(t, true, 1);
  };
  _ctor.bLoadFinish = false;
  _ctor.audioSourceDict = {};
  return _ctor;
}();
exports.default = def_SoundManager;