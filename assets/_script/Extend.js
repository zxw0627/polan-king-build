cc.Node.prototype.findComponent = function (t) {
  return this.getComponent(t) || this.addComponent(t);
};
cc.Node.prototype.$ = function (t, e) {
  undefined === e && (e = false);
  if ("string" == typeof t) {
    return cc.find(t, this);
  } else {
    if (e) {
      return this.getComponentInChildren(t);
    } else {
      return this.getComponent(t);
    }
  }
};
cc.Node.prototype.hideChildren = function () {
  this.children.forEach(function (t) {
    return t.hide();
  });
};
cc.Node.prototype.show = function () {
  this.active = true;
};
cc.Node.prototype.hide = function () {
  this.active = false;
};
cc.Node.prototype.check = function () {
  this.isChecked = true;
};
cc.Node.prototype.uncheck = function () {
  this.isChecked = false;
};
cc.Node.prototype.getPhyCollider = function () {
  return this.$(cc.PhysicsBoxCollider) || this.$(cc.PhysicsCircleCollider) || this.$(cc.PhysicsPolygonCollider);
};
cc.Node.prototype.destroyAllChildrens = function (t) {
  this.getComponentsInChildren(t).forEach(function (t) {
    return t.node.destroy();
  });
};
cc.Node.prototype.toggle = function () {
  this.active = !this.active;
};
cc.Node.prototype.setLabel = function (t) {
  this.getComponent(cc.Label).string = t.toString();
};
cc.Node.prototype.setText = function (t) {
  this.getComponent(cc.RichText).string = t.toString();
};
cc.Node.prototype.setSpriteFrame = function (t) {
  this.getComponent(cc.Sprite).spriteFrame = t;
};
cc.Node.prototype.setProgress = function (t) {
  this.getComponent(cc.ProgressBar).progress = t;
};
cc.Node.prototype.click = function (t, e) {
  undefined === t && (t = null);
  undefined === e && (e = 0);
  this.on("touchend", function (e) {
    window.zsSoundMgr && window.zsSoundMgr.PlaySound("click");
    t && t(e);
  });
  this.findComponent(cc.Button).transition = cc.Button.Transition.SCALE;
};
Array.prototype.init = function (t, e) {
  for (; t > 0;) {
    this[--t] = e >= 0 ? e : t;
  }
  return this;
};
String.prototype.toNumber = function () {
  return +this;
};
String.prototype.toFormat = function (t) {
  return this.replace(/\d+$/, t + "");
};
String.prototype.format = function (t) {
  return this.replace(/\d/, t + "");
};