Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_Util = function () {
  function _ctor() {}
  _ctor.DeepFindChildByName = function (t, e) {
    if (t.name === e) {
      return t;
    }
    var o = null;
    for (var a = 0; a < t.childrenCount; a++) {
      var n = t._children[a];
      if (n.name === e) {
        return n;
      }
      if (o = this.DeepFindChildByName(n, e)) {
        return o;
      }
    }
    return o;
  };
  _ctor.GetRandom = function (t) {
    return t[Math.floor(Math.random() * t.length)];
  };
  _ctor.GetRandomByCount = function (t, e) {
    undefined === e && (e = 1);
    if (t.length < e) {
      e = t.length;
      console.log("Util.GetRandomByCount 列表数量低于随机的数量", t.length, e);
      return t;
    }
    var o = [];
    var a = [];
    for (var n = 0; n < t.length; n++) {
      a.push(t[n]);
    }
    for (n = 0; n < e; n++) {
      var i = Math.floor(Math.random() * a.length);
      o.push(a.splice(i, 1)[0]);
    }
    return o;
  };
  _ctor.GetRandomByCountAndRate = function (t, e) {
    undefined === e && (e = 1);
    if (t.length < e) {
      e = t.length;
      console.log("Util.GetRandomByCount 列表数量低于随机的数量", t.length, e);
    }
    var o = [];
    var a = [];
    t.forEach(function (t) {
      return a.push(t);
    });
    for (var n = 0; n < e; n++) {
      var i = [];
      var r = 0;
      for (var c = 0; c < a.length; c++) {
        r += (s = a[c]).rate;
        i.push({
          id: s.id,
          rate: r,
          index: c
        });
      }
      var l = Math.random() * r;
      for (c = 0; c < i.length; c++) {
        var s;
        if (l <= (s = i[c]).rate) {
          o.push(a.splice(s.index, 1)[0]);
          break;
        }
      }
    }
    return o;
  };
  _ctor.VectorToAngle = function (t) {
    if (null == t) {
      return 0;
    } else {
      return this.ClampDegree(180 * Math.atan2(-t.y, t.x) / Math.PI - 90);
    }
  };
  _ctor.ClampDegree = function (t) {
    if (t >= 0 && t < 360) {
      return t;
    } else {
      return (t %= 360) < 0 && (t = 360 + t), t;
    }
  };
  _ctor.Clamp = function (t, e, o) {
    return Math.min(Math.max(t, e), o);
  };
  _ctor.getAngle = function (t) {
    return 180 * t / Math.PI;
  };
  _ctor.getRadian = function (t) {
    return Math.PI / 180 * t;
  };
  _ctor.Range = function (t, e) {
    if (t > e) {
      return -1;
    } else {
      if (t == e) {
        return t;
      } else {
        return Math.round(Math.random() * (e - t) + t);
      }
    }
  };
  _ctor.random = function (t, e) {
    var o = e - t;
    var a = Math.random();
    return t + Math.round(a * o);
  };
  _ctor.formatTimerHaveHour = function (t) {
    var e = Math.floor(t / 3600);
    var o = Math.floor((t - 3600 * e) / 60);
    var a = Math.floor(t - 3600 * e - 60 * o);
    var n = e.toString();
    e < 10 && (n = "0" + n);
    var i = o.toString();
    o < 10 && (i = "0" + i);
    var r = a.toString();
    a < 10 && (r = "0" + r);
    return e + ":" + i + ":" + r;
  };
  _ctor.formatTimer = function (t) {
    var e = Math.floor(t / 3600);
    var o = Math.floor((t - 3600 * e) / 60);
    var a = Math.floor(t - 3600 * e - 60 * o);
    var n = e.toString();
    e < 10 && (n = "0" + n);
    var i = o.toString();
    o < 10 && (i = "0" + i);
    var r = a.toString();
    a < 10 && (r = "0" + r);
    return i + ":" + r;
  };
  _ctor.formatDownTimer = function (t) {
    var e = Math.floor(t / 3600);
    var o = Math.floor((t - 3600 * e) / 60);
    var a = Math.floor(t - 3600 * e - 60 * o);
    var n = e.toString();
    e < 10 && (n = "0" + n);
    var i = o.toString();
    i = o < 10 ? "0  " + i : Math.floor(o / 10) + "  " + o % 10;
    var r = a.toString();
    return i + " : " + (a < 10 ? "0  " + r : Math.floor(a / 10) + "  " + a % 10);
  };
  _ctor.getTargetTime = function (t) {
    var e = t.split(" ")[0];
    var o = t.split(" ")[1];
    var a = new Date();
    a.setFullYear(e.split("-")[0]);
    a.setMonth(e.split("-")[1] - 1);
    a.setDate(e.split("-")[2]);
    a.setHours(o.split(":")[0]);
    a.setMinutes(o.split(":")[1]);
    a.setSeconds(o.split(":")[2]);
    return a.getTime();
  };
  _ctor.formatTimerHaveMsec = function (t) {
    var e = Math.floor(t);
    var o = Math.round(1e3 * (t - e));
    var a = o.toString();
    if (0 == o) {
      a = "000";
    } else if (o < 10) {
      a = "00" + a;
    } else {
      o < 100 && (a = "0" + a);
    }
    var n = Math.floor(t / 60);
    var i = Math.floor(t - 60 * n);
    var r = n.toString();
    n < 10 && (r = "0" + r);
    var c = i.toString();
    i < 10 && (c = "0" + c);
    return r + ":" + c + ":" + a;
  };
  _ctor.UpdateDir = function (t, e) {
    if (e && t) {
      var o = e.x - t.x;
      var a = e.z - t.z;
      var n = new cc.Vec3(o, 0, a);
      cc.Vec3.normalize(n, n);
      return n;
    }
  };
  _ctor.IsNumber = function (t) {
    return !(!/^\d+(\.\d+)?$/.test(t) && !/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/.test(t));
  };
  _ctor.dot = function (t, e) {
    return t.x * e.x + t.y * e.y;
  };
  _ctor.cross = function (t, e) {
    return t.x * e.y - t.y * e.x;
  };
  _ctor.pointInsideCircle = function (t, e, o) {
    if (0 === o) {
      return false;
    }
    var a = e[0] - t[0];
    var n = e[1] - t[1];
    return a * a + n * n <= o * o;
  };
  _ctor.lerp = function (t, e, o) {
    return t + (e - t) * Math.min(1, o);
  };
  _ctor.vectorsToDegress = function (t) {
    var e = cc.v2(1, 0);
    var o = cc.v2(t).signAngle(e);
    return cc.misc.radiansToDegrees(o);
  };
  _ctor.degreesToVectors = function (t) {
    var e = cc.misc.degreesToRadians(t);
    return cc.v2(1, 0).rotate(-e);
  };
  _ctor.getReflectedDir = function (t, e) {
    var o = new cc.Vec2(e.x, e.y);
    var a = t.dot(e);
    return t.sub(o.mul(2 * a));
  };
  _ctor.countNumToStr = function (t) {
    if (t = Number(t)) {
      return (t = Math.floor(t)) >= 1e18 ? t = Number((t / 1e18).toFixed(1)) + "E" : t >= 1e15 ? t = Number((t / 1e15).toFixed(1)) + "P" : t >= 1e12 ? t = Number((t / 1e12).toFixed(0)) + "T" : t >= 1e9 ? t = Number((t / 1e9).toFixed(0)) + "B" : t >= 1e6 ? t = Number((t / 1e6).toFixed(0)) + "M" : t >= 1e3 && (t = Number((t / 1e3).toFixed(0)) + "K"), t.toString();
    } else {
      return "0";
    }
  };
  _ctor.GetCoinString = function (t, e) {
    var o = "";
    var a = t.split("-");
    var n = a.length;
    var i = (n = n > this.coinType.length ? this.coinType.length : n) - e;
    i = i < 0 ? 0 : i;
    var r = [];
    for (var c = n - 1; c >= i; c--) {
      r.push(this.coinType[c]);
    }
    for (c = 0; c < r.length; c++) {
      var l = Number(a[c]);
      0 != l && (o += l + r[c]);
    }
    return o + (o ? "元" : "0元");
  };
  _ctor.formatCoin = function (t, e) {
    undefined === e && (e = 2);
    var o = t.toString();
    t >= 1e20 && (o = this.toNonExponential(t));
    var a = o.split("");
    var n = "";
    var i = 0;
    for (var r = a.length - 1; r >= 0; r--) {
      0 != i && i % 4 == 0 && (n = "-" + n);
      n = a[r] + n;
      i++;
    }
    return this.GetCoinString(n, e);
  };
  _ctor.toNonExponential = function (t) {
    t == Infinity && (t = 99e306);
    var e = t.toExponential().split("e");
    var o = 0;
    e[0].split(".").length > 1 && (o = e[0].split(".")[1].length);
    o && (e[0] = e[0].replace(".", ""));
    var a = Number(e[1].replace("+", ""));
    for (var n = o; n < a; n++) {
      e[0] += "0";
    }
    return e[0];
  };
  _ctor.rpxTopx = function (t) {
    var e = cc.view.getFrameSize().width / 750 * Number(t);
    return Math.floor(e);
  };
  _ctor.shuffle = function (t) {
    var e = null;
    var o = Math.random() * t.length | 0;
    for (var a = 0; a < t.length; a++) {
      e = t[a];
      t[a] = t[o];
      t[o] = e;
    }
  };
  _ctor.RangeArray = function (t, e, o, a) {
    if (t >= e) {
      return null;
    }
    if (o > e - t + 1) {
      return null;
    }
    var n = new Array();
    if (a) {
      for (; n.length < o;) {
        n.push(this.Range(t, e));
      }
    } else {
      for (; n.length < o;) {
        var i = this.Range(t, e);
        -1 == n.indexOf(i) && n.push(i);
      }
    }
    return n;
  };
  _ctor.beTweenVectorToAngle = function (t, e) {
    if (0 != t.len() && 0 != e.len()) {
      var o = cc.v2(e).signAngle(cc.v2(t));
      var a = cc.misc.radiansToDegrees(o);
      a < -90 && (a = -90 - (90 + a));
      a > 90 && (a = 180 - a);
      return a;
    }
  };
  _ctor.PointToLineDistance = function (t, e, o) {
    var a = o.sub(e);
    var n = t.sub(e);
    if (0 == a.len()) {
      return a.cross(n) / a.len();
    } else {
      return 0;
    }
  };
  _ctor.pointInPoly = function (t, e) {
    var o = false;
    var a = -1;
    var n = e.length;
    for (var i = n - 1; ++a < n; i = a) {
      (e[a].y <= t.y && t.y < e[i].y || e[i].y <= t.y && t.y < e[a].y) && t.x < (e[i].x - e[a].x) * (t.y - e[a].y) / (e[i].y - e[a].y) + e[a].x && (o = !o);
    }
    return o;
  };
  _ctor.getEquationResult = function (t, e, o) {
    var a = e * e - 4 * t * o;
    if (a >= 0) {
      var n = (-e + (a = Math.sqrt(a))) / (2 * t);
      var i = (-e - a) / (2 * t);
      return Math.max(n, i);
    }
    console.error("方程无解");
  };
  _ctor.getWindowScaling = function () {
    return cc.winSize.height / 1334;
  };
  _ctor.getCanvasScaling = function () {
    var t = cc.winSize.height / 1334;
    if (t > 1) {
      return 1;
    } else {
      return t;
    }
  };
  _ctor.correlationData = function (t, e) {
    if (!(t instanceof Array)) {
      for (var o in e) {
        if (Object.prototype.hasOwnProperty.call(e, o)) {
          if (0 == Reflect.has(t, o)) {
            t[o] = JSON.parse(JSON.stringify(e[o]));
          } else {
            this.correlationData(t[o], e[o]);
          }
        }
      }
    }
  };
  _ctor.coinType = ["", "万", "亿", "兆", "京", "垓", "秭", "穰", "沟", "涧", "正", "载", "极", "恒", "阿", "那"];
  return _ctor;
}();
exports.default = def_Util;