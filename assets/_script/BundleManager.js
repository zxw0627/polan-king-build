Object.defineProperty(exports, "__esModule", {
  value: true
});
var def_BundleManager = function () {
  function _ctor() {}
  _ctor.setSprite = function (t, e, o) {
    undefined === o && (o = cc.resources);
    t.active = false;
    if (t.getComponent(cc.Sprite)) {
      o.load(e, cc.SpriteFrame, function (e, o) {
        if (e) {
          return console.error(e);
        }
        if (cc.isValid(t)) {
          t.setSpriteFrame(o);
          t.active = true;
        } else {
          console.error("节点已经被销毁了");
        }
      });
    } else {
      console.error("node isn't have Sprite");
    }
  };
  return _ctor;
}();
exports.default = def_BundleManager;