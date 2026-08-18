var o = function (t) {
  var e;
  var o = Object.prototype;
  var a = o.hasOwnProperty;
  var n = "function" == typeof Symbol ? Symbol : {};
  var i = n.iterator || "@@iterator";
  var r = n.asyncIterator || "@@asyncIterator";
  var c = n.toStringTag || "@@toStringTag";
  function l(t, e, o) {
    Object.defineProperty(t, e, {
      value: o,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return t[e];
  }
  try {
    l({}, "");
  } catch (R) {
    l = function (t, e, o) {
      return t[e] = o;
    };
  }
  function s(t, e, o, a) {
    var n = e && e.prototype instanceof v ? e : v;
    var i = Object.create(n.prototype);
    var r = new I(a || []);
    i._invoke = G(t, o, r);
    return i;
  }
  function u(t, e, o) {
    try {
      return {
        type: "normal",
        arg: t.call(e, o)
      };
    } catch (R) {
      return {
        type: "throw",
        arg: R
      };
    }
  }
  t.wrap = s;
  var d = "suspendedStart";
  var p = "suspendedYield";
  var f = "executing";
  var h = "completed";
  var y = {};
  function v() {}
  function m() {}
  function g() {}
  var b = {};
  l(b, i, function () {
    return this;
  });
  var _ = Object.getPrototypeOf;
  var D = _ && _(_(T([])));
  D && D !== o && a.call(D, i) && (b = D);
  var S = g.prototype = v.prototype = Object.create(b);
  function w(t) {
    ["next", "throw", "return"].forEach(function (e) {
      l(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function E(t, e) {
    function o(n, i, r, c) {
      var l = u(t[n], t, i);
      if ("throw" !== l.type) {
        var s = l.arg;
        var d = s.value;
        if (d && "object" == typeof d && a.call(d, "__await")) {
          return e.resolve(d.__await).then(function (t) {
            o("next", t, r, c);
          }, function (t) {
            o("throw", t, r, c);
          });
        } else {
          return e.resolve(d).then(function (t) {
            s.value = t;
            r(s);
          }, function (t) {
            return o("throw", t, r, c);
          });
        }
      }
      c(l.arg);
    }
    var n;
    this._invoke = function (t, a) {
      function i() {
        return new e(function (e, n) {
          o(t, a, e, n);
        });
      }
      return n = n ? n.then(i, i) : i();
    };
  }
  function G(t, e, o) {
    var a = d;
    return function (n, i) {
      if (a === f) {
        throw new Error("Generator is already running");
      }
      if (a === h) {
        if ("throw" === n) {
          throw i;
        }
        return U();
      }
      o.method = n;
      for (o.arg = i;;) {
        var r = o.delegate;
        if (r) {
          var c = C(r, o);
          if (c) {
            if (c === y) {
              continue;
            }
            return c;
          }
        }
        if ("next" === o.method) {
          o.sent = o._sent = o.arg;
        } else if ("throw" === o.method) {
          if (a === d) {
            throw a = h, o.arg;
          }
          o.dispatchException(o.arg);
        } else {
          "return" === o.method && o.abrupt("return", o.arg);
        }
        a = f;
        var l = u(t, e, o);
        if ("normal" === l.type) {
          a = o.done ? h : p;
          if (l.arg === y) {
            continue;
          }
          return {
            value: l.arg,
            done: o.done
          };
        }
        if ("throw" === l.type) {
          a = h;
          o.method = "throw";
          o.arg = l.arg;
        }
      }
    };
  }
  function C(t, o) {
    var a = t.iterator[o.method];
    if (a === e) {
      o.delegate = null;
      if ("throw" === o.method) {
        if (t.iterator.return && (o.method = "return", o.arg = e, C(t, o), "throw" === o.method)) {
          return y;
        }
        o.method = "throw";
        o.arg = new TypeError("The iterator does not provide a 'throw' method");
      }
      return y;
    }
    var n = u(a, t.iterator, o.arg);
    if ("throw" === n.type) {
      o.method = "throw";
      o.arg = n.arg;
      o.delegate = null;
      return y;
    }
    var i = n.arg;
    if (i) {
      if (i.done) {
        return o[t.resultName] = i.value, o.next = t.nextLoc, "return" !== o.method && (o.method = "next", o.arg = e), o.delegate = null, y;
      } else {
        return i;
      }
    } else {
      return o.method = "throw", o.arg = new TypeError("iterator result is not an object"), o.delegate = null, y;
    }
  }
  function k(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]);
    if (2 in t) {
      e.finallyLoc = t[2];
      e.afterLoc = t[3];
    }
    this.tryEntries.push(e);
  }
  function A(t) {
    var e = t.completion || {};
    e.type = "normal";
    delete e.arg;
    t.completion = e;
  }
  function I(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }];
    t.forEach(k, this);
    this.reset(true);
  }
  function T(t) {
    if (t) {
      var o = t[i];
      if (o) {
        return o.call(t);
      }
      if ("function" == typeof t.next) {
        return t;
      }
      if (!isNaN(t.length)) {
        var n = -1;
        var r = function o() {
          for (; ++n < t.length;) {
            if (a.call(t, n)) {
              o.value = t[n];
              o.done = false;
              return o;
            }
          }
          o.value = e;
          o.done = true;
          return o;
        };
        return r.next = r;
      }
    }
    return {
      next: U
    };
  }
  function U() {
    return {
      value: e,
      done: true
    };
  }
  m.prototype = g;
  l(S, "constructor", g);
  l(g, "constructor", m);
  m.displayName = l(g, c, "GeneratorFunction");
  t.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === m || "GeneratorFunction" === (e.displayName || e.name));
  };
  t.mark = function (t) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(t, g);
    } else {
      t.__proto__ = g;
      l(t, c, "GeneratorFunction");
    }
    t.prototype = Object.create(S);
    return t;
  };
  t.awrap = function (t) {
    return {
      __await: t
    };
  };
  w(E.prototype);
  l(E.prototype, r, function () {
    return this;
  });
  t.AsyncIterator = E;
  t.async = function (e, o, a, n, i) {
    undefined === i && (i = Promise);
    var r = new E(s(e, o, a, n), i);
    if (t.isGeneratorFunction(o)) {
      return r;
    } else {
      return r.next().then(function (t) {
        if (t.done) {
          return t.value;
        } else {
          return r.next();
        }
      });
    }
  };
  w(S);
  l(S, c, "Generator");
  l(S, i, function () {
    return this;
  });
  l(S, "toString", function () {
    return "[object Generator]";
  });
  t.keys = function (t) {
    var e = [];
    for (var o in t) {
      e.push(o);
    }
    e.reverse();
    return function o() {
      for (; e.length;) {
        var a = e.pop();
        if (a in t) {
          o.value = a;
          o.done = false;
          return o;
        }
      }
      o.done = true;
      return o;
    };
  };
  t.values = T;
  I.prototype = {
    constructor: I,
    reset: function (t) {
      this.prev = 0;
      this.next = 0;
      this.sent = this._sent = e;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = e;
      this.tryEntries.forEach(A);
      if (!t) {
        for (var o in this) {
          "t" === o.charAt(0) && a.call(this, o) && !isNaN(+o.slice(1)) && (this[o] = e);
        }
      }
    },
    stop: function () {
      this.done = true;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) {
        throw t.arg;
      }
      return this.rval;
    },
    dispatchException: function (t) {
      if (this.done) {
        throw t;
      }
      var o = this;
      function n(a, n) {
        c.type = "throw";
        c.arg = t;
        o.next = a;
        if (n) {
          o.method = "next";
          o.arg = e;
        }
        return !!n;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var r = this.tryEntries[i];
        var c = r.completion;
        if ("root" === r.tryLoc) {
          return n("end");
        }
        if (r.tryLoc <= this.prev) {
          var l = a.call(r, "catchLoc");
          var s = a.call(r, "finallyLoc");
          if (l && s) {
            if (this.prev < r.catchLoc) {
              return n(r.catchLoc, true);
            }
            if (this.prev < r.finallyLoc) {
              return n(r.finallyLoc);
            }
          } else if (l) {
            if (this.prev < r.catchLoc) {
              return n(r.catchLoc, true);
            }
          } else {
            if (!s) {
              throw new Error("try statement without catch or finally");
            }
            if (this.prev < r.finallyLoc) {
              return n(r.finallyLoc);
            }
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var n = this.tryEntries[o];
        if (n.tryLoc <= this.prev && a.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
          var i = n;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var r = i ? i.completion : {};
      r.type = t;
      r.arg = e;
      if (i) {
        return this.method = "next", this.next = i.finallyLoc, y;
      } else {
        return this.complete(r);
      }
    },
    complete: function (t, e) {
      if ("throw" === t.type) {
        throw t.arg;
      }
      if ("break" === t.type || "continue" === t.type) {
        this.next = t.arg;
      } else if ("return" === t.type) {
        this.rval = this.arg = t.arg;
        this.method = "return";
        this.next = "end";
      } else {
        "normal" === t.type && e && (this.next = e);
      }
      return y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var o = this.tryEntries[e];
        if (o.finallyLoc === t) {
          this.complete(o.completion, o.afterLoc);
          A(o);
          return y;
        }
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var o = this.tryEntries[e];
        if (o.tryLoc === t) {
          var a = o.completion;
          if ("throw" === a.type) {
            var n = a.arg;
            A(o);
          }
          return n;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (t, o, a) {
      this.delegate = {
        iterator: T(t),
        resultName: o,
        nextLoc: a
      };
      "next" === this.method && (this.arg = e);
      return y;
    }
  };
  return t;
}("object" == typeof module ? module.exports : {});
try {
  regeneratorRuntime = o;
} catch (a) {
  if ("object" == typeof globalThis) {
    globalThis.regeneratorRuntime = o;
  } else {
    Function("n", "regeneratorRuntime=n")(o);
  }
}