var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UIManager = undefined;
var $z1GameType = require("GameType");
var $z1BaseView = require("BaseView");
var $z1BundleManager = require("BundleManager");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var exp_UIManager = function () {
  function _ctor() {
    this.view = null;
    this.dialog = null;
    this.tips = null;
    this.top = null;
    this.loadWindow = null;
    this.view = cc.find("Canvas/ui/view");
    this.dialog = cc.find("Canvas/ui/dialog");
    this.tips = cc.find("Canvas/ui/tips");
    this.top = cc.find("Canvas/ui/top");
    e._instance = this;
    this.view.position = cc.v3(0, 0);
    this.dialog.position = cc.v3(0, 0);
    this.tips.position = cc.v3(0, 0);
    this.top.position = cc.v3(0, 0);
    cc.director.on($z1GameType.default.OPEN_VIEW, this.openView, this);
  }
  var e;
  e = _ctor;
  Object.defineProperty(_ctor, "inst", {
    get: function () {
      null == this._instance && (this._instance = new e());
      return this._instance;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.onDestroy = function () {};
  _ctor.prototype.returnHome = function () {
    this.view.children.forEach(function (t) {
      "GameHome" != t.name && (t.active = false);
    });
    this.dialog.children.forEach(function (t) {
      t.active = false;
    });
  };
  _ctor.prototype.openView = function (t, e, o, a, c, l) {
    var s = this;
    undefined === e && (e = 1);
    undefined === o && (o = false);
    undefined === l && (l = false);
    t != $z1GameType.UIConst.UI_HOME && e != $z1GameType.VIEW_TYPE.tips && e != $z1GameType.VIEW_TYPE.top && this.showLoading();
    var u = null;
    switch (e) {
      case $z1GameType.VIEW_TYPE.view:
        u = this.view;
        break;
      case $z1GameType.VIEW_TYPE.dialog:
        u = this.dialog;
        break;
      case $z1GameType.VIEW_TYPE.tips:
        u = this.tips;
        break;
      case $z1GameType.VIEW_TYPE.top:
        u = this.top;
    }
    if (o) {
      u.children.forEach(function (t) {
        t.active = false;
      });
      this.dialog.children.forEach(function (t) {
        t.active = false;
      });
    }
    var d = null;
    var p = t;
    if (l) {
      for (var f = 0; f < u.children.length; f++) {
        var h = u.children[f];
        if (!h.active && h.name.indexOf(p) >= 0) {
          d = h;
          break;
        }
      }
    } else {
      d = u.getChildByName(p);
    }
    if (d) {
      d.active = true;
      var y = u.children.length - 1;
      y = y < 0 ? 0 : y;
      d.setSiblingIndex(y);
      this.hideLoading();
      a && a(d);
      var v = d.getComponent($z1BaseView.BaseView);
      v && v.onShow && v && v.onShow && v.onShow(c);
    } else {
      $z1BundleManager.default.uiPrefabBundle.load(t, cc.Prefab, function (t, e) {
        (d = cc.instantiate(e)).parent = u;
        d.active = true;
        var o = u.children.length - 1;
        o = o < 0 ? 0 : o;
        d.setSiblingIndex(o);
        s.hideLoading();
        a && a(d);
        var n = d.getComponent($z1BaseView.BaseView);
        n && n.onShow && n && n.onShow && n.onShow(c);
      });
    }
  };
  _ctor.prototype.closeView = function (t, e) {
    undefined === e && (e = false);
    var o = [];
    this.view.children.forEach(function (e) {
      t == e.name && o.push(e);
    });
    this.dialog.children.forEach(function (e) {
      t == e.name && o.push(e);
    });
    this.tips.children.forEach(function (e) {
      t == e.name && o.push(e);
    });
    this.top.children.forEach(function (e) {
      t == e.name && o.push(e);
    });
    if (e) {
      for (var a = o.length - 1; a >= 0; a--) {
        o[a].destroy();
      }
    } else {
      o.forEach(function (t) {
        return t.active = false;
      });
    }
  };
  _ctor.prototype.cleanAllView = function () {
    var t = [];
    this.view.children.forEach(function (e) {
      t.push(e);
    });
    this.dialog.children.forEach(function (e) {
      t.push(e);
    });
    this.tips.children.forEach(function (e) {
      t.push(e);
    });
    this.top.children.forEach(function (e) {
      t.push(e);
    });
    for (var e = t.length - 1; e >= 0; e--) {
      t[e].destroy();
    }
  };
  _ctor.prototype.showLoading = function () {
    var t = this;
    if (this.loadWindow) {
      this.loadWindow.active = true;
    } else {
      console.error("调用显示loading");
      this.loadWindow = new cc.Node("loadingWindow");
      this.loadWindow.parent = this.top;
      $z1BundleManager.default.uiPrefabBundle.load($z1GameType.UIConst.UI_LOADING_WINDOW, cc.Prefab, function (e, o) {
        cc.instantiate(o).parent = t.loadWindow;
      });
    }
  };
  _ctor.prototype.hideLoading = function () {
    this.loadWindow && (this.loadWindow.active = false);
  };
  _ctor._instance = null;
  return e = cc__decorate([ccp_ccclass], _ctor);
}();
exports.UIManager = exp_UIManager;