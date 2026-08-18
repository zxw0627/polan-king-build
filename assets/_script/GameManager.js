var a;
var cc__extends = __extends;
var cc__decorate = __decorate;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var $z1UIManager = require("UIManager");
var $z1Util = require("Util");
var cc__decorator = cc._decorator;
var ccp_ccclass = cc__decorator.ccclass;
var ccp_property = cc__decorator.property;
var def_GameManager = function (t) {
  function _ctor() {
    var e = null !== t && t.apply(this, arguments) || this;
    e.loading = null;
    return e;
  }
  cc__extends(_ctor, t);
  _ctor.prototype.onLoad = function () {
    this.node.scale = $z1Util.default.getCanvasScaling();
    cc.instantiate(this.loading).parent = $z1UIManager.UIManager.inst.view;
  };
  _ctor.prototype.start = function () {};
  cc__decorate([ccp_property({
    type: cc.Prefab,
    displayName: "加载界面预制"
  })], _ctor.prototype, "loading", undefined);
  return cc__decorate([ccp_ccclass], _ctor);
}(cc.Component);
exports.default = def_GameManager;