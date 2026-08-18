var i;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_DrawLineGame = function (o) {
  function _ctor() {
    var t = null !== o && o.apply(this, arguments) || this;
    t.img = null;
    t.bg = null;
    t.line = null;
    t.startPos = null;
    t.shitou1 = null;
    t.shitou2 = null;
    t.shitou3 = null;
    t.shitou4 = null;
    t.shitou5 = null;
    t.left = null;
    t.right = null;
    t.bottom = null;
    t.win = null;
    t.lose = null;
    t.addNum = 0;
    t.isdead = false;
    return t;
  }
  cc__extends(_ctor, o);
  _ctor.prototype.onLoad = function () {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
  };
  _ctor.prototype.start = function () {
    this.win.active = false;
    this.lose.active = false;
    this.startGame();
  };
  _ctor.prototype.startDrawa = function () {
    var o = this;
    if (this.line) {
      this.img.position = this.startPos.position;
      this.line.moveTo(this.startPos.x, this.startPos.y);
      this.linPos = new cc.Vec2(this.startPos.x, this.startPos.y);
      this.line.strokeColor = new cc.Color().fromHEX("#000000");
      this.schedule(function () {
        if (!o.isdead) {
          if (o.img.getBoundingBoxToWorld().intersects(o.shitou1.getBoundingBoxToWorld()) || o.img.getBoundingBoxToWorld().intersects(o.shitou2.getBoundingBoxToWorld()) || o.img.getBoundingBoxToWorld().intersects(o.shitou3.getBoundingBoxToWorld()) || o.img.getBoundingBoxToWorld().intersects(o.shitou4.getBoundingBoxToWorld()) || o.img.getBoundingBoxToWorld().intersects(o.shitou5.getBoundingBoxToWorld()) || o.img.getBoundingBoxToWorld().intersects(o.left.getBoundingBoxToWorld()) || o.img.getBoundingBoxToWorld().intersects(o.right.getBoundingBoxToWorld())) {
            console.log("碰到石头了");
            o.gameLose();
            return void (o.isdead = true);
          }
          if (o.img.getBoundingBoxToWorld().intersects(o.bottom.getBoundingBoxToWorld())) {
            console.log("到达底部了");
            o.gameWin();
            return void (o.isdead = true);
          }
          o.linPos.y -= 5;
          o.linPos.x += o.addNum;
          o.img.x = o.linPos.x;
          o.img.y = o.linPos.y;
          o.line.lineTo(o.linPos.x, o.linPos.y);
          o.line.stroke();
          o.bg.y += 5;
        }
      }, .01);
    }
  };
  _ctor.prototype.onTouchStart = function () {};
  _ctor.prototype.onTouchMove = function (o) {
    var t = this.node.convertToNodeSpaceAR(o.getLocation());
    this.addNum = .03 * t.x;
  };
  _ctor.prototype.gameLose = function () {
    this.lose.active = true;
  };
  _ctor.prototype.gameWin = function () {
    this.win.active = true;
  };
  _ctor.prototype.onTouchEnd = function () {};
  _ctor.prototype.startGame = function () {
    this.unscheduleAllCallbacks();
    this.win.active = false;
    this.lose.active = false;
    this.isdead = false;
    this.line.clear();
    this.bg.y = -903;
    this.startDrawa();
  };
  _ctor.prototype.closeGame = function () {
    this.node.active = false;
    this.node.destroy();
  };
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "img", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "bg", undefined);
  cc__decorate([ccp_property(cc.Graphics)], _ctor.prototype, "line", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "startPos", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "shitou1", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "shitou2", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "shitou3", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "shitou4", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "shitou5", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "left", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "right", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "bottom", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "win", undefined);
  cc__decorate([ccp_property(cc.Node)], _ctor.prototype, "lose", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_DrawLineGame;