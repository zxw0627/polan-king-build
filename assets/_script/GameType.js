Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RED_TYPE = exports.ASSET_TYPE = exports.VIEW_TYPE = exports.GameState = exports.ResType = exports.UIConst = undefined;
var exp_UIConst = function () {
  function _ctor() {}
  _ctor.UI_HOME = "GameHome";
  _ctor.UI_LOADING_WINDOW = "LoadingWindow";
  _ctor.UI_COIN_FLY = "GameCoinFly";
  _ctor.UI_ROLE = "GameRole";
  _ctor.UI_GET = "GameGet";
  _ctor.UI_JOB = "GameJob";
  _ctor.UI_MSG = "GameMsg";
  _ctor.UI_Asset = "GameAsset";
  _ctor.UI_Video = "GameVideo";
  _ctor.UI_CITY = "GameCity";
  _ctor.UI_STAR = "GameStar";
  _ctor.UI_OFFLINE = "GameOffLine";
  _ctor.UI_SETTING = "GameSetting";
  _ctor.UI_GUIDE = "GameGuide";
  _ctor.UI_SHARE = "GameShare";
  _ctor.UI_TALENT = "GameTalent";
  _ctor.UI_SIDEINTO = "GameSideInto";
  _ctor.UI_CAISHEN = "GameCaiShen";
  _ctor.UI_GALAXY = "GameGalaxy";
  _ctor.UI_HANDBOOK = "GameHandBook";
  _ctor.UI_TREASURE = "GameTreasure";
  _ctor.UI_FigureStart = "GameFigureStart";
  _ctor.UI_Figure = "GameFigure";
  _ctor.UI_Airship = "GameAirship";
  _ctor.UI_Universe = "GameUniverse";
  _ctor.UI_SpaceStation = "GameSpaceStation";
  _ctor.UI_UniverseCom = "GameUniverseCom";
  return _ctor;
}();
exports.UIConst = exp_UIConst;
var def_GameType = function () {
  function t() {}
  t.UPDATE_RES = "UPDATE_RES";
  t.OPEN_VIEW = "OPEN_VIEW";
  t.REFERSH_CLICK = "REFERSH_CLICK";
  t.REFERSH_AUTO = "REFERSH_AUTO";
  t.REFERSH_ASSET = "REFERSH_ASSET";
  t.REFERSH_STAR = "REFERSH_STAR";
  t.REFERSH_STATE = "REFERSH_STATE";
  t.VIDEO_GRADEUP = "VIDEO_GRADEUP";
  t.CLOSE_GUIDE = "CLOSE_GUIDE";
  t.COINUISACLE = "COINUISACLE";
  t.GET_SIDEINTO_GIFT = "GET_SIDEINTO_GIFT";
  t.CLOSE_CAISHEN = "CLOSE_CAISHEN";
  t.REFERSH_GALAXY = "REFERSH_GALAXY";
  return t;
}();
exports.default = def_GameType;
(function (t) {
  t[t["金币"] = 1001] = "金币";
  t[t["钻石"] = 1002] = "钻石";
  t[t["体力"] = 1003] = "体力";
  t[t["声望"] = 1004] = "声望";
})(exports.ResType || (exports.ResType = {}));
(function (t) {
  t[t["等待"] = 1] = "等待";
  t[t["游戏中"] = 2] = "游戏中";
  t[t["暂停"] = 3] = "暂停";
  t[t["结束"] = 4] = "结束";
})(exports.GameState || (exports.GameState = {}));
(function (t) {
  t[t.view = 1] = "view";
  t[t.dialog = 2] = "dialog";
  t[t.tips = 3] = "tips";
  t[t.top = 4] = "top";
})(exports.VIEW_TYPE || (exports.VIEW_TYPE = {}));
(function (t) {
  t[t.real = 1] = "real";
  t[t.art = 2] = "art";
  t[t.build = 3] = "build";
})(exports.ASSET_TYPE || (exports.ASSET_TYPE = {}));
(function (t) {
  t[t["升级"] = 0] = "升级";
  t[t["雇佣"] = 1] = "雇佣";
  t[t["房产"] = 2] = "房产";
  t[t["古董"] = 3] = "古董";
  t[t["企业"] = 4] = "企业";
  t[t["城市"] = 5] = "城市";
  t[t["星球"] = 6] = "星球";
  t[t["星系"] = 7] = "星系";
  t[t["飞船"] = 8] = "飞船";
  t[t["空间站"] = 9] = "空间站";
  t[t["银河废墟"] = 10] = "银河废墟";
  t[t["流亡部落"] = 11] = "流亡部落";
  t[t["星际城市"] = 12] = "星际城市";
  t[t["三T文明"] = 13] = "三T文明";
  t[t["慈心宇宙"] = 14] = "慈心宇宙";
})(exports.RED_TYPE || (exports.RED_TYPE = {}));