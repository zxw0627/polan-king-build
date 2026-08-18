var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseView = undefined;
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var exp_BaseView = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.viewData = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {};
  _ctor.prototype.start = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onEnable = function () {};
  _ctor.prototype.onShow = function (t) {
    t && (this.viewData = t);
  };
  _ctor.prototype.getViewData = function () {
    return this.viewData;
  };
  _ctor.prototype.addEvent = function () {};
  _ctor.prototype.removeEvent = function () {};
  _ctor.prototype.getWidget = function (t, e) {
    var o = arguments.length;
    var a = this.node;
    var n = t;
    if (2 == o) {
      a = arguments[0];
      n = arguments[1];
    }
    if (null == a) {
      return null;
    }
    var i = a.children.length;
    var r = a.children;
    if (a.name === n) {
      return a;
    }
    for (var c = 0; c < i; c++) {
      var l = r[c];
      if (l) {
        var s = this.getWidget(l, n);
        if (s) {
          return s;
        }
      }
    }
    return null;
  };
  _ctor.prototype.viewAni = function (t) {
    var e = this.node.getChildByName("plane");
    if (e) {
      e.scale = 0;
      cc.Tween.stopAllByTarget(e);
      cc.tween(e).to(.25, {
        scale: 1
      }, {
        easing: "backOut"
      }).call(function () {
        t && t();
      }).start();
    }
  };
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.BaseView = exp_BaseView;