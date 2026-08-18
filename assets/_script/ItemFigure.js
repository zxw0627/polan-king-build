var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
cc__decorator.property;
var def_ItemFigure = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.vid = 0;
    e.hid = 0;
    e.index = -1;
    e.isCanTouch = false;
    e.isTraverse = false;
    e.isDes = false;
    e.isTips = false;
    e.line = null;
    e.rightItem = null;
    e.downItem = null;
    e.rightLine = null;
    e.downLine = null;
    e.lineRoot = null;
    e.showNode = null;
    e.hideNode = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.hideNode = this.node.getChildByName("des0");
    this.showNode = this.node.getChildByName("des");
    this.line = this.node.getChildByName("line");
    this.lineRoot = this.node.parent.parent.getChildByName("lineRoot");
    this.line.parent = this.lineRoot;
    this.rightLine = this.line.children[1];
    this.downLine = this.line.children[0];
  };
  _ctor.prototype.show = function () {
    this.isCanTouch = true;
    this.hideNode.active = false;
    this.showNode.active = true;
  };
  _ctor.prototype.hide = function () {
    this.isCanTouch = false;
    this.hideNode.active = true;
    this.showNode.active = false;
  };
  _ctor.prototype.resetTraverse = function () {
    this.isTraverse = false;
  };
  _ctor.prototype.remove = function () {
    var t = this;
    this.node.parent = this.lineRoot;
    this.isDes = true;
    this.rightItem = null;
    this.downItem = null;
    this.show();
    this.node.targetOff(this);
    var e = this.node.y - 500;
    var o = 30 * Math.random() * (Math.random() > .5 ? 1 : -1);
    cc.tween(this.node).to(.7, {
      scale: 1.2,
      y: e,
      opacity: 0,
      angle: o
    }).call(function () {
      t.line.destroy();
      t.node.destroy();
    }).start();
  };
  _ctor.prototype.downOneMove = function (t) {
    this.vid += t;
    var e = this.node.y - 126 * t;
    cc.tween(this.node).to(.1, {
      y: e - 40
    }).to(.1, {
      y: e
    }, {
      easing: "backOut"
    }).start();
  };
  _ctor.prototype.touchStart = function () {
    cc.tween(this.hideNode).to(.1, {
      scale: .9
    }).start();
    cc.tween(this.showNode).to(.1, {
      scale: .9
    }).start();
    this.hideNode.color = new cc.Color(211, 211, 211, 255);
    this.showNode.color = new cc.Color(211, 211, 211, 255);
  };
  _ctor.prototype.touchEnd = function () {
    cc.tween(this.hideNode).to(.1, {
      scale: 1
    }).start();
    cc.tween(this.showNode).to(.1, {
      scale: 1
    }).start();
    this.hideNode.color = new cc.Color(255, 255, 255, 255);
    this.showNode.color = new cc.Color(255, 255, 255, 255);
  };
  _ctor.prototype.update = function () {
    this.line.x = this.node.x;
    this.line.y = this.node.y;
    if (this.rightItem) {
      this.rightLine.active = this.rightItem.index == this.index && this.rightItem.isCanTouch && this.isCanTouch;
    } else {
      this.rightLine.active = false;
    }
    if (this.downItem) {
      this.downLine.active = this.downItem.index == this.index && this.downItem.isCanTouch && this.isCanTouch;
    } else {
      this.downLine.active = false;
    }
  };
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_ItemFigure;