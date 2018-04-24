// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com) │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com) │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\
// Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ┌────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.4.2 - JavaScript Events Library │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) │ \\
// └────────────────────────────────────────────────────────────┘ \\
(function(e) {
  var t = "0.4.2",
    n = "hasOwnProperty",
    r = /[\.\/]/,
    i = "*",
    s = function() {},
    o = function(e, t) {
      return e - t;
    },
    u,
    a,
    f = { n: {} },
    l = function(e, t) {
      e = String(e);
      var n = f,
        r = a,
        i = Array.prototype.slice.call(arguments, 2),
        s = l.listeners(e),
        c = 0,
        h = !1,
        p,
        d = [],
        v = {},
        m = [],
        g = u,
        y = [];
      (u = e), (a = 0);
      for (var b = 0, w = s.length; b < w; b++)
        "zIndex" in s[b] &&
          (d.push(s[b].zIndex), s[b].zIndex < 0 && (v[s[b].zIndex] = s[b]));
      d.sort(o);
      while (d[c] < 0) {
        (p = v[d[c++]]), m.push(p.apply(t, i));
        if (a) return (a = r), m;
      }
      for (b = 0; b < w; b++) {
        p = s[b];
        if ("zIndex" in p)
          if (p.zIndex == d[c]) {
            m.push(p.apply(t, i));
            if (a) break;
            do {
              c++, (p = v[d[c]]), p && m.push(p.apply(t, i));
              if (a) break;
            } while (p);
          } else v[p.zIndex] = p;
        else {
          m.push(p.apply(t, i));
          if (a) break;
        }
      }
      return (a = r), (u = g), m.length ? m : null;
    };
  (l._events = f),
    (l.listeners = function(e) {
      var t = e.split(r),
        n = f,
        s,
        o,
        u,
        a,
        l,
        c,
        h,
        p,
        d = [n],
        v = [];
      for (a = 0, l = t.length; a < l; a++) {
        p = [];
        for (c = 0, h = d.length; c < h; c++) {
          (n = d[c].n), (o = [n[t[a]], n[i]]), (u = 2);
          while (u--) (s = o[u]), s && (p.push(s), (v = v.concat(s.f || [])));
        }
        d = p;
      }
      return v;
    }),
    (l.on = function(e, t) {
      e = String(e);
      if (typeof t != "function") return function() {};
      var n = e.split(r),
        i = f;
      for (var o = 0, u = n.length; o < u; o++)
        (i = i.n),
          (i = (i.hasOwnProperty(n[o]) && i[n[o]]) || (i[n[o]] = { n: {} }));
      i.f = i.f || [];
      for (o = 0, u = i.f.length; o < u; o++) if (i.f[o] == t) return s;
      return (
        i.f.push(t),
        function(e) {
          +e == +e && (t.zIndex = +e);
        }
      );
    }),
    (l.f = function(e) {
      var t = [].slice.call(arguments, 1);
      return function() {
        l.apply(null, [e, null].concat(t).concat([].slice.call(arguments, 0)));
      };
    }),
    (l.stop = function() {
      a = 1;
    }),
    (l.nt = function(e) {
      return e ? new RegExp("(?:\\.|\\/|^)" + e + "(?:\\.|\\/|$)").test(u) : u;
    }),
    (l.nts = function() {
      return u.split(r);
    }),
    (l.off = l.unbind = function(e, t) {
      if (!e) {
        l._events = f = { n: {} };
        return;
      }
      var s = e.split(r),
        o,
        u,
        a,
        c,
        h,
        p,
        d,
        v = [f];
      for (c = 0, h = s.length; c < h; c++)
        for (p = 0; p < v.length; p += a.length - 2) {
          (a = [p, 1]), (o = v[p].n);
          if (s[c] != i) o[s[c]] && a.push(o[s[c]]);
          else for (u in o) o[n](u) && a.push(o[u]);
          v.splice.apply(v, a);
        }
      for (c = 0, h = v.length; c < h; c++) {
        o = v[c];
        while (o.n) {
          if (t) {
            if (o.f) {
              for (p = 0, d = o.f.length; p < d; p++)
                if (o.f[p] == t) {
                  o.f.splice(p, 1);
                  break;
                }
              !o.f.length && delete o.f;
            }
            for (u in o.n)
              if (o.n[n](u) && o.n[u].f) {
                var m = o.n[u].f;
                for (p = 0, d = m.length; p < d; p++)
                  if (m[p] == t) {
                    m.splice(p, 1);
                    break;
                  }
                !m.length && delete o.n[u].f;
              }
          } else {
            delete o.f;
            for (u in o.n) o.n[n](u) && o.n[u].f && delete o.n[u].f;
          }
          o = o.n;
        }
      }
    }),
    (l.once = function(e, t) {
      var n = function() {
        return l.unbind(e, n), t.apply(this, arguments);
      };
      return l.on(e, n);
    }),
    (l.version = t),
    (l.toString = function() {
      return "You are running Eve " + t;
    }),
    typeof module != "undefined" && module.exports
      ? (module.exports = l)
      : typeof define != "undefined"
        ? define("eve", [], function() {
            return l;
          })
        : (e.eve = l);
})(this),
  (function(e, t) {
    typeof define == "function" && define.amd
      ? define(["eve"], function(n) {
          return t(e, n);
        })
      : t(e, e.eve);
  })(this, function(e, t) {
    function n(e) {
      if (n.is(e, "function")) return r ? e() : t.on("raphael.DOMload", e);
      if (n.is(e, _))
        return n._engine.create[d](n, e.splice(0, 3 + n.is(e[0], O))).add(e);
      var i = Array.prototype.slice.call(arguments, 0);
      if (n.is(i[i.length - 1], "function")) {
        var s = i.pop();
        return r
          ? s.call(n._engine.create[d](n, i))
          : t.on("raphael.DOMload", function() {
              s.call(n._engine.create[d](n, i));
            });
      }
      return n._engine.create[d](n, arguments);
    }
    function dt(e) {
      if (Object(e) !== e) return e;
      var t = new e.constructor();
      for (var n in e) e[a](n) && (t[n] = dt(e[n]));
      return t;
    }
    function St(e, t) {
      for (var n = 0, r = e.length; n < r; n++)
        if (e[n] === t) return e.push(e.splice(n, 1)[0]);
    }
    function xt(e, t, n) {
      function r() {
        var i = Array.prototype.slice.call(arguments, 0),
          s = i.join("␀"),
          o = (r.cache = r.cache || {}),
          u = (r.count = r.count || []);
        return o[a](s)
          ? (St(u, s), n ? n(o[s]) : o[s])
          : (u.length >= 1e3 && delete o[u.shift()],
            u.push(s),
            (o[s] = e[d](t, i)),
            n ? n(o[s]) : o[s]);
      }
      return r;
    }
    function Nt() {
      return this.hex;
    }
    function Ct(e, t) {
      var n = [];
      for (var r = 0, i = e.length; i - 2 * !t > r; r += 2) {
        var s = [
          { x: +e[r - 2], y: +e[r - 1] },
          { x: +e[r], y: +e[r + 1] },
          { x: +e[r + 2], y: +e[r + 3] },
          { x: +e[r + 4], y: +e[r + 5] }
        ];
        t
          ? r
            ? i - 4 == r
              ? (s[3] = { x: +e[0], y: +e[1] })
              : i - 2 == r &&
                ((s[2] = { x: +e[0], y: +e[1] }),
                (s[3] = { x: +e[2], y: +e[3] }))
            : (s[0] = { x: +e[i - 2], y: +e[i - 1] })
          : i - 4 == r
            ? (s[3] = s[2])
            : r || (s[0] = { x: +e[r], y: +e[r + 1] }),
          n.push([
            "C",
            (-s[0].x + 6 * s[1].x + s[2].x) / 6,
            (-s[0].y + 6 * s[1].y + s[2].y) / 6,
            (s[1].x + 6 * s[2].x - s[3].x) / 6,
            (s[1].y + 6 * s[2].y - s[3].y) / 6,
            s[2].x,
            s[2].y
          ]);
      }
      return n;
    }
    function Lt(e, t, n, r, i) {
      var s = -3 * t + 9 * n - 9 * r + 3 * i,
        o = e * s + 6 * t - 12 * n + 6 * r;
      return e * o - 3 * t + 3 * n;
    }
    function At(e, t, n, r, i, s, o, u, a) {
      a == null && (a = 1), (a = a > 1 ? 1 : a < 0 ? 0 : a);
      var f = a / 2,
        l = 12,
        c = [
          -0.1252,
          0.1252,
          -0.3678,
          0.3678,
          -0.5873,
          0.5873,
          -0.7699,
          0.7699,
          -0.9041,
          0.9041,
          -0.9816,
          0.9816
        ],
        h = [
          0.2491,
          0.2491,
          0.2335,
          0.2335,
          0.2032,
          0.2032,
          0.1601,
          0.1601,
          0.1069,
          0.1069,
          0.0472,
          0.0472
        ],
        p = 0;
      for (var d = 0; d < l; d++) {
        var v = f * c[d] + f,
          m = Lt(v, e, n, i, o),
          g = Lt(v, t, r, s, u),
          y = m * m + g * g;
        p += h[d] * T.sqrt(y);
      }
      return f * p;
    }
    function Ot(e, t, n, r, i, s, o, u, a) {
      if (a < 0 || At(e, t, n, r, i, s, o, u) < a) return;
      var f = 1,
        l = f / 2,
        c = f - l,
        h,
        p = 0.01;
      h = At(e, t, n, r, i, s, o, u, c);
      while (k(h - a) > p)
        (l /= 2),
          (c += (h < a ? 1 : -1) * l),
          (h = At(e, t, n, r, i, s, o, u, c));
      return c;
    }
    function Mt(e, t, n, r, i, s, o, u) {
      if (
        N(e, n) < C(i, o) ||
        C(e, n) > N(i, o) ||
        N(t, r) < C(s, u) ||
        C(t, r) > N(s, u)
      )
        return;
      var a = (e * r - t * n) * (i - o) - (e - n) * (i * u - s * o),
        f = (e * r - t * n) * (s - u) - (t - r) * (i * u - s * o),
        l = (e - n) * (s - u) - (t - r) * (i - o);
      if (!l) return;
      var c = a / l,
        h = f / l,
        p = +c.toFixed(2),
        d = +h.toFixed(2);
      if (
        p < +C(e, n).toFixed(2) ||
        p > +N(e, n).toFixed(2) ||
        p < +C(i, o).toFixed(2) ||
        p > +N(i, o).toFixed(2) ||
        d < +C(t, r).toFixed(2) ||
        d > +N(t, r).toFixed(2) ||
        d < +C(s, u).toFixed(2) ||
        d > +N(s, u).toFixed(2)
      )
        return;
      return { x: c, y: h };
    }
    function _t(e, t) {
      return Pt(e, t);
    }
    function Dt(e, t) {
      return Pt(e, t, 1);
    }
    function Pt(e, t, r) {
      var i = n.bezierBBox(e),
        s = n.bezierBBox(t);
      if (!n.isBBoxIntersect(i, s)) return r ? 0 : [];
      var o = At.apply(0, e),
        u = At.apply(0, t),
        a = ~~(o / 5),
        f = ~~(u / 5),
        l = [],
        c = [],
        h = {},
        p = r ? 0 : [];
      for (var d = 0; d < a + 1; d++) {
        var v = n.findDotsAtSegment.apply(n, e.concat(d / a));
        l.push({ x: v.x, y: v.y, t: d / a });
      }
      for (d = 0; d < f + 1; d++)
        (v = n.findDotsAtSegment.apply(n, t.concat(d / f))),
          c.push({ x: v.x, y: v.y, t: d / f });
      for (d = 0; d < a; d++)
        for (var m = 0; m < f; m++) {
          var g = l[d],
            y = l[d + 1],
            b = c[m],
            w = c[m + 1],
            E = k(y.x - g.x) < 0.001 ? "y" : "x",
            S = k(w.x - b.x) < 0.001 ? "y" : "x",
            x = Mt(g.x, g.y, y.x, y.y, b.x, b.y, w.x, w.y);
          if (x) {
            if (h[x.x.toFixed(4)] == x.y.toFixed(4)) continue;
            h[x.x.toFixed(4)] = x.y.toFixed(4);
            var T = g.t + k((x[E] - g[E]) / (y[E] - g[E])) * (y.t - g.t),
              N = b.t + k((x[S] - b[S]) / (w[S] - b[S])) * (w.t - b.t);
            T >= 0 &&
              T <= 1 &&
              N >= 0 &&
              N <= 1 &&
              (r ? p++ : p.push({ x: x.x, y: x.y, t1: T, t2: N }));
          }
        }
      return p;
    }
    function Ht(e, t, r) {
      (e = n._path2curve(e)), (t = n._path2curve(t));
      var i,
        s,
        o,
        u,
        a,
        f,
        l,
        c,
        h,
        p,
        d = r ? 0 : [];
      for (var v = 0, m = e.length; v < m; v++) {
        var g = e[v];
        if (g[0] == "M") (i = a = g[1]), (s = f = g[2]);
        else {
          g[0] == "C"
            ? ((h = [i, s].concat(g.slice(1))), (i = h[6]), (s = h[7]))
            : ((h = [i, s, i, s, a, f, a, f]), (i = a), (s = f));
          for (var y = 0, b = t.length; y < b; y++) {
            var w = t[y];
            if (w[0] == "M") (o = l = w[1]), (u = c = w[2]);
            else {
              w[0] == "C"
                ? ((p = [o, u].concat(w.slice(1))), (o = p[6]), (u = p[7]))
                : ((p = [o, u, o, u, l, c, l, c]), (o = l), (u = c));
              var E = Pt(h, p, r);
              if (r) d += E;
              else {
                for (var S = 0, x = E.length; S < x; S++)
                  (E[S].segment1 = v),
                    (E[S].segment2 = y),
                    (E[S].bez1 = h),
                    (E[S].bez2 = p);
                d = d.concat(E);
              }
            }
          }
        }
      }
      return d;
    }
    function rn(e, t, n, r, i, s) {
      e != null
        ? ((this.a = +e),
          (this.b = +t),
          (this.c = +n),
          (this.d = +r),
          (this.e = +i),
          (this.f = +s))
        : ((this.a = 1),
          (this.b = 0),
          (this.c = 0),
          (this.d = 1),
          (this.e = 0),
          (this.f = 0));
    }
    function yn() {
      return this.x + y + this.y;
    }
    function bn() {
      return this.x + y + this.y + y + this.width + " × " + this.height;
    }
    function Mn(e, t, n, r, i, s) {
      function h(e) {
        return ((a * e + u) * e + o) * e;
      }
      function p(e, t) {
        var n = d(e, t);
        return ((c * n + l) * n + f) * n;
      }
      function d(e, t) {
        var n, r, i, s, f, l;
        for (i = e, l = 0; l < 8; l++) {
          s = h(i) - e;
          if (k(s) < t) return i;
          f = (3 * a * i + 2 * u) * i + o;
          if (k(f) < 1e-6) break;
          i -= s / f;
        }
        (n = 0), (r = 1), (i = e);
        if (i < n) return n;
        if (i > r) return r;
        while (n < r) {
          s = h(i);
          if (k(s - e) < t) return i;
          e > s ? (n = i) : (r = i), (i = (r - n) / 2 + n);
        }
        return i;
      }
      var o = 3 * t,
        u = 3 * (r - t) - o,
        a = 1 - o - u,
        f = 3 * n,
        l = 3 * (i - n) - f,
        c = 1 - f - l;
      return p(e, 1 / (200 * s));
    }
    function _n(e, t) {
      var n = [],
        r = {};
      (this.ms = t), (this.times = 1);
      if (e) {
        for (var i in e) e[a](i) && ((r[W(i)] = e[i]), n.push(W(i)));
        n.sort(st);
      }
      (this.anim = r), (this.top = n[n.length - 1]), (this.percents = n);
    }
    function Dn(e, r, s, o, u, f) {
      s = W(s);
      var l,
        c,
        h,
        p = [],
        d,
        m,
        g,
        y = e.ms,
        E = {},
        S = {},
        x = {};
      if (o)
        for (N = 0, C = kn.length; N < C; N++) {
          var T = kn[N];
          if (T.el.id == r.id && T.anim == e) {
            T.percent != s ? (kn.splice(N, 1), (h = 1)) : (c = T),
              r.attr(T.totalOrigin);
            break;
          }
        }
      else o = +S;
      for (var N = 0, C = e.percents.length; N < C; N++) {
        if (e.percents[N] == s || e.percents[N] > o * e.top) {
          (s = e.percents[N]),
            (m = e.percents[N - 1] || 0),
            (y = y / e.top * (s - m)),
            (d = e.percents[N + 1]),
            (l = e.anim[s]);
          break;
        }
        o && r.attr(e.anim[e.percents[N]]);
      }
      if (!l) return;
      if (!c) {
        for (var k in l)
          if (l[a](k))
            if (J[a](k) || r.paper.customAttributes[a](k)) {
              (E[k] = r.attr(k)), E[k] == null && (E[k] = $[k]), (S[k] = l[k]);
              switch (J[k]) {
                case O:
                  x[k] = (S[k] - E[k]) / y;
                  break;
                case "colour":
                  E[k] = n.getRGB(E[k]);
                  var L = n.getRGB(S[k]);
                  x[k] = {
                    r: (L.r - E[k].r) / y,
                    g: (L.g - E[k].g) / y,
                    b: (L.b - E[k].b) / y
                  };
                  break;
                case "path":
                  var A = Xt(E[k], S[k]),
                    M = A[1];
                  (E[k] = A[0]), (x[k] = []);
                  for (N = 0, C = E[k].length; N < C; N++) {
                    x[k][N] = [0];
                    for (var _ = 1, D = E[k][N].length; _ < D; _++)
                      x[k][N][_] = (M[N][_] - E[k][N][_]) / y;
                  }
                  break;
                case "transform":
                  var P = r._,
                    H = nn(P[k], S[k]);
                  if (H) {
                    (E[k] = H.from),
                      (S[k] = H.to),
                      (x[k] = []),
                      (x[k].real = !0);
                    for (N = 0, C = E[k].length; N < C; N++) {
                      x[k][N] = [E[k][N][0]];
                      for (_ = 1, D = E[k][N].length; _ < D; _++)
                        x[k][N][_] = (S[k][N][_] - E[k][N][_]) / y;
                    }
                  } else {
                    var B = r.matrix || new rn(),
                      j = {
                        _: { transform: P.transform },
                        getBBox: function() {
                          return r.getBBox(1);
                        }
                      };
                    (E[k] = [B.a, B.b, B.c, B.d, B.e, B.f]),
                      en(j, S[k]),
                      (S[k] = j._.transform),
                      (x[k] = [
                        (j.matrix.a - B.a) / y,
                        (j.matrix.b - B.b) / y,
                        (j.matrix.c - B.c) / y,
                        (j.matrix.d - B.d) / y,
                        (j.matrix.e - B.e) / y,
                        (j.matrix.f - B.f) / y
                      ]);
                  }
                  break;
                case "csv":
                  var F = b(l[k])[w](i),
                    I = b(E[k])[w](i);
                  if (k == "clip-rect") {
                    (E[k] = I), (x[k] = []), (N = I.length);
                    while (N--) x[k][N] = (F[N] - E[k][N]) / y;
                  }
                  S[k] = F;
                  break;
                default:
                  (F = [][v](l[k])),
                    (I = [][v](E[k])),
                    (x[k] = []),
                    (N = r.paper.customAttributes[k].length);
                  while (N--) x[k][N] = ((F[N] || 0) - (I[N] || 0)) / y;
              }
            }
        var q = l.easing,
          U = n.easing_formulas[q];
        if (!U) {
          U = b(q).match(R);
          if (U && U.length == 5) {
            var z = U;
            U = function(e) {
              return Mn(e, +z[1], +z[2], +z[3], +z[4], y);
            };
          } else U = ut;
        }
        (g = l.start || e.start || +new Date()),
          (T = {
            anim: e,
            percent: s,
            timestamp: g,
            start: g + (e.del || 0),
            status: 0,
            initstatus: o || 0,
            stop: !1,
            ms: y,
            easing: U,
            from: E,
            diff: x,
            to: S,
            el: r,
            callback: l.callback,
            prev: m,
            next: d,
            repeat: f || e.times,
            origin: r.attr(),
            totalOrigin: u
          }),
          kn.push(T);
        if (o && !c && !h) {
          (T.stop = !0), (T.start = new Date() - y * o);
          if (kn.length == 1) return An();
        }
        h && (T.start = new Date() - T.ms * o), kn.length == 1 && Ln(An);
      } else (c.initstatus = o), (c.start = new Date() - c.ms * o);
      t("raphael.anim.start." + r.id, r, e);
    }
    function Pn(e) {
      for (var t = 0; t < kn.length; t++)
        kn[t].el.paper == e && kn.splice(t--, 1);
    }
    (n.version = "2.1.0"), (n.eve = t);
    var r,
      i = /[, ]+/,
      s = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
      o = /\{(\d+)\}/g,
      u = "prototype",
      a = "hasOwnProperty",
      f = { doc: document, win: e },
      l = {
        was: Object.prototype[a].call(f.win, "Raphael"),
        is: f.win.Raphael
      },
      c = function() {
        this.ca = this.customAttributes = {};
      },
      h,
      p = "appendChild",
      d = "apply",
      v = "concat",
      m =
        "ontouchstart" in f.win ||
        (f.win.DocumentTouch && f.doc instanceof DocumentTouch),
      g = "",
      y = " ",
      b = String,
      w = "split",
      E = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[
        w
      ](y),
      S = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      },
      x = b.prototype.toLowerCase,
      T = Math,
      N = T.max,
      C = T.min,
      k = T.abs,
      L = T.pow,
      A = T.PI,
      O = "number",
      M = "string",
      _ = "array",
      D = "toString",
      P = "fill",
      H = Object.prototype.toString,
      B = {},
      j = "push",
      F = (n._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i),
      I = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
      q = { NaN: 1, Infinity: 1, "-Infinity": 1 },
      R = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
      U = T.round,
      z = "setAttribute",
      W = parseFloat,
      X = parseInt,
      V = b.prototype.toUpperCase,
      $ = (n._availableAttrs = {
        "arrow-end": "none",
        "arrow-start": "none",
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        fill: "#fff",
        "fill-opacity": 1,
        font: '10px "Arial"',
        "font-family": '"Arial"',
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: 0,
        height: 0,
        href: "http://raphaeljs.com/",
        "letter-spacing": 0,
        opacity: 1,
        path: "M0,0",
        r: 0,
        rx: 0,
        ry: 0,
        src: "",
        stroke: "#000",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        "text-anchor": "middle",
        title: "Raphael",
        transform: "",
        width: 0,
        x: 0,
        y: 0
      }),
      J = (n._availableAnimAttrs = {
        blur: O,
        "clip-rect": "csv",
        cx: O,
        cy: O,
        fill: "colour",
        "fill-opacity": O,
        "font-size": O,
        height: O,
        opacity: O,
        path: "path",
        r: O,
        rx: O,
        ry: O,
        stroke: "colour",
        "stroke-opacity": O,
        "stroke-width": O,
        transform: "transform",
        width: O,
        x: O,
        y: O
      }),
      K = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
      Q = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
      G = { hs: 1, rg: 1 },
      Y = /,?([achlmqrstvxz]),?/gi,
      Z = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
      et = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
      tt = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
      nt = (n._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/),
      rt = {},
      it = function(e, t) {
        return e.key - t.key;
      },
      st = function(e, t) {
        return W(e) - W(t);
      },
      ot = function() {},
      ut = function(e) {
        return e;
      },
      at = (n._rectPath = function(e, t, n, r, i) {
        return i
          ? [
              ["M", e + i, t],
              ["l", n - i * 2, 0],
              ["a", i, i, 0, 0, 1, i, i],
              ["l", 0, r - i * 2],
              ["a", i, i, 0, 0, 1, -i, i],
              ["l", i * 2 - n, 0],
              ["a", i, i, 0, 0, 1, -i, -i],
              ["l", 0, i * 2 - r],
              ["a", i, i, 0, 0, 1, i, -i],
              ["z"]
            ]
          : [["M", e, t], ["l", n, 0], ["l", 0, r], ["l", -n, 0], ["z"]];
      }),
      ft = function(e, t, n, r) {
        return (
          r == null && (r = n),
          [
            ["M", e, t],
            ["m", 0, -r],
            ["a", n, r, 0, 1, 1, 0, 2 * r],
            ["a", n, r, 0, 1, 1, 0, -2 * r],
            ["z"]
          ]
        );
      },
      lt = (n._getPath = {
        path: function(e) {
          return e.attr("path");
        },
        circle: function(e) {
          var t = e.attrs;
          return ft(t.cx, t.cy, t.r);
        },
        ellipse: function(e) {
          var t = e.attrs;
          return ft(t.cx, t.cy, t.rx, t.ry);
        },
        rect: function(e) {
          var t = e.attrs;
          return at(t.x, t.y, t.width, t.height, t.r);
        },
        image: function(e) {
          var t = e.attrs;
          return at(t.x, t.y, t.width, t.height);
        },
        text: function(e) {
          var t = e._getBBox();
          return at(t.x, t.y, t.width, t.height);
        },
        set: function(e) {
          var t = e._getBBox();
          return at(t.x, t.y, t.width, t.height);
        }
      }),
      ct = (n.mapPath = function(e, t) {
        if (!t) return e;
        var n, r, i, s, o, u, a;
        e = Xt(e);
        for (i = 0, o = e.length; i < o; i++) {
          a = e[i];
          for (s = 1, u = a.length; s < u; s += 2)
            (n = t.x(a[s], a[s + 1])),
              (r = t.y(a[s], a[s + 1])),
              (a[s] = n),
              (a[s + 1] = r);
        }
        return e;
      });
    (n._g = f),
      (n.type =
        f.win.SVGAngle ||
        f.doc.implementation.hasFeature(
          "http://www.w3.org/TR/SVG11/feature#BasicStructure",
          "1.1"
        )
          ? "SVG"
          : "VML");
    if (n.type == "VML") {
      var ht = f.doc.createElement("div"),
        pt;
      (ht.innerHTML = '<v:shape adj="1"/>'),
        (pt = ht.firstChild),
        (pt.style.behavior = "url(#default#VML)");
      if (!pt || typeof pt.adj != "object") return (n.type = g);
      ht = null;
    }
    (n.svg = !(n.vml = n.type == "VML")),
      (n._Paper = c),
      (n.fn = h = c.prototype = n.prototype),
      (n._id = 0),
      (n._oid = 0),
      (n.is = function(e, t) {
        return (
          (t = x.call(t)),
          t == "finite"
            ? !q[a](+e)
            : t == "array"
              ? e instanceof Array
              : (t == "null" && e === null) ||
                (t == typeof e && e !== null) ||
                (t == "object" && e === Object(e)) ||
                (t == "array" && Array.isArray && Array.isArray(e)) ||
                H.call(e)
                  .slice(8, -1)
                  .toLowerCase() == t
        );
      }),
      (n.angle = function(e, t, r, i, s, o) {
        if (s == null) {
          var u = e - r,
            a = t - i;
          return !u && !a ? 0 : (180 + T.atan2(-a, -u) * 180 / A + 360) % 360;
        }
        return n.angle(e, t, s, o) - n.angle(r, i, s, o);
      }),
      (n.rad = function(e) {
        return (e % 360) * A / 180;
      }),
      (n.deg = function(e) {
        return (e * 180 / A) % 360;
      }),
      (n.snapTo = function(e, t, r) {
        r = n.is(r, "finite") ? r : 10;
        if (n.is(e, _)) {
          var i = e.length;
          while (i--) if (k(e[i] - t) <= r) return e[i];
        } else {
          e = +e;
          var s = t % e;
          if (s < r) return t - s;
          if (s > e - r) return t - s + e;
        }
        return t;
      });
    var vt = (n.createUUID = (function(e, t) {
      return function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
          .replace(e, t)
          .toUpperCase();
      };
    })(/[xy]/g, function(e) {
      var t = (T.random() * 16) | 0,
        n = e == "x" ? t : (t & 3) | 8;
      return n.toString(16);
    }));
    n.setWindow = function(e) {
      t("raphael.setWindow", n, f.win, e),
        (f.win = e),
        (f.doc = f.win.document),
        n._engine.initWin && n._engine.initWin(f.win);
    };
    var mt = function(e) {
        if (n.vml) {
          var t = /^\s+|\s+$/g,
            r;
          try {
            var i = new ActiveXObject("htmlfile");
            i.write("<body>"), i.close(), (r = i.body);
          } catch (s) {
            r = createPopup().document.body;
          }
          var o = r.createTextRange();
          mt = xt(function(e) {
            try {
              r.style.color = b(e).replace(t, g);
              var n = o.queryCommandValue("ForeColor");
              return (
                (n = ((n & 255) << 16) | (n & 65280) | ((n & 16711680) >>> 16)),
                "#" + ("000000" + n.toString(16)).slice(-6)
              );
            } catch (i) {
              return "none";
            }
          });
        } else {
          var u = f.doc.createElement("i");
          (u.title = "Raphaël Colour Picker"),
            (u.style.display = "none"),
            f.doc.body.appendChild(u),
            (mt = xt(function(e) {
              return (
                (u.style.color = e),
                f.doc.defaultView
                  .getComputedStyle(u, g)
                  .getPropertyValue("color")
              );
            }));
        }
        return mt(e);
      },
      gt = function() {
        return "hsb(" + [this.h, this.s, this.b] + ")";
      },
      yt = function() {
        return "hsl(" + [this.h, this.s, this.l] + ")";
      },
      bt = function() {
        return this.hex;
      },
      wt = function(e, t, r) {
        t == null &&
          n.is(e, "object") &&
          "r" in e &&
          "g" in e &&
          "b" in e &&
          ((r = e.b), (t = e.g), (e = e.r));
        if (t == null && n.is(e, M)) {
          var i = n.getRGB(e);
          (e = i.r), (t = i.g), (r = i.b);
        }
        if (e > 1 || t > 1 || r > 1) (e /= 255), (t /= 255), (r /= 255);
        return [e, t, r];
      },
      Et = function(e, t, r, i) {
        (e *= 255), (t *= 255), (r *= 255);
        var s = { r: e, g: t, b: r, hex: n.rgb(e, t, r), toString: bt };
        return n.is(i, "finite") && (s.opacity = i), s;
      };
    (n.color = function(e) {
      var t;
      return (
        n.is(e, "object") && "h" in e && "s" in e && "b" in e
          ? ((t = n.hsb2rgb(e)),
            (e.r = t.r),
            (e.g = t.g),
            (e.b = t.b),
            (e.hex = t.hex))
          : n.is(e, "object") && "h" in e && "s" in e && "l" in e
            ? ((t = n.hsl2rgb(e)),
              (e.r = t.r),
              (e.g = t.g),
              (e.b = t.b),
              (e.hex = t.hex))
            : (n.is(e, "string") && (e = n.getRGB(e)),
              n.is(e, "object") && "r" in e && "g" in e && "b" in e
                ? ((t = n.rgb2hsl(e)),
                  (e.h = t.h),
                  (e.s = t.s),
                  (e.l = t.l),
                  (t = n.rgb2hsb(e)),
                  (e.v = t.b))
                : ((e = { hex: "none" }),
                  (e.r = e.g = e.b = e.h = e.s = e.v = e.l = -1))),
        (e.toString = bt),
        e
      );
    }),
      (n.hsb2rgb = function(e, t, n, r) {
        this.is(e, "object") &&
          "h" in e &&
          "s" in e &&
          "b" in e &&
          ((n = e.b), (t = e.s), (e = e.h), (r = e.o)),
          (e *= 360);
        var i, s, o, u, a;
        return (
          (e = (e % 360) / 60),
          (a = n * t),
          (u = a * (1 - k(e % 2 - 1))),
          (i = s = o = n - a),
          (e = ~~e),
          (i += [a, u, 0, 0, u, a][e]),
          (s += [u, a, a, u, 0, 0][e]),
          (o += [0, 0, u, a, a, u][e]),
          Et(i, s, o, r)
        );
      }),
      (n.hsl2rgb = function(e, t, n, r) {
        this.is(e, "object") &&
          "h" in e &&
          "s" in e &&
          "l" in e &&
          ((n = e.l), (t = e.s), (e = e.h));
        if (e > 1 || t > 1 || n > 1) (e /= 360), (t /= 100), (n /= 100);
        e *= 360;
        var i, s, o, u, a;
        return (
          (e = (e % 360) / 60),
          (a = 2 * t * (n < 0.5 ? n : 1 - n)),
          (u = a * (1 - k(e % 2 - 1))),
          (i = s = o = n - a / 2),
          (e = ~~e),
          (i += [a, u, 0, 0, u, a][e]),
          (s += [u, a, a, u, 0, 0][e]),
          (o += [0, 0, u, a, a, u][e]),
          Et(i, s, o, r)
        );
      }),
      (n.rgb2hsb = function(e, t, n) {
        (n = wt(e, t, n)), (e = n[0]), (t = n[1]), (n = n[2]);
        var r, i, s, o;
        return (
          (s = N(e, t, n)),
          (o = s - C(e, t, n)),
          (r =
            o == 0
              ? null
              : s == e
                ? (t - n) / o
                : s == t
                  ? (n - e) / o + 2
                  : (e - t) / o + 4),
          (r = ((r + 360) % 6) * 60 / 360),
          (i = o == 0 ? 0 : o / s),
          { h: r, s: i, b: s, toString: gt }
        );
      }),
      (n.rgb2hsl = function(e, t, n) {
        (n = wt(e, t, n)), (e = n[0]), (t = n[1]), (n = n[2]);
        var r, i, s, o, u, a;
        return (
          (o = N(e, t, n)),
          (u = C(e, t, n)),
          (a = o - u),
          (r =
            a == 0
              ? null
              : o == e
                ? (t - n) / a
                : o == t
                  ? (n - e) / a + 2
                  : (e - t) / a + 4),
          (r = ((r + 360) % 6) * 60 / 360),
          (s = (o + u) / 2),
          (i = a == 0 ? 0 : s < 0.5 ? a / (2 * s) : a / (2 - 2 * s)),
          { h: r, s: i, l: s, toString: yt }
        );
      }),
      (n._path2string = function() {
        return this.join(",").replace(Y, "$1");
      });
    var Tt = (n._preload = function(e, t) {
      var n = f.doc.createElement("img");
      (n.style.cssText = "position:absolute;left:-9999em;top:-9999em"),
        (n.onload = function() {
          t.call(this), (this.onload = null), f.doc.body.removeChild(this);
        }),
        (n.onerror = function() {
          f.doc.body.removeChild(this);
        }),
        f.doc.body.appendChild(n),
        (n.src = e);
    });
    (n.getRGB = xt(function(e) {
      if (!e || !!((e = b(e)).indexOf("-") + 1))
        return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: Nt };
      if (e == "none")
        return { r: -1, g: -1, b: -1, hex: "none", toString: Nt };
      !G[a](e.toLowerCase().substring(0, 2)) &&
        e.charAt() != "#" &&
        (e = mt(e));
      var t,
        r,
        i,
        s,
        o,
        u,
        f,
        l = e.match(I);
      return l
        ? (l[2] &&
            ((s = X(l[2].substring(5), 16)),
            (i = X(l[2].substring(3, 5), 16)),
            (r = X(l[2].substring(1, 3), 16))),
          l[3] &&
            ((s = X((u = l[3].charAt(3)) + u, 16)),
            (i = X((u = l[3].charAt(2)) + u, 16)),
            (r = X((u = l[3].charAt(1)) + u, 16))),
          l[4] &&
            ((f = l[4][w](Q)),
            (r = W(f[0])),
            f[0].slice(-1) == "%" && (r *= 2.55),
            (i = W(f[1])),
            f[1].slice(-1) == "%" && (i *= 2.55),
            (s = W(f[2])),
            f[2].slice(-1) == "%" && (s *= 2.55),
            l[1].toLowerCase().slice(0, 4) == "rgba" && (o = W(f[3])),
            f[3] && f[3].slice(-1) == "%" && (o /= 100)),
          l[5]
            ? ((f = l[5][w](Q)),
              (r = W(f[0])),
              f[0].slice(-1) == "%" && (r *= 2.55),
              (i = W(f[1])),
              f[1].slice(-1) == "%" && (i *= 2.55),
              (s = W(f[2])),
              f[2].slice(-1) == "%" && (s *= 2.55),
              (f[0].slice(-3) == "deg" || f[0].slice(-1) == "°") && (r /= 360),
              l[1].toLowerCase().slice(0, 4) == "hsba" && (o = W(f[3])),
              f[3] && f[3].slice(-1) == "%" && (o /= 100),
              n.hsb2rgb(r, i, s, o))
            : l[6]
              ? ((f = l[6][w](Q)),
                (r = W(f[0])),
                f[0].slice(-1) == "%" && (r *= 2.55),
                (i = W(f[1])),
                f[1].slice(-1) == "%" && (i *= 2.55),
                (s = W(f[2])),
                f[2].slice(-1) == "%" && (s *= 2.55),
                (f[0].slice(-3) == "deg" || f[0].slice(-1) == "°") &&
                  (r /= 360),
                l[1].toLowerCase().slice(0, 4) == "hsla" && (o = W(f[3])),
                f[3] && f[3].slice(-1) == "%" && (o /= 100),
                n.hsl2rgb(r, i, s, o))
              : ((l = { r: r, g: i, b: s, toString: Nt }),
                (l.hex =
                  "#" +
                  (16777216 | s | (i << 8) | (r << 16)).toString(16).slice(1)),
                n.is(o, "finite") && (l.opacity = o),
                l))
        : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: Nt };
    }, n)),
      (n.hsb = xt(function(e, t, r) {
        return n.hsb2rgb(e, t, r).hex;
      })),
      (n.hsl = xt(function(e, t, r) {
        return n.hsl2rgb(e, t, r).hex;
      })),
      (n.rgb = xt(function(e, t, n) {
        return (
          "#" + (16777216 | n | (t << 8) | (e << 16)).toString(16).slice(1)
        );
      })),
      (n.getColor = function(e) {
        var t = (this.getColor.start = this.getColor.start || {
            h: 0,
            s: 1,
            b: e || 0.75
          }),
          n = this.hsb2rgb(t.h, t.s, t.b);
        return (
          (t.h += 0.075),
          t.h > 1 &&
            ((t.h = 0),
            (t.s -= 0.2),
            t.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: t.b })),
          n.hex
        );
      }),
      (n.getColor.reset = function() {
        delete this.start;
      }),
      (n.parsePathString = function(e) {
        if (!e) return null;
        var t = kt(e);
        if (t.arr) return jt(t.arr);
        var r = {
            a: 7,
            c: 6,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            z: 0
          },
          i = [];
        return (
          n.is(e, _) && n.is(e[0], _) && (i = jt(e)),
          i.length ||
            b(e).replace(Z, function(e, t, n) {
              var s = [],
                o = t.toLowerCase();
              n.replace(tt, function(e, t) {
                t && s.push(+t);
              }),
                o == "m" &&
                  s.length > 2 &&
                  (i.push([t][v](s.splice(0, 2))),
                  (o = "l"),
                  (t = t == "m" ? "l" : "L"));
              if (o == "r") i.push([t][v](s));
              else
                while (s.length >= r[o]) {
                  i.push([t][v](s.splice(0, r[o])));
                  if (!r[o]) break;
                }
            }),
          (i.toString = n._path2string),
          (t.arr = jt(i)),
          i
        );
      }),
      (n.parseTransformString = xt(function(e) {
        if (!e) return null;
        var t = { r: 3, s: 4, t: 2, m: 6 },
          r = [];
        return (
          n.is(e, _) && n.is(e[0], _) && (r = jt(e)),
          r.length ||
            b(e).replace(et, function(e, t, n) {
              var i = [],
                s = x.call(t);
              n.replace(tt, function(e, t) {
                t && i.push(+t);
              }),
                r.push([t][v](i));
            }),
          (r.toString = n._path2string),
          r
        );
      }));
    var kt = function(e) {
      var t = (kt.ps = kt.ps || {});
      return (
        t[e] ? (t[e].sleep = 100) : (t[e] = { sleep: 100 }),
        setTimeout(function() {
          for (var n in t)
            t[a](n) && n != e && (t[n].sleep--, !t[n].sleep && delete t[n]);
        }),
        t[e]
      );
    };
    (n.findDotsAtSegment = function(e, t, n, r, i, s, o, u, a) {
      var f = 1 - a,
        l = L(f, 3),
        c = L(f, 2),
        h = a * a,
        p = h * a,
        d = l * e + c * 3 * a * n + f * 3 * a * a * i + p * o,
        v = l * t + c * 3 * a * r + f * 3 * a * a * s + p * u,
        m = e + 2 * a * (n - e) + h * (i - 2 * n + e),
        g = t + 2 * a * (r - t) + h * (s - 2 * r + t),
        y = n + 2 * a * (i - n) + h * (o - 2 * i + n),
        b = r + 2 * a * (s - r) + h * (u - 2 * s + r),
        w = f * e + a * n,
        E = f * t + a * r,
        S = f * i + a * o,
        x = f * s + a * u,
        N = 90 - T.atan2(m - y, g - b) * 180 / A;
      return (
        (m > y || g < b) && (N += 180),
        {
          x: d,
          y: v,
          m: { x: m, y: g },
          n: { x: y, y: b },
          start: { x: w, y: E },
          end: { x: S, y: x },
          alpha: N
        }
      );
    }),
      (n.bezierBBox = function(e, t, r, i, s, o, u, a) {
        n.is(e, "array") || (e = [e, t, r, i, s, o, u, a]);
        var f = Wt.apply(null, e);
        return {
          x: f.min.x,
          y: f.min.y,
          x2: f.max.x,
          y2: f.max.y,
          width: f.max.x - f.min.x,
          height: f.max.y - f.min.y
        };
      }),
      (n.isPointInsideBBox = function(e, t, n) {
        return t >= e.x && t <= e.x2 && n >= e.y && n <= e.y2;
      }),
      (n.isBBoxIntersect = function(e, t) {
        var r = n.isPointInsideBBox;
        return (
          r(t, e.x, e.y) ||
          r(t, e.x2, e.y) ||
          r(t, e.x, e.y2) ||
          r(t, e.x2, e.y2) ||
          r(e, t.x, t.y) ||
          r(e, t.x2, t.y) ||
          r(e, t.x, t.y2) ||
          r(e, t.x2, t.y2) ||
          (((e.x < t.x2 && e.x > t.x) || (t.x < e.x2 && t.x > e.x)) &&
            ((e.y < t.y2 && e.y > t.y) || (t.y < e.y2 && t.y > e.y)))
        );
      }),
      (n.pathIntersection = function(e, t) {
        return Ht(e, t);
      }),
      (n.pathIntersectionNumber = function(e, t) {
        return Ht(e, t, 1);
      }),
      (n.isPointInsidePath = function(e, t, r) {
        var i = n.pathBBox(e);
        return (
          n.isPointInsideBBox(i, t, r) &&
          Ht(e, [["M", t, r], ["H", i.x2 + 10]], 1) % 2 == 1
        );
      }),
      (n._removedFactory = function(e) {
        return function() {
          t(
            "raphael.log",
            null,
            "Raphaël: you are calling to method “" + e + "” of removed object",
            e
          );
        };
      });
    var Bt = (n.pathBBox = function(e) {
        var t = kt(e);
        if (t.bbox) return dt(t.bbox);
        if (!e) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };
        e = Xt(e);
        var n = 0,
          r = 0,
          i = [],
          s = [],
          o;
        for (var u = 0, a = e.length; u < a; u++) {
          o = e[u];
          if (o[0] == "M") (n = o[1]), (r = o[2]), i.push(n), s.push(r);
          else {
            var f = Wt(n, r, o[1], o[2], o[3], o[4], o[5], o[6]);
            (i = i[v](f.min.x, f.max.x)),
              (s = s[v](f.min.y, f.max.y)),
              (n = o[5]),
              (r = o[6]);
          }
        }
        var l = C[d](0, i),
          c = C[d](0, s),
          h = N[d](0, i),
          p = N[d](0, s),
          m = h - l,
          g = p - c,
          y = {
            x: l,
            y: c,
            x2: h,
            y2: p,
            width: m,
            height: g,
            cx: l + m / 2,
            cy: c + g / 2
          };
        return (t.bbox = dt(y)), y;
      }),
      jt = function(e) {
        var t = dt(e);
        return (t.toString = n._path2string), t;
      },
      Ft = (n._pathToRelative = function(e) {
        var t = kt(e);
        if (t.rel) return jt(t.rel);
        if (!n.is(e, _) || !n.is(e && e[0], _)) e = n.parsePathString(e);
        var r = [],
          i = 0,
          s = 0,
          o = 0,
          u = 0,
          a = 0;
        e[0][0] == "M" &&
          ((i = e[0][1]),
          (s = e[0][2]),
          (o = i),
          (u = s),
          a++,
          r.push(["M", i, s]));
        for (var f = a, l = e.length; f < l; f++) {
          var c = (r[f] = []),
            h = e[f];
          if (h[0] != x.call(h[0])) {
            c[0] = x.call(h[0]);
            switch (c[0]) {
              case "a":
                (c[1] = h[1]),
                  (c[2] = h[2]),
                  (c[3] = h[3]),
                  (c[4] = h[4]),
                  (c[5] = h[5]),
                  (c[6] = +(h[6] - i).toFixed(3)),
                  (c[7] = +(h[7] - s).toFixed(3));
                break;
              case "v":
                c[1] = +(h[1] - s).toFixed(3);
                break;
              case "m":
                (o = h[1]), (u = h[2]);
              default:
                for (var p = 1, d = h.length; p < d; p++)
                  c[p] = +(h[p] - (p % 2 ? i : s)).toFixed(3);
            }
          } else {
            (c = r[f] = []), h[0] == "m" && ((o = h[1] + i), (u = h[2] + s));
            for (var v = 0, m = h.length; v < m; v++) r[f][v] = h[v];
          }
          var g = r[f].length;
          switch (r[f][0]) {
            case "z":
              (i = o), (s = u);
              break;
            case "h":
              i += +r[f][g - 1];
              break;
            case "v":
              s += +r[f][g - 1];
              break;
            default:
              (i += +r[f][g - 2]), (s += +r[f][g - 1]);
          }
        }
        return (r.toString = n._path2string), (t.rel = jt(r)), r;
      }),
      It = (n._pathToAbsolute = function(e) {
        var t = kt(e);
        if (t.abs) return jt(t.abs);
        if (!n.is(e, _) || !n.is(e && e[0], _)) e = n.parsePathString(e);
        if (!e || !e.length) return [["M", 0, 0]];
        var r = [],
          i = 0,
          s = 0,
          o = 0,
          u = 0,
          a = 0;
        e[0][0] == "M" &&
          ((i = +e[0][1]),
          (s = +e[0][2]),
          (o = i),
          (u = s),
          a++,
          (r[0] = ["M", i, s]));
        var f =
          e.length == 3 &&
          e[0][0] == "M" &&
          e[1][0].toUpperCase() == "R" &&
          e[2][0].toUpperCase() == "Z";
        for (var l, c, h = a, p = e.length; h < p; h++) {
          r.push((l = [])), (c = e[h]);
          if (c[0] != V.call(c[0])) {
            l[0] = V.call(c[0]);
            switch (l[0]) {
              case "A":
                (l[1] = c[1]),
                  (l[2] = c[2]),
                  (l[3] = c[3]),
                  (l[4] = c[4]),
                  (l[5] = c[5]),
                  (l[6] = +(c[6] + i)),
                  (l[7] = +(c[7] + s));
                break;
              case "V":
                l[1] = +c[1] + s;
                break;
              case "H":
                l[1] = +c[1] + i;
                break;
              case "R":
                var d = [i, s][v](c.slice(1));
                for (var m = 2, g = d.length; m < g; m++)
                  (d[m] = +d[m] + i), (d[++m] = +d[m] + s);
                r.pop(), (r = r[v](Ct(d, f)));
                break;
              case "M":
                (o = +c[1] + i), (u = +c[2] + s);
              default:
                for (m = 1, g = c.length; m < g; m++)
                  l[m] = +c[m] + (m % 2 ? i : s);
            }
          } else if (c[0] == "R")
            (d = [i, s][v](c.slice(1))),
              r.pop(),
              (r = r[v](Ct(d, f))),
              (l = ["R"][v](c.slice(-2)));
          else for (var y = 0, b = c.length; y < b; y++) l[y] = c[y];
          switch (l[0]) {
            case "Z":
              (i = o), (s = u);
              break;
            case "H":
              i = l[1];
              break;
            case "V":
              s = l[1];
              break;
            case "M":
              (o = l[l.length - 2]), (u = l[l.length - 1]);
            default:
              (i = l[l.length - 2]), (s = l[l.length - 1]);
          }
        }
        return (r.toString = n._path2string), (t.abs = jt(r)), r;
      }),
      qt = function(e, t, n, r) {
        return [e, t, n, r, n, r];
      },
      Rt = function(e, t, n, r, i, s) {
        var o = 1 / 3,
          u = 2 / 3;
        return [
          o * e + u * n,
          o * t + u * r,
          o * i + u * n,
          o * s + u * r,
          i,
          s
        ];
      },
      Ut = function(e, t, n, r, i, s, o, u, a, f) {
        var l = A * 120 / 180,
          c = A / 180 * (+i || 0),
          h = [],
          p,
          d = xt(function(e, t, n) {
            var r = e * T.cos(n) - t * T.sin(n),
              i = e * T.sin(n) + t * T.cos(n);
            return { x: r, y: i };
          });
        if (!f) {
          (p = d(e, t, -c)),
            (e = p.x),
            (t = p.y),
            (p = d(u, a, -c)),
            (u = p.x),
            (a = p.y);
          var m = T.cos(A / 180 * i),
            g = T.sin(A / 180 * i),
            y = (e - u) / 2,
            b = (t - a) / 2,
            E = y * y / (n * n) + b * b / (r * r);
          E > 1 && ((E = T.sqrt(E)), (n = E * n), (r = E * r));
          var S = n * n,
            x = r * r,
            N =
              (s == o ? -1 : 1) *
              T.sqrt(
                k((S * x - S * b * b - x * y * y) / (S * b * b + x * y * y))
              ),
            C = N * n * b / r + (e + u) / 2,
            L = N * -r * y / n + (t + a) / 2,
            O = T.asin(((t - L) / r).toFixed(9)),
            M = T.asin(((a - L) / r).toFixed(9));
          (O = e < C ? A - O : O),
            (M = u < C ? A - M : M),
            O < 0 && (O = A * 2 + O),
            M < 0 && (M = A * 2 + M),
            o && O > M && (O -= A * 2),
            !o && M > O && (M -= A * 2);
        } else (O = f[0]), (M = f[1]), (C = f[2]), (L = f[3]);
        var _ = M - O;
        if (k(_) > l) {
          var D = M,
            P = u,
            H = a;
          (M = O + l * (o && M > O ? 1 : -1)),
            (u = C + n * T.cos(M)),
            (a = L + r * T.sin(M)),
            (h = Ut(u, a, n, r, i, 0, o, P, H, [M, D, C, L]));
        }
        _ = M - O;
        var B = T.cos(O),
          j = T.sin(O),
          F = T.cos(M),
          I = T.sin(M),
          q = T.tan(_ / 4),
          R = 4 / 3 * n * q,
          U = 4 / 3 * r * q,
          z = [e, t],
          W = [e + R * j, t - U * B],
          X = [u + R * I, a - U * F],
          V = [u, a];
        (W[0] = 2 * z[0] - W[0]), (W[1] = 2 * z[1] - W[1]);
        if (f) return [W, X, V][v](h);
        h = [W, X, V]
          [v](h)
          .join()
          [w](",");
        var $ = [];
        for (var J = 0, K = h.length; J < K; J++)
          $[J] = J % 2 ? d(h[J - 1], h[J], c).y : d(h[J], h[J + 1], c).x;
        return $;
      },
      zt = function(e, t, n, r, i, s, o, u, a) {
        var f = 1 - a;
        return {
          x:
            L(f, 3) * e + L(f, 2) * 3 * a * n + f * 3 * a * a * i + L(a, 3) * o,
          y: L(f, 3) * t + L(f, 2) * 3 * a * r + f * 3 * a * a * s + L(a, 3) * u
        };
      },
      Wt = xt(function(e, t, n, r, i, s, o, u) {
        var a = i - 2 * n + e - (o - 2 * i + n),
          f = 2 * (n - e) - 2 * (i - n),
          l = e - n,
          c = (-f + T.sqrt(f * f - 4 * a * l)) / 2 / a,
          h = (-f - T.sqrt(f * f - 4 * a * l)) / 2 / a,
          p = [t, u],
          v = [e, o],
          m;
        return (
          k(c) > "1e12" && (c = 0.5),
          k(h) > "1e12" && (h = 0.5),
          c > 0 &&
            c < 1 &&
            ((m = zt(e, t, n, r, i, s, o, u, c)), v.push(m.x), p.push(m.y)),
          h > 0 &&
            h < 1 &&
            ((m = zt(e, t, n, r, i, s, o, u, h)), v.push(m.x), p.push(m.y)),
          (a = s - 2 * r + t - (u - 2 * s + r)),
          (f = 2 * (r - t) - 2 * (s - r)),
          (l = t - r),
          (c = (-f + T.sqrt(f * f - 4 * a * l)) / 2 / a),
          (h = (-f - T.sqrt(f * f - 4 * a * l)) / 2 / a),
          k(c) > "1e12" && (c = 0.5),
          k(h) > "1e12" && (h = 0.5),
          c > 0 &&
            c < 1 &&
            ((m = zt(e, t, n, r, i, s, o, u, c)), v.push(m.x), p.push(m.y)),
          h > 0 &&
            h < 1 &&
            ((m = zt(e, t, n, r, i, s, o, u, h)), v.push(m.x), p.push(m.y)),
          {
            min: { x: C[d](0, v), y: C[d](0, p) },
            max: { x: N[d](0, v), y: N[d](0, p) }
          }
        );
      }),
      Xt = (n._path2curve = xt(
        function(e, t) {
          var n = !t && kt(e);
          if (!t && n.curve) return jt(n.curve);
          var r = It(e),
            i = t && It(t),
            s = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
            o = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
            u = function(e, t) {
              var n, r;
              if (!e) return ["C", t.x, t.y, t.x, t.y, t.x, t.y];
              !(e[0] in { T: 1, Q: 1 }) && (t.qx = t.qy = null);
              switch (e[0]) {
                case "M":
                  (t.X = e[1]), (t.Y = e[2]);
                  break;
                case "A":
                  e = ["C"][v](Ut[d](0, [t.x, t.y][v](e.slice(1))));
                  break;
                case "S":
                  (n = t.x + (t.x - (t.bx || t.x))),
                    (r = t.y + (t.y - (t.by || t.y))),
                    (e = ["C", n, r][v](e.slice(1)));
                  break;
                case "T":
                  (t.qx = t.x + (t.x - (t.qx || t.x))),
                    (t.qy = t.y + (t.y - (t.qy || t.y))),
                    (e = ["C"][v](Rt(t.x, t.y, t.qx, t.qy, e[1], e[2])));
                  break;
                case "Q":
                  (t.qx = e[1]),
                    (t.qy = e[2]),
                    (e = ["C"][v](Rt(t.x, t.y, e[1], e[2], e[3], e[4])));
                  break;
                case "L":
                  e = ["C"][v](qt(t.x, t.y, e[1], e[2]));
                  break;
                case "H":
                  e = ["C"][v](qt(t.x, t.y, e[1], t.y));
                  break;
                case "V":
                  e = ["C"][v](qt(t.x, t.y, t.x, e[1]));
                  break;
                case "Z":
                  e = ["C"][v](qt(t.x, t.y, t.X, t.Y));
              }
              return e;
            },
            a = function(e, t) {
              if (e[t].length > 7) {
                e[t].shift();
                var n = e[t];
                while (n.length) e.splice(t++, 0, ["C"][v](n.splice(0, 6)));
                e.splice(t, 1), (c = N(r.length, (i && i.length) || 0));
              }
            },
            f = function(e, t, n, s, o) {
              e &&
                t &&
                e[o][0] == "M" &&
                t[o][0] != "M" &&
                (t.splice(o, 0, ["M", s.x, s.y]),
                (n.bx = 0),
                (n.by = 0),
                (n.x = e[o][1]),
                (n.y = e[o][2]),
                (c = N(r.length, (i && i.length) || 0)));
            };
          for (var l = 0, c = N(r.length, (i && i.length) || 0); l < c; l++) {
            (r[l] = u(r[l], s)),
              a(r, l),
              i && (i[l] = u(i[l], o)),
              i && a(i, l),
              f(r, i, s, o, l),
              f(i, r, o, s, l);
            var h = r[l],
              p = i && i[l],
              m = h.length,
              g = i && p.length;
            (s.x = h[m - 2]),
              (s.y = h[m - 1]),
              (s.bx = W(h[m - 4]) || s.x),
              (s.by = W(h[m - 3]) || s.y),
              (o.bx = i && (W(p[g - 4]) || o.x)),
              (o.by = i && (W(p[g - 3]) || o.y)),
              (o.x = i && p[g - 2]),
              (o.y = i && p[g - 1]);
          }
          return i || (n.curve = jt(r)), i ? [r, i] : r;
        },
        null,
        jt
      )),
      Vt = (n._parseDots = xt(function(e) {
        var t = [];
        for (var r = 0, i = e.length; r < i; r++) {
          var s = {},
            o = e[r].match(/^([^:]*):?([\d\.]*)/);
          s.color = n.getRGB(o[1]);
          if (s.color.error) return null;
          (s.color = s.color.hex), o[2] && (s.offset = o[2] + "%"), t.push(s);
        }
        for (r = 1, i = t.length - 1; r < i; r++)
          if (!t[r].offset) {
            var u = W(t[r - 1].offset || 0),
              a = 0;
            for (var f = r + 1; f < i; f++)
              if (t[f].offset) {
                a = t[f].offset;
                break;
              }
            a || ((a = 100), (f = i)), (a = W(a));
            var l = (a - u) / (f - r + 1);
            for (; r < f; r++) (u += l), (t[r].offset = u + "%");
          }
        return t;
      })),
      $t = (n._tear = function(e, t) {
        e == t.top && (t.top = e.prev),
          e == t.bottom && (t.bottom = e.next),
          e.next && (e.next.prev = e.prev),
          e.prev && (e.prev.next = e.next);
      }),
      Jt = (n._tofront = function(e, t) {
        if (t.top === e) return;
        $t(e, t),
          (e.next = null),
          (e.prev = t.top),
          (t.top.next = e),
          (t.top = e);
      }),
      Kt = (n._toback = function(e, t) {
        if (t.bottom === e) return;
        $t(e, t),
          (e.next = t.bottom),
          (e.prev = null),
          (t.bottom.prev = e),
          (t.bottom = e);
      }),
      Qt = (n._insertafter = function(e, t, n) {
        $t(e, n),
          t == n.top && (n.top = e),
          t.next && (t.next.prev = e),
          (e.next = t.next),
          (e.prev = t),
          (t.next = e);
      }),
      Gt = (n._insertbefore = function(e, t, n) {
        $t(e, n),
          t == n.bottom && (n.bottom = e),
          t.prev && (t.prev.next = e),
          (e.prev = t.prev),
          (t.prev = e),
          (e.next = t);
      }),
      Yt = (n.toMatrix = function(e, t) {
        var n = Bt(e),
          r = {
            _: { transform: g },
            getBBox: function() {
              return n;
            }
          };
        return en(r, t), r.matrix;
      }),
      Zt = (n.transformPath = function(e, t) {
        return ct(e, Yt(e, t));
      }),
      en = (n._extractTransform = function(e, t) {
        if (t == null) return e._.transform;
        t = b(t).replace(/\.{3}|\u2026/g, e._.transform || g);
        var r = n.parseTransformString(t),
          i = 0,
          s = 0,
          o = 0,
          u = 1,
          a = 1,
          f = e._,
          l = new rn();
        f.transform = r || [];
        if (r)
          for (var c = 0, h = r.length; c < h; c++) {
            var p = r[c],
              d = p.length,
              v = b(p[0]).toLowerCase(),
              m = p[0] != v,
              y = m ? l.invert() : 0,
              w,
              E,
              S,
              x,
              T;
            v == "t" && d == 3
              ? m
                ? ((w = y.x(0, 0)),
                  (E = y.y(0, 0)),
                  (S = y.x(p[1], p[2])),
                  (x = y.y(p[1], p[2])),
                  l.translate(S - w, x - E))
                : l.translate(p[1], p[2])
              : v == "r"
                ? d == 2
                  ? ((T = T || e.getBBox(1)),
                    l.rotate(p[1], T.x + T.width / 2, T.y + T.height / 2),
                    (i += p[1]))
                  : d == 4 &&
                    (m
                      ? ((S = y.x(p[2], p[3])),
                        (x = y.y(p[2], p[3])),
                        l.rotate(p[1], S, x))
                      : l.rotate(p[1], p[2], p[3]),
                    (i += p[1]))
                : v == "s"
                  ? d == 2 || d == 3
                    ? ((T = T || e.getBBox(1)),
                      l.scale(
                        p[1],
                        p[d - 1],
                        T.x + T.width / 2,
                        T.y + T.height / 2
                      ),
                      (u *= p[1]),
                      (a *= p[d - 1]))
                    : d == 5 &&
                      (m
                        ? ((S = y.x(p[3], p[4])),
                          (x = y.y(p[3], p[4])),
                          l.scale(p[1], p[2], S, x))
                        : l.scale(p[1], p[2], p[3], p[4]),
                      (u *= p[1]),
                      (a *= p[2]))
                  : v == "m" &&
                    d == 7 &&
                    l.add(p[1], p[2], p[3], p[4], p[5], p[6]),
              (f.dirtyT = 1),
              (e.matrix = l);
          }
        (e.matrix = l),
          (f.sx = u),
          (f.sy = a),
          (f.deg = i),
          (f.dx = s = l.e),
          (f.dy = o = l.f),
          u == 1 && a == 1 && !i && f.bbox
            ? ((f.bbox.x += +s), (f.bbox.y += +o))
            : (f.dirtyT = 1);
      }),
      tn = function(e) {
        var t = e[0];
        switch (t.toLowerCase()) {
          case "t":
            return [t, 0, 0];
          case "m":
            return [t, 1, 0, 0, 1, 0, 0];
          case "r":
            return e.length == 4 ? [t, 0, e[2], e[3]] : [t, 0];
          case "s":
            return e.length == 5
              ? [t, 1, 1, e[3], e[4]]
              : e.length == 3
                ? [t, 1, 1]
                : [t, 1];
        }
      },
      nn = (n._equaliseTransform = function(e, t) {
        (t = b(t).replace(/\.{3}|\u2026/g, e)),
          (e = n.parseTransformString(e) || []),
          (t = n.parseTransformString(t) || []);
        var r = N(e.length, t.length),
          i = [],
          s = [],
          o = 0,
          u,
          a,
          f,
          l;
        for (; o < r; o++) {
          (f = e[o] || tn(t[o])), (l = t[o] || tn(f));
          if (
            f[0] != l[0] ||
            (f[0].toLowerCase() == "r" && (f[2] != l[2] || f[3] != l[3])) ||
            (f[0].toLowerCase() == "s" && (f[3] != l[3] || f[4] != l[4]))
          )
            return;
          (i[o] = []), (s[o] = []);
          for (u = 0, a = N(f.length, l.length); u < a; u++)
            u in f && (i[o][u] = f[u]), u in l && (s[o][u] = l[u]);
        }
        return { from: i, to: s };
      });
    (n._getContainer = function(e, t, r, i) {
      var s;
      s = i == null && !n.is(e, "object") ? f.doc.getElementById(e) : e;
      if (s == null) return;
      return s.tagName
        ? t == null
          ? {
              container: s,
              width: s.style.pixelWidth || s.offsetWidth,
              height: s.style.pixelHeight || s.offsetHeight
            }
          : { container: s, width: t, height: r }
        : { container: 1, x: e, y: t, width: r, height: i };
    }),
      (n.pathToRelative = Ft),
      (n._engine = {}),
      (n.path2curve = Xt),
      (n.matrix = function(e, t, n, r, i, s) {
        return new rn(e, t, n, r, i, s);
      }),
      (function(e) {
        function t(e) {
          return e[0] * e[0] + e[1] * e[1];
        }
        function r(e) {
          var n = T.sqrt(t(e));
          e[0] && (e[0] /= n), e[1] && (e[1] /= n);
        }
        (e.add = function(e, t, n, r, i, s) {
          var o = [[], [], []],
            u = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
            a = [[e, n, i], [t, r, s], [0, 0, 1]],
            f,
            l,
            c,
            h;
          e &&
            e instanceof rn &&
            (a = [[e.a, e.c, e.e], [e.b, e.d, e.f], [0, 0, 1]]);
          for (f = 0; f < 3; f++)
            for (l = 0; l < 3; l++) {
              h = 0;
              for (c = 0; c < 3; c++) h += u[f][c] * a[c][l];
              o[f][l] = h;
            }
          (this.a = o[0][0]),
            (this.b = o[1][0]),
            (this.c = o[0][1]),
            (this.d = o[1][1]),
            (this.e = o[0][2]),
            (this.f = o[1][2]);
        }),
          (e.invert = function() {
            var e = this,
              t = e.a * e.d - e.b * e.c;
            return new rn(
              e.d / t,
              -e.b / t,
              -e.c / t,
              e.a / t,
              (e.c * e.f - e.d * e.e) / t,
              (e.b * e.e - e.a * e.f) / t
            );
          }),
          (e.clone = function() {
            return new rn(this.a, this.b, this.c, this.d, this.e, this.f);
          }),
          (e.translate = function(e, t) {
            this.add(1, 0, 0, 1, e, t);
          }),
          (e.scale = function(e, t, n, r) {
            t == null && (t = e),
              (n || r) && this.add(1, 0, 0, 1, n, r),
              this.add(e, 0, 0, t, 0, 0),
              (n || r) && this.add(1, 0, 0, 1, -n, -r);
          }),
          (e.rotate = function(e, t, r) {
            (e = n.rad(e)), (t = t || 0), (r = r || 0);
            var i = +T.cos(e).toFixed(9),
              s = +T.sin(e).toFixed(9);
            this.add(i, s, -s, i, t, r), this.add(1, 0, 0, 1, -t, -r);
          }),
          (e.x = function(e, t) {
            return e * this.a + t * this.c + this.e;
          }),
          (e.y = function(e, t) {
            return e * this.b + t * this.d + this.f;
          }),
          (e.get = function(e) {
            return +this[b.fromCharCode(97 + e)].toFixed(4);
          }),
          (e.toString = function() {
            return n.svg
              ? "matrix(" +
                  [
                    this.get(0),
                    this.get(1),
                    this.get(2),
                    this.get(3),
                    this.get(4),
                    this.get(5)
                  ].join() +
                  ")"
              : [
                  this.get(0),
                  this.get(2),
                  this.get(1),
                  this.get(3),
                  0,
                  0
                ].join();
          }),
          (e.toFilter = function() {
            return (
              "progid:DXImageTransform.Microsoft.Matrix(M11=" +
              this.get(0) +
              ", M12=" +
              this.get(2) +
              ", M21=" +
              this.get(1) +
              ", M22=" +
              this.get(3) +
              ", Dx=" +
              this.get(4) +
              ", Dy=" +
              this.get(5) +
              ", sizingmethod='auto expand')"
            );
          }),
          (e.offset = function() {
            return [this.e.toFixed(4), this.f.toFixed(4)];
          }),
          (e.split = function() {
            var e = {};
            (e.dx = this.e), (e.dy = this.f);
            var i = [[this.a, this.c], [this.b, this.d]];
            (e.scalex = T.sqrt(t(i[0]))),
              r(i[0]),
              (e.shear = i[0][0] * i[1][0] + i[0][1] * i[1][1]),
              (i[1] = [
                i[1][0] - i[0][0] * e.shear,
                i[1][1] - i[0][1] * e.shear
              ]),
              (e.scaley = T.sqrt(t(i[1]))),
              r(i[1]),
              (e.shear /= e.scaley);
            var s = -i[0][1],
              o = i[1][1];
            return (
              o < 0
                ? ((e.rotate = n.deg(T.acos(o))),
                  s < 0 && (e.rotate = 360 - e.rotate))
                : (e.rotate = n.deg(T.asin(s))),
              (e.isSimple =
                !+e.shear.toFixed(9) &&
                (e.scalex.toFixed(9) == e.scaley.toFixed(9) || !e.rotate)),
              (e.isSuperSimple =
                !+e.shear.toFixed(9) &&
                e.scalex.toFixed(9) == e.scaley.toFixed(9) &&
                !e.rotate),
              (e.noRotation = !+e.shear.toFixed(9) && !e.rotate),
              e
            );
          }),
          (e.toTransformString = function(e) {
            var t = e || this[w]();
            return t.isSimple
              ? ((t.scalex = +t.scalex.toFixed(4)),
                (t.scaley = +t.scaley.toFixed(4)),
                (t.rotate = +t.rotate.toFixed(4)),
                (t.dx || t.dy ? "t" + [t.dx, t.dy] : g) +
                  (t.scalex != 1 || t.scaley != 1
                    ? "s" + [t.scalex, t.scaley, 0, 0]
                    : g) +
                  (t.rotate ? "r" + [t.rotate, 0, 0] : g))
              : "m" +
                  [
                    this.get(0),
                    this.get(1),
                    this.get(2),
                    this.get(3),
                    this.get(4),
                    this.get(5)
                  ];
          });
      })(rn.prototype);
    var sn =
      navigator.userAgent.match(/Version\/(.*?)\s/) ||
      navigator.userAgent.match(/Chrome\/(\d+)/);
    (navigator.vendor == "Apple Computer, Inc." &&
      ((sn && sn[1] < 4) || navigator.platform.slice(0, 2) == "iP")) ||
    (navigator.vendor == "Google Inc." && sn && sn[1] < 8)
      ? (h.safari = function() {
          var e = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
          });
          setTimeout(function() {
            e.remove();
          });
        })
      : (h.safari = ot);
    var on = function() {
        this.returnValue = !1;
      },
      un = function() {
        return this.originalEvent.preventDefault();
      },
      an = function() {
        this.cancelBubble = !0;
      },
      fn = function() {
        return this.originalEvent.stopPropagation();
      },
      ln = (function() {
        if (f.doc.addEventListener)
          return function(e, t, n, r) {
            var i = m && S[t] ? S[t] : t,
              s = function(i) {
                var s = f.doc.documentElement.scrollTop || f.doc.body.scrollTop,
                  o = f.doc.documentElement.scrollLeft || f.doc.body.scrollLeft,
                  u = i.clientX + o,
                  l = i.clientY + s;
                if (m && S[a](t))
                  for (
                    var c = 0, h = i.targetTouches && i.targetTouches.length;
                    c < h;
                    c++
                  )
                    if (i.targetTouches[c].target == e) {
                      var p = i;
                      (i = i.targetTouches[c]),
                        (i.originalEvent = p),
                        (i.preventDefault = un),
                        (i.stopPropagation = fn);
                      break;
                    }
                return n.call(r, i, u, l);
              };
            return (
              e.addEventListener(i, s, !1),
              function() {
                return e.removeEventListener(i, s, !1), !0;
              }
            );
          };
        if (f.doc.attachEvent)
          return function(e, t, n, r) {
            var i = function(e) {
              e = e || f.win.event;
              var t = f.doc.documentElement.scrollTop || f.doc.body.scrollTop,
                i = f.doc.documentElement.scrollLeft || f.doc.body.scrollLeft,
                s = e.clientX + i,
                o = e.clientY + t;
              return (
                (e.preventDefault = e.preventDefault || on),
                (e.stopPropagation = e.stopPropagation || an),
                n.call(r, e, s, o)
              );
            };
            e.attachEvent("on" + t, i);
            var s = function() {
              return e.detachEvent("on" + t, i), !0;
            };
            return s;
          };
      })(),
      cn = [],
      hn = function(e) {
        var n = e.clientX,
          r = e.clientY,
          i = f.doc.documentElement.scrollTop || f.doc.body.scrollTop,
          s = f.doc.documentElement.scrollLeft || f.doc.body.scrollLeft,
          o,
          u = cn.length;
        while (u--) {
          o = cn[u];
          if (m) {
            var a = e.touches.length,
              l;
            while (a--) {
              l = e.touches[a];
              if (l.identifier == o.el._drag.id) {
                (n = l.clientX),
                  (r = l.clientY),
                  (e.originalEvent ? e.originalEvent : e).preventDefault();
                break;
              }
            }
          } else e.preventDefault();
          var c = o.el.node,
            h,
            p = c.nextSibling,
            d = c.parentNode,
            v = c.style.display;
          f.win.opera && d.removeChild(c),
            (c.style.display = "none"),
            (h = o.el.paper.getElementByPoint(n, r)),
            (c.style.display = v),
            f.win.opera && (p ? d.insertBefore(c, p) : d.appendChild(c)),
            h && t("raphael.drag.over." + o.el.id, o.el, h),
            (n += s),
            (r += i),
            t(
              "raphael.drag.move." + o.el.id,
              o.move_scope || o.el,
              n - o.el._drag.x,
              r - o.el._drag.y,
              n,
              r,
              e
            );
        }
      },
      pn = function(e) {
        n.unmousemove(hn).unmouseup(pn);
        var r = cn.length,
          i;
        while (r--)
          (i = cn[r]),
            (i.el._drag = {}),
            t(
              "raphael.drag.end." + i.el.id,
              i.end_scope || i.start_scope || i.move_scope || i.el,
              e
            );
        cn = [];
      },
      dn = (n.el = {});
    for (var vn = E.length; vn--; )
      (function(e) {
        (n[e] = dn[e] = function(t, r) {
          return (
            n.is(t, "function") &&
              ((this.events = this.events || []),
              this.events.push({
                name: e,
                f: t,
                unbind: ln(this.shape || this.node || f.doc, e, t, r || this)
              })),
            this
          );
        }),
          (n["un" + e] = dn["un" + e] = function(t) {
            var r = this.events || [],
              i = r.length;
            while (i--)
              r[i].name == e &&
                (n.is(t, "undefined") || r[i].f == t) &&
                (r[i].unbind(),
                r.splice(i, 1),
                !r.length && delete this.events);
            return this;
          });
      })(E[vn]);
    (dn.data = function(e, r) {
      var i = (rt[this.id] = rt[this.id] || {});
      if (arguments.length == 0) return i;
      if (arguments.length == 1) {
        if (n.is(e, "object")) {
          for (var s in e) e[a](s) && this.data(s, e[s]);
          return this;
        }
        return t("raphael.data.get." + this.id, this, i[e], e), i[e];
      }
      return (i[e] = r), t("raphael.data.set." + this.id, this, r, e), this;
    }),
      (dn.removeData = function(e) {
        return (
          e == null ? (rt[this.id] = {}) : rt[this.id] && delete rt[this.id][e],
          this
        );
      }),
      (dn.getData = function() {
        return dt(rt[this.id] || {});
      }),
      (dn.hover = function(e, t, n, r) {
        return this.mouseover(e, n).mouseout(t, r || n);
      }),
      (dn.unhover = function(e, t) {
        return this.unmouseover(e).unmouseout(t);
      });
    var mn = [];
    (dn.drag = function(e, r, i, s, o, u) {
      function a(a) {
        (a.originalEvent || a).preventDefault();
        var l = f.doc.documentElement.scrollTop || f.doc.body.scrollTop,
          c = f.doc.documentElement.scrollLeft || f.doc.body.scrollLeft;
        (this._drag.x = a.clientX + c),
          (this._drag.y = a.clientY + l),
          (this._drag.id = a.identifier),
          !cn.length && n.mousemove(hn).mouseup(pn),
          cn.push({ el: this, move_scope: s, start_scope: o, end_scope: u }),
          r && t.on("raphael.drag.start." + this.id, r),
          e && t.on("raphael.drag.move." + this.id, e),
          i && t.on("raphael.drag.end." + this.id, i),
          t(
            "raphael.drag.start." + this.id,
            o || s || this,
            a.clientX + c,
            a.clientY + l,
            a
          );
      }
      return (
        (this._drag = {}),
        mn.push({ el: this, start: a }),
        this.mousedown(a),
        this
      );
    }),
      (dn.onDragOver = function(e) {
        e
          ? t.on("raphael.drag.over." + this.id, e)
          : t.unbind("raphael.drag.over." + this.id);
      }),
      (dn.undrag = function() {
        var e = mn.length;
        while (e--)
          mn[e].el == this &&
            (this.unmousedown(mn[e].start),
            mn.splice(e, 1),
            t.unbind("raphael.drag.*." + this.id));
        !mn.length && n.unmousemove(hn).unmouseup(pn), (cn = []);
      }),
      (h.circle = function(e, t, r) {
        var i = n._engine.circle(this, e || 0, t || 0, r || 0);
        return this.__set__ && this.__set__.push(i), i;
      }),
      (h.rect = function(e, t, r, i, s) {
        var o = n._engine.rect(this, e || 0, t || 0, r || 0, i || 0, s || 0);
        return this.__set__ && this.__set__.push(o), o;
      }),
      (h.ellipse = function(e, t, r, i) {
        var s = n._engine.ellipse(this, e || 0, t || 0, r || 0, i || 0);
        return this.__set__ && this.__set__.push(s), s;
      }),
      (h.path = function(e) {
        e && !n.is(e, M) && !n.is(e[0], _) && (e += g);
        var t = n._engine.path(n.format[d](n, arguments), this);
        return this.__set__ && this.__set__.push(t), t;
      }),
      (h.image = function(e, t, r, i, s) {
        var o = n._engine.image(
          this,
          e || "about:blank",
          t || 0,
          r || 0,
          i || 0,
          s || 0
        );
        return this.__set__ && this.__set__.push(o), o;
      }),
      (h.text = function(e, t, r) {
        var i = n._engine.text(this, e || 0, t || 0, b(r));
        return this.__set__ && this.__set__.push(i), i;
      }),
      (h.set = function(e) {
        !n.is(e, "array") &&
          (e = Array.prototype.splice.call(arguments, 0, arguments.length));
        var t = new Hn(e);
        return (
          this.__set__ && this.__set__.push(t),
          (t.paper = this),
          (t.type = "set"),
          t
        );
      }),
      (h.setStart = function(e) {
        this.__set__ = e || this.set();
      }),
      (h.setFinish = function(e) {
        var t = this.__set__;
        return delete this.__set__, t;
      }),
      (h.setSize = function(e, t) {
        return n._engine.setSize.call(this, e, t);
      }),
      (h.setViewBox = function(e, t, r, i, s) {
        return n._engine.setViewBox.call(this, e, t, r, i, s);
      }),
      (h.top = h.bottom = null),
      (h.raphael = n);
    var gn = function(e) {
      var t = e.getBoundingClientRect(),
        n = e.ownerDocument,
        r = n.body,
        i = n.documentElement,
        s = i.clientTop || r.clientTop || 0,
        o = i.clientLeft || r.clientLeft || 0,
        u = t.top + (f.win.pageYOffset || i.scrollTop || r.scrollTop) - s,
        a = t.left + (f.win.pageXOffset || i.scrollLeft || r.scrollLeft) - o;
      return { y: u, x: a };
    };
    (h.getElementByPoint = function(e, t) {
      var n = this,
        r = n.canvas,
        i = f.doc.elementFromPoint(e, t);
      if (f.win.opera && i.tagName == "svg") {
        var s = gn(r),
          o = r.createSVGRect();
        (o.x = e - s.x), (o.y = t - s.y), (o.width = o.height = 1);
        var u = r.getIntersectionList(o, null);
        u.length && (i = u[u.length - 1]);
      }
      if (!i) return null;
      while (i.parentNode && i != r.parentNode && !i.raphael) i = i.parentNode;
      return (
        i == n.canvas.parentNode && (i = r),
        (i = i && i.raphael ? n.getById(i.raphaelid) : null),
        i
      );
    }),
      (h.getElementsByBBox = function(e) {
        var t = this.set();
        return (
          this.forEach(function(r) {
            n.isBBoxIntersect(r.getBBox(), e) && t.push(r);
          }),
          t
        );
      }),
      (h.getById = function(e) {
        var t = this.bottom;
        while (t) {
          if (t.id == e) return t;
          t = t.next;
        }
        return null;
      }),
      (h.forEach = function(e, t) {
        var n = this.bottom;
        while (n) {
          if (e.call(t, n) === !1) return this;
          n = n.next;
        }
        return this;
      }),
      (h.getElementsByPoint = function(e, t) {
        var n = this.set();
        return (
          this.forEach(function(r) {
            r.isPointInside(e, t) && n.push(r);
          }),
          n
        );
      }),
      (dn.isPointInside = function(e, t) {
        var r = (this.realPath = this.realPath || lt[this.type](this));
        return n.isPointInsidePath(r, e, t);
      }),
      (dn.getBBox = function(e) {
        if (this.removed) return {};
        var t = this._;
        if (e) {
          if (t.dirty || !t.bboxwt)
            (this.realPath = lt[this.type](this)),
              (t.bboxwt = Bt(this.realPath)),
              (t.bboxwt.toString = bn),
              (t.dirty = 0);
          return t.bboxwt;
        }
        if (t.dirty || t.dirtyT || !t.bbox) {
          if (t.dirty || !this.realPath)
            (t.bboxwt = 0), (this.realPath = lt[this.type](this));
          (t.bbox = Bt(ct(this.realPath, this.matrix))),
            (t.bbox.toString = bn),
            (t.dirty = t.dirtyT = 0);
        }
        return t.bbox;
      }),
      (dn.clone = function() {
        if (this.removed) return null;
        var e = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(e), e;
      }),
      (dn.glow = function(e) {
        if (this.type == "text") return null;
        e = e || {};
        var t = {
            width: (e.width || 10) + (+this.attr("stroke-width") || 1),
            fill: e.fill || !1,
            opacity: e.opacity || 0.5,
            offsetx: e.offsetx || 0,
            offsety: e.offsety || 0,
            color: e.color || "#000"
          },
          n = t.width / 2,
          r = this.paper,
          i = r.set(),
          s = this.realPath || lt[this.type](this);
        s = this.matrix ? ct(s, this.matrix) : s;
        for (var o = 1; o < n + 1; o++)
          i.push(
            r
              .path(s)
              .attr({
                stroke: t.color,
                fill: t.fill ? t.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(t.width / n * o).toFixed(3),
                opacity: +(t.opacity / n).toFixed(3)
              })
          );
        return i.insertBefore(this).translate(t.offsetx, t.offsety);
      });
    var wn = {},
      En = function(e, t, r, i, s, o, u, a, f) {
        return f == null
          ? At(e, t, r, i, s, o, u, a)
          : n.findDotsAtSegment(
              e,
              t,
              r,
              i,
              s,
              o,
              u,
              a,
              Ot(e, t, r, i, s, o, u, a, f)
            );
      },
      Sn = function(e, t) {
        return function(r, i, s) {
          r = Xt(r);
          var o,
            u,
            a,
            f,
            l = "",
            c = {},
            h,
            p = 0;
          for (var d = 0, v = r.length; d < v; d++) {
            a = r[d];
            if (a[0] == "M") (o = +a[1]), (u = +a[2]);
            else {
              f = En(o, u, a[1], a[2], a[3], a[4], a[5], a[6]);
              if (p + f > i) {
                if (t && !c.start) {
                  (h = En(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p)),
                    (l += ["C" + h.start.x, h.start.y, h.m.x, h.m.y, h.x, h.y]);
                  if (s) return l;
                  (c.start = l),
                    (l = [
                      "M" + h.x,
                      h.y + "C" + h.n.x,
                      h.n.y,
                      h.end.x,
                      h.end.y,
                      a[5],
                      a[6]
                    ].join()),
                    (p += f),
                    (o = +a[5]),
                    (u = +a[6]);
                  continue;
                }
                if (!e && !t)
                  return (
                    (h = En(o, u, a[1], a[2], a[3], a[4], a[5], a[6], i - p)),
                    { x: h.x, y: h.y, alpha: h.alpha }
                  );
              }
              (p += f), (o = +a[5]), (u = +a[6]);
            }
            l += a.shift() + a;
          }
          return (
            (c.end = l),
            (h = e
              ? p
              : t
                ? c
                : n.findDotsAtSegment(
                    o,
                    u,
                    a[0],
                    a[1],
                    a[2],
                    a[3],
                    a[4],
                    a[5],
                    1
                  )),
            h.alpha && (h = { x: h.x, y: h.y, alpha: h.alpha }),
            h
          );
        };
      },
      xn = Sn(1),
      Tn = Sn(),
      Nn = Sn(0, 1);
    (n.getTotalLength = xn),
      (n.getPointAtLength = Tn),
      (n.getSubpath = function(e, t, n) {
        if (this.getTotalLength(e) - n < 1e-6) return Nn(e, t).end;
        var r = Nn(e, n, 1);
        return t ? Nn(r, t).end : r;
      }),
      (dn.getTotalLength = function() {
        if (this.type != "path") return;
        return this.node.getTotalLength
          ? this.node.getTotalLength()
          : xn(this.attrs.path);
      }),
      (dn.getPointAtLength = function(e) {
        if (this.type != "path") return;
        return Tn(this.attrs.path, e);
      }),
      (dn.getSubpath = function(e, t) {
        if (this.type != "path") return;
        return n.getSubpath(this.attrs.path, e, t);
      });
    var Cn = (n.easing_formulas = {
      linear: function(e) {
        return e;
      },
      "<": function(e) {
        return L(e, 1.7);
      },
      ">": function(e) {
        return L(e, 0.48);
      },
      "<>": function(e) {
        var t = 0.48 - e / 1.04,
          n = T.sqrt(0.1734 + t * t),
          r = n - t,
          i = L(k(r), 1 / 3) * (r < 0 ? -1 : 1),
          s = -n - t,
          o = L(k(s), 1 / 3) * (s < 0 ? -1 : 1),
          u = i + o + 0.5;
        return (1 - u) * 3 * u * u + u * u * u;
      },
      backIn: function(e) {
        var t = 1.70158;
        return e * e * ((t + 1) * e - t);
      },
      backOut: function(e) {
        e -= 1;
        var t = 1.70158;
        return e * e * ((t + 1) * e + t) + 1;
      },
      elastic: function(e) {
        return e == !!e
          ? e
          : L(2, -10 * e) * T.sin((e - 0.075) * 2 * A / 0.3) + 1;
      },
      bounce: function(e) {
        var t = 7.5625,
          n = 2.75,
          r;
        return (
          e < 1 / n
            ? (r = t * e * e)
            : e < 2 / n
              ? ((e -= 1.5 / n), (r = t * e * e + 0.75))
              : e < 2.5 / n
                ? ((e -= 2.25 / n), (r = t * e * e + 0.9375))
                : ((e -= 2.625 / n), (r = t * e * e + 0.984375)),
          r
        );
      }
    });
    (Cn.easeIn = Cn["ease-in"] = Cn["<"]),
      (Cn.easeOut = Cn["ease-out"] = Cn[">"]),
      (Cn.easeInOut = Cn["ease-in-out"] = Cn["<>"]),
      (Cn["back-in"] = Cn.backIn),
      (Cn["back-out"] = Cn.backOut);
    var kn = [],
      Ln =
        e.requestAnimationFrame ||
        e.webkitRequestAnimationFrame ||
        e.mozRequestAnimationFrame ||
        e.oRequestAnimationFrame ||
        e.msRequestAnimationFrame ||
        function(e) {
          setTimeout(e, 16);
        },
      An = function() {
        var e = +new Date(),
          r = 0;
        for (; r < kn.length; r++) {
          var i = kn[r];
          if (i.el.removed || i.paused) continue;
          var s = e - i.start,
            o = i.ms,
            u = i.easing,
            f = i.from,
            l = i.diff,
            c = i.to,
            h = i.t,
            p = i.el,
            d = {},
            m,
            g = {},
            b;
          i.initstatus
            ? ((s =
                (i.initstatus * i.anim.top - i.prev) /
                (i.percent - i.prev) *
                o),
              (i.status = i.initstatus),
              delete i.initstatus,
              i.stop && kn.splice(r--, 1))
            : (i.status =
                (i.prev + (i.percent - i.prev) * (s / o)) / i.anim.top);
          if (s < 0) continue;
          if (s < o) {
            var w = u(s / o);
            for (var E in f)
              if (f[a](E)) {
                switch (J[E]) {
                  case O:
                    m = +f[E] + w * o * l[E];
                    break;
                  case "colour":
                    m =
                      "rgb(" +
                      [
                        On(U(f[E].r + w * o * l[E].r)),
                        On(U(f[E].g + w * o * l[E].g)),
                        On(U(f[E].b + w * o * l[E].b))
                      ].join(",") +
                      ")";
                    break;
                  case "path":
                    m = [];
                    for (var S = 0, x = f[E].length; S < x; S++) {
                      m[S] = [f[E][S][0]];
                      for (var T = 1, N = f[E][S].length; T < N; T++)
                        m[S][T] = +f[E][S][T] + w * o * l[E][S][T];
                      m[S] = m[S].join(y);
                    }
                    m = m.join(y);
                    break;
                  case "transform":
                    if (l[E].real) {
                      m = [];
                      for (S = 0, x = f[E].length; S < x; S++) {
                        m[S] = [f[E][S][0]];
                        for (T = 1, N = f[E][S].length; T < N; T++)
                          m[S][T] = f[E][S][T] + w * o * l[E][S][T];
                      }
                    } else {
                      var C = function(e) {
                        return +f[E][e] + w * o * l[E][e];
                      };
                      m = [["m", C(0), C(1), C(2), C(3), C(4), C(5)]];
                    }
                    break;
                  case "csv":
                    if (E == "clip-rect") {
                      (m = []), (S = 4);
                      while (S--) m[S] = +f[E][S] + w * o * l[E][S];
                    }
                    break;
                  default:
                    var k = [][v](f[E]);
                    (m = []), (S = p.paper.customAttributes[E].length);
                    while (S--) m[S] = +k[S] + w * o * l[E][S];
                }
                d[E] = m;
              }
            p.attr(d),
              (function(e, n, r) {
                setTimeout(function() {
                  t("raphael.anim.frame." + e, n, r);
                });
              })(p.id, p, i.anim);
          } else {
            (function(e, r, i) {
              setTimeout(function() {
                t("raphael.anim.frame." + r.id, r, i),
                  t("raphael.anim.finish." + r.id, r, i),
                  n.is(e, "function") && e.call(r);
              });
            })(i.callback, p, i.anim),
              p.attr(c),
              kn.splice(r--, 1);
            if (i.repeat > 1 && !i.next) {
              for (b in c) c[a](b) && (g[b] = i.totalOrigin[b]);
              i.el.attr(g),
                Dn(
                  i.anim,
                  i.el,
                  i.anim.percents[0],
                  null,
                  i.totalOrigin,
                  i.repeat - 1
                );
            }
            i.next &&
              !i.stop &&
              Dn(i.anim, i.el, i.next, null, i.totalOrigin, i.repeat);
          }
        }
        n.svg && p && p.paper && p.paper.safari(), kn.length && Ln(An);
      },
      On = function(e) {
        return e > 255 ? 255 : e < 0 ? 0 : e;
      };
    (dn.animateWith = function(e, t, r, i, s, o) {
      var u = this;
      if (u.removed) return o && o.call(u), u;
      var a = r instanceof _n ? r : n.animation(r, i, s, o),
        f,
        l;
      Dn(a, u, a.percents[0], null, u.attr());
      for (var c = 0, h = kn.length; c < h; c++)
        if (kn[c].anim == t && kn[c].el == e) {
          kn[h - 1].start = kn[c].start;
          break;
        }
      return u;
    }),
      (dn.onAnimation = function(e) {
        return (
          e
            ? t.on("raphael.anim.frame." + this.id, e)
            : t.unbind("raphael.anim.frame." + this.id),
          this
        );
      }),
      (_n.prototype.delay = function(e) {
        var t = new _n(this.anim, this.ms);
        return (t.times = this.times), (t.del = +e || 0), t;
      }),
      (_n.prototype.repeat = function(e) {
        var t = new _n(this.anim, this.ms);
        return (t.del = this.del), (t.times = T.floor(N(e, 0)) || 1), t;
      }),
      (n.animation = function(e, t, r, i) {
        if (e instanceof _n) return e;
        if (n.is(r, "function") || !r) (i = i || r || null), (r = null);
        (e = Object(e)), (t = +t || 0);
        var s = {},
          o,
          u;
        for (u in e)
          e[a](u) && W(u) != u && W(u) + "%" != u && ((o = !0), (s[u] = e[u]));
        return o
          ? (r && (s.easing = r), i && (s.callback = i), new _n({ 100: s }, t))
          : new _n(e, t);
      }),
      (dn.animate = function(e, t, r, i) {
        var s = this;
        if (s.removed) return i && i.call(s), s;
        var o = e instanceof _n ? e : n.animation(e, t, r, i);
        return Dn(o, s, o.percents[0], null, s.attr()), s;
      }),
      (dn.setTime = function(e, t) {
        return e && t != null && this.status(e, C(t, e.ms) / e.ms), this;
      }),
      (dn.status = function(e, t) {
        var n = [],
          r = 0,
          i,
          s;
        if (t != null) return Dn(e, this, -1, C(t, 1)), this;
        i = kn.length;
        for (; r < i; r++) {
          s = kn[r];
          if (s.el.id == this.id && (!e || s.anim == e)) {
            if (e) return s.status;
            n.push({ anim: s.anim, status: s.status });
          }
        }
        return e ? 0 : n;
      }),
      (dn.pause = function(e) {
        for (var n = 0; n < kn.length; n++)
          kn[n].el.id == this.id &&
            (!e || kn[n].anim == e) &&
            t("raphael.anim.pause." + this.id, this, kn[n].anim) !== !1 &&
            (kn[n].paused = !0);
        return this;
      }),
      (dn.resume = function(e) {
        for (var n = 0; n < kn.length; n++)
          if (kn[n].el.id == this.id && (!e || kn[n].anim == e)) {
            var r = kn[n];
            t("raphael.anim.resume." + this.id, this, r.anim) !== !1 &&
              (delete r.paused, this.status(r.anim, r.status));
          }
        return this;
      }),
      (dn.stop = function(e) {
        for (var n = 0; n < kn.length; n++)
          kn[n].el.id == this.id &&
            (!e || kn[n].anim == e) &&
            t("raphael.anim.stop." + this.id, this, kn[n].anim) !== !1 &&
            kn.splice(n--, 1);
        return this;
      }),
      t.on("raphael.remove", Pn),
      t.on("raphael.clear", Pn),
      (dn.toString = function() {
        return "Raphaël’s object";
      });
    var Hn = function(e) {
        (this.items = []), (this.length = 0), (this.type = "set");
        if (e)
          for (var t = 0, n = e.length; t < n; t++)
            e[t] &&
              (e[t].constructor == dn.constructor || e[t].constructor == Hn) &&
              ((this[this.items.length] = this.items[this.items.length] = e[t]),
              this.length++);
      },
      Bn = Hn.prototype;
    (Bn.push = function() {
      var e, t;
      for (var n = 0, r = arguments.length; n < r; n++)
        (e = arguments[n]),
          e &&
            (e.constructor == dn.constructor || e.constructor == Hn) &&
            ((t = this.items.length),
            (this[t] = this.items[t] = e),
            this.length++);
      return this;
    }),
      (Bn.pop = function() {
        return this.length && delete this[this.length--], this.items.pop();
      }),
      (Bn.forEach = function(e, t) {
        for (var n = 0, r = this.items.length; n < r; n++)
          if (e.call(t, this.items[n], n) === !1) return this;
        return this;
      });
    for (var jn in dn)
      dn[a](jn) &&
        (Bn[jn] = (function(e) {
          return function() {
            var t = arguments;
            return this.forEach(function(n) {
              n[e][d](n, t);
            });
          };
        })(jn));
    return (
      (Bn.attr = function(e, t) {
        if (e && n.is(e, _) && n.is(e[0], "object"))
          for (var r = 0, i = e.length; r < i; r++) this.items[r].attr(e[r]);
        else
          for (var s = 0, o = this.items.length; s < o; s++)
            this.items[s].attr(e, t);
        return this;
      }),
      (Bn.clear = function() {
        while (this.length) this.pop();
      }),
      (Bn.splice = function(e, t, n) {
        (e = e < 0 ? N(this.length + e, 0) : e),
          (t = N(0, C(this.length - e, t)));
        var r = [],
          i = [],
          s = [],
          o;
        for (o = 2; o < arguments.length; o++) s.push(arguments[o]);
        for (o = 0; o < t; o++) i.push(this[e + o]);
        for (; o < this.length - e; o++) r.push(this[e + o]);
        var u = s.length;
        for (o = 0; o < u + r.length; o++)
          this.items[e + o] = this[e + o] = o < u ? s[o] : r[o - u];
        o = this.items.length = this.length -= t - u;
        while (this[o]) delete this[o++];
        return new Hn(i);
      }),
      (Bn.exclude = function(e) {
        for (var t = 0, n = this.length; t < n; t++)
          if (this[t] == e) return this.splice(t, 1), !0;
      }),
      (Bn.animate = function(e, t, r, i) {
        (n.is(r, "function") || !r) && (i = r || null);
        var s = this.items.length,
          o = s,
          u,
          a = this,
          f;
        if (!s) return this;
        i &&
          (f = function() {
            !--s && i.call(a);
          }),
          (r = n.is(r, M) ? r : f);
        var l = n.animation(e, t, r, f);
        u = this.items[--o].animate(l);
        while (o--)
          this.items[o] &&
            !this.items[o].removed &&
            this.items[o].animateWith(u, l, l),
            (this.items[o] && !this.items[o].removed) || s--;
        return this;
      }),
      (Bn.insertAfter = function(e) {
        var t = this.items.length;
        while (t--) this.items[t].insertAfter(e);
        return this;
      }),
      (Bn.getBBox = function() {
        var e = [],
          t = [],
          n = [],
          r = [];
        for (var i = this.items.length; i--; )
          if (!this.items[i].removed) {
            var s = this.items[i].getBBox();
            e.push(s.x),
              t.push(s.y),
              n.push(s.x + s.width),
              r.push(s.y + s.height);
          }
        return (
          (e = C[d](0, e)),
          (t = C[d](0, t)),
          (n = N[d](0, n)),
          (r = N[d](0, r)),
          { x: e, y: t, x2: n, y2: r, width: n - e, height: r - t }
        );
      }),
      (Bn.clone = function(e) {
        e = this.paper.set();
        for (var t = 0, n = this.items.length; t < n; t++)
          e.push(this.items[t].clone());
        return e;
      }),
      (Bn.toString = function() {
        return "Raphaël‘s set";
      }),
      (Bn.glow = function(e) {
        var t = this.paper.set();
        return (
          this.forEach(function(n, r) {
            var i = n.glow(e);
            i != null &&
              i.forEach(function(e, n) {
                t.push(e);
              });
          }),
          t
        );
      }),
      (Bn.isPointInside = function(e, t) {
        var n = !1;
        return (
          this.forEach(function(r) {
            if (r.isPointInside(e, t))
              return console.log("runned"), (n = !0), !1;
          }),
          n
        );
      }),
      (n.registerFont = function(e) {
        if (!e.face) return e;
        this.fonts = this.fonts || {};
        var t = { w: e.w, face: {}, glyphs: {} },
          n = e.face["font-family"];
        for (var r in e.face) e.face[a](r) && (t.face[r] = e.face[r]);
        this.fonts[n] ? this.fonts[n].push(t) : (this.fonts[n] = [t]);
        if (!e.svg) {
          t.face["units-per-em"] = X(e.face["units-per-em"], 10);
          for (var i in e.glyphs)
            if (e.glyphs[a](i)) {
              var s = e.glyphs[i];
              t.glyphs[i] = {
                w: s.w,
                k: {},
                d:
                  s.d &&
                  "M" +
                    s.d.replace(/[mlcxtrv]/g, function(e) {
                      return (
                        { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[e] ||
                        "M"
                      );
                    }) +
                    "z"
              };
              if (s.k)
                for (var o in s.k) s[a](o) && (t.glyphs[i].k[o] = s.k[o]);
            }
        }
        return e;
      }),
      (h.getFont = function(e, t, r, i) {
        (i = i || "normal"),
          (r = r || "normal"),
          (t =
            +t ||
            { normal: 400, bold: 700, lighter: 300, bolder: 800 }[t] ||
            400);
        if (!n.fonts) return;
        var s = n.fonts[e];
        if (!s) {
          var o = new RegExp(
            "(^|\\s)" + e.replace(/[^\w\d\s+!~.:_-]/g, g) + "(\\s|$)",
            "i"
          );
          for (var u in n.fonts)
            if (n.fonts[a](u) && o.test(u)) {
              s = n.fonts[u];
              break;
            }
        }
        var f;
        if (s)
          for (var l = 0, c = s.length; l < c; l++) {
            f = s[l];
            if (
              f.face["font-weight"] == t &&
              (f.face["font-style"] == r || !f.face["font-style"]) &&
              f.face["font-stretch"] == i
            )
              break;
          }
        return f;
      }),
      (h.print = function(e, t, r, s, o, u, a, f) {
        (u = u || "middle"),
          (a = N(C(a || 0, 1), -1)),
          (f = N(C(f || 1, 3), 1));
        var l = b(r)[w](g),
          c = 0,
          h = 0,
          p = g,
          d;
        n.is(s, "string") && (s = this.getFont(s));
        if (s) {
          d = (o || 16) / s.face["units-per-em"];
          var v = s.face.bbox[w](i),
            m = +v[0],
            y = v[3] - v[1],
            E = 0,
            S = +v[1] + (u == "baseline" ? y + +s.face.descent : y / 2);
          for (var x = 0, T = l.length; x < T; x++) {
            if (l[x] == "\n") (c = 0), (L = 0), (h = 0), (E += y * f);
            else {
              var k = (h && s.glyphs[l[x - 1]]) || {},
                L = s.glyphs[l[x]];
              (c += h ? (k.w || s.w) + ((k.k && k.k[l[x]]) || 0) + s.w * a : 0),
                (h = 1);
            }
            L &&
              L.d &&
              (p += n.transformPath(L.d, [
                "t",
                c * d,
                E * d,
                "s",
                d,
                d,
                m,
                S,
                "t",
                (e - m) / d,
                (t - S) / d
              ]));
          }
        }
        return this.path(p).attr({ fill: "#000", stroke: "none" });
      }),
      (h.add = function(e) {
        if (n.is(e, "array")) {
          var t = this.set(),
            r = 0,
            i = e.length,
            o;
          for (; r < i; r++)
            (o = e[r] || {}), s[a](o.type) && t.push(this[o.type]().attr(o));
        }
        return t;
      }),
      (n.format = function(e, t) {
        var r = n.is(t, _) ? [0][v](t) : arguments;
        return (
          e &&
            n.is(e, M) &&
            r.length - 1 &&
            (e = e.replace(o, function(e, t) {
              return r[++t] == null ? g : r[t];
            })),
          e || g
        );
      }),
      (n.fullfill = (function() {
        var e = /\{([^\}]+)\}/g,
          t = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
          n = function(e, n, r) {
            var i = r;
            return (
              n.replace(t, function(e, t, n, r, s) {
                (t = t || r),
                  i &&
                    (t in i && (i = i[t]),
                    typeof i == "function" && s && (i = i()));
              }),
              (i = (i == null || i == r ? e : i) + ""),
              i
            );
          };
        return function(t, r) {
          return String(t).replace(e, function(e, t) {
            return n(e, t, r);
          });
        };
      })()),
      (n.ninja = function() {
        return l.was ? (f.win.Raphael = l.is) : delete Raphael, n;
      }),
      (n.st = Bn),
      (function(e, t, r) {
        function i() {
          /in/.test(e.readyState) ? setTimeout(i, 9) : n.eve("raphael.DOMload");
        }
        e.readyState == null &&
          e.addEventListener &&
          (e.addEventListener(
            t,
            (r = function() {
              e.removeEventListener(t, r, !1), (e.readyState = "complete");
            }),
            !1
          ),
          (e.readyState = "loading")),
          i();
      })(document, "DOMContentLoaded"),
      t.on("raphael.DOMload", function() {
        r = !0;
      }),
      (function() {
        if (!n.svg) return;
        var e = "hasOwnProperty",
          t = String,
          r = parseFloat,
          i = parseInt,
          s = Math,
          o = s.max,
          u = s.abs,
          a = s.pow,
          f = /[, ]+/,
          l = n.eve,
          c = "",
          h = " ",
          p = "http://www.w3.org/1999/xlink",
          d = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
          },
          v = {};
        n.toString = function() {
          return (
            "Your browser supports SVG.\nYou are running Raphaël " +
            this.version
          );
        };
        var m = function(r, i) {
            if (i) {
              typeof r == "string" && (r = m(r));
              for (var s in i)
                i[e](s) &&
                  (s.substring(0, 6) == "xlink:"
                    ? r.setAttributeNS(p, s.substring(6), t(i[s]))
                    : r.setAttribute(s, t(i[s])));
            } else
              (r = n._g.doc.createElementNS("http://www.w3.org/2000/svg", r)),
                r.style && (r.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
            return r;
          },
          g = function(e, i) {
            var f = "linear",
              l = e.id + i,
              h = 0.5,
              p = 0.5,
              d = e.node,
              v = e.paper,
              g = d.style,
              y = n._g.doc.getElementById(l);
            if (!y) {
              (i = t(i).replace(n._radial_gradient, function(e, t, n) {
                f = "radial";
                if (t && n) {
                  (h = r(t)), (p = r(n));
                  var i = (p > 0.5) * 2 - 1;
                  a(h - 0.5, 2) + a(p - 0.5, 2) > 0.25 &&
                    (p = s.sqrt(0.25 - a(h - 0.5, 2)) * i + 0.5) &&
                    p != 0.5 &&
                    (p = p.toFixed(5) - 1e-5 * i);
                }
                return c;
              })),
                (i = i.split(/\s*\-\s*/));
              if (f == "linear") {
                var b = i.shift();
                b = -r(b);
                if (isNaN(b)) return null;
                var w = [0, 0, s.cos(n.rad(b)), s.sin(n.rad(b))],
                  E = 1 / (o(u(w[2]), u(w[3])) || 1);
                (w[2] *= E),
                  (w[3] *= E),
                  w[2] < 0 && ((w[0] = -w[2]), (w[2] = 0)),
                  w[3] < 0 && ((w[1] = -w[3]), (w[3] = 0));
              }
              var S = n._parseDots(i);
              if (!S) return null;
              (l = l.replace(/[\(\)\s,\xb0#]/g, "_")),
                e.gradient &&
                  l != e.gradient.id &&
                  (v.defs.removeChild(e.gradient), delete e.gradient);
              if (!e.gradient) {
                (y = m(f + "Gradient", { id: l })),
                  (e.gradient = y),
                  m(
                    y,
                    f == "radial"
                      ? { fx: h, fy: p }
                      : {
                          x1: w[0],
                          y1: w[1],
                          x2: w[2],
                          y2: w[3],
                          gradientTransform: e.matrix.invert()
                        }
                  ),
                  v.defs.appendChild(y);
                for (var x = 0, T = S.length; x < T; x++)
                  y.appendChild(
                    m("stop", {
                      offset: S[x].offset ? S[x].offset : x ? "100%" : "0%",
                      "stop-color": S[x].color || "#fff"
                    })
                  );
              }
            }
            return (
              m(d, { fill: "url(#" + l + ")", opacity: 1, "fill-opacity": 1 }),
              (g.fill = c),
              (g.opacity = 1),
              (g.fillOpacity = 1),
              1
            );
          },
          y = function(e) {
            var t = e.getBBox(1);
            m(e.pattern, {
              patternTransform:
                e.matrix.invert() + " translate(" + t.x + "," + t.y + ")"
            });
          },
          b = function(r, i, s) {
            if (r.type == "path") {
              var o = t(i)
                  .toLowerCase()
                  .split("-"),
                u = r.paper,
                a = s ? "end" : "start",
                f = r.node,
                l = r.attrs,
                h = l["stroke-width"],
                p = o.length,
                g = "classic",
                y,
                b,
                w,
                E,
                S,
                x = 3,
                T = 3,
                N = 5;
              while (p--)
                switch (o[p]) {
                  case "block":
                  case "classic":
                  case "oval":
                  case "diamond":
                  case "open":
                  case "none":
                    g = o[p];
                    break;
                  case "wide":
                    T = 5;
                    break;
                  case "narrow":
                    T = 2;
                    break;
                  case "long":
                    x = 5;
                    break;
                  case "short":
                    x = 2;
                }
              g == "open"
                ? ((x += 2),
                  (T += 2),
                  (N += 2),
                  (w = 1),
                  (E = s ? 4 : 1),
                  (S = { fill: "none", stroke: l.stroke }))
                : ((E = w = x / 2), (S = { fill: l.stroke, stroke: "none" })),
                r._.arrows
                  ? s
                    ? (r._.arrows.endPath && v[r._.arrows.endPath]--,
                      r._.arrows.endMarker && v[r._.arrows.endMarker]--)
                    : (r._.arrows.startPath && v[r._.arrows.startPath]--,
                      r._.arrows.startMarker && v[r._.arrows.startMarker]--)
                  : (r._.arrows = {});
              if (g != "none") {
                var C = "raphael-marker-" + g,
                  k = "raphael-marker-" + a + g + x + T;
                n._g.doc.getElementById(C)
                  ? v[C]++
                  : (u.defs.appendChild(
                      m(m("path"), {
                        "stroke-linecap": "round",
                        d: d[g],
                        id: C
                      })
                    ),
                    (v[C] = 1));
                var L = n._g.doc.getElementById(k),
                  A;
                L
                  ? (v[k]++, (A = L.getElementsByTagName("use")[0]))
                  : ((L = m(m("marker"), {
                      id: k,
                      markerHeight: T,
                      markerWidth: x,
                      orient: "auto",
                      refX: E,
                      refY: T / 2
                    })),
                    (A = m(m("use"), {
                      "xlink:href": "#" + C,
                      transform:
                        (s ? "rotate(180 " + x / 2 + " " + T / 2 + ") " : c) +
                        "scale(" +
                        x / N +
                        "," +
                        T / N +
                        ")",
                      "stroke-width": (1 / ((x / N + T / N) / 2)).toFixed(4)
                    })),
                    L.appendChild(A),
                    u.defs.appendChild(L),
                    (v[k] = 1)),
                  m(A, S);
                var O = w * (g != "diamond" && g != "oval");
                s
                  ? ((y = r._.arrows.startdx * h || 0),
                    (b = n.getTotalLength(l.path) - O * h))
                  : ((y = O * h),
                    (b =
                      n.getTotalLength(l.path) - (r._.arrows.enddx * h || 0))),
                  (S = {}),
                  (S["marker-" + a] = "url(#" + k + ")");
                if (b || y) S.d = n.getSubpath(l.path, y, b);
                m(f, S),
                  (r._.arrows[a + "Path"] = C),
                  (r._.arrows[a + "Marker"] = k),
                  (r._.arrows[a + "dx"] = O),
                  (r._.arrows[a + "Type"] = g),
                  (r._.arrows[a + "String"] = i);
              } else
                s
                  ? ((y = r._.arrows.startdx * h || 0),
                    (b = n.getTotalLength(l.path) - y))
                  : ((y = 0),
                    (b =
                      n.getTotalLength(l.path) - (r._.arrows.enddx * h || 0))),
                  r._.arrows[a + "Path"] &&
                    m(f, { d: n.getSubpath(l.path, y, b) }),
                  delete r._.arrows[a + "Path"],
                  delete r._.arrows[a + "Marker"],
                  delete r._.arrows[a + "dx"],
                  delete r._.arrows[a + "Type"],
                  delete r._.arrows[a + "String"];
              for (S in v)
                if (v[e](S) && !v[S]) {
                  var M = n._g.doc.getElementById(S);
                  M && M.parentNode.removeChild(M);
                }
            }
          },
          w = {
            "": [0],
            none: [0],
            "-": [3, 1],
            ".": [1, 1],
            "-.": [3, 1, 1, 1],
            "-..": [3, 1, 1, 1, 1, 1],
            ". ": [1, 3],
            "- ": [4, 3],
            "--": [8, 3],
            "- .": [4, 3, 1, 3],
            "--.": [8, 3, 1, 3],
            "--..": [8, 3, 1, 3, 1, 3]
          },
          E = function(e, n, r) {
            n = w[t(n).toLowerCase()];
            if (n) {
              var i = e.attrs["stroke-width"] || "1",
                s =
                  { round: i, square: i, butt: 0 }[
                    e.attrs["stroke-linecap"] || r["stroke-linecap"]
                  ] || 0,
                o = [],
                u = n.length;
              while (u--) o[u] = n[u] * i + (u % 2 ? 1 : -1) * s;
              m(e.node, { "stroke-dasharray": o.join(",") });
            }
          },
          S = function(r, s) {
            var a = r.node,
              l = r.attrs,
              h = a.style.visibility;
            a.style.visibility = "hidden";
            for (var d in s)
              if (s[e](d)) {
                if (!n._availableAttrs[e](d)) continue;
                var v = s[d];
                l[d] = v;
                switch (d) {
                  case "blur":
                    r.blur(v);
                    break;
                  case "href":
                  case "title":
                  case "target":
                    var w = a.parentNode;
                    if (w.tagName.toLowerCase() != "a") {
                      var S = m("a");
                      w.insertBefore(S, a), S.appendChild(a), (w = S);
                    }
                    d == "target"
                      ? w.setAttributeNS(p, "show", v == "blank" ? "new" : v)
                      : w.setAttributeNS(p, d, v);
                    break;
                  case "cursor":
                    a.style.cursor = v;
                    break;
                  case "transform":
                    r.transform(v);
                    break;
                  case "arrow-start":
                    b(r, v);
                    break;
                  case "arrow-end":
                    b(r, v, 1);
                    break;
                  case "clip-rect":
                    var x = t(v).split(f);
                    if (x.length == 4) {
                      r.clip &&
                        r.clip.parentNode.parentNode.removeChild(
                          r.clip.parentNode
                        );
                      var N = m("clipPath"),
                        C = m("rect");
                      (N.id = n.createUUID()),
                        m(C, { x: x[0], y: x[1], width: x[2], height: x[3] }),
                        N.appendChild(C),
                        r.paper.defs.appendChild(N),
                        m(a, { "clip-path": "url(#" + N.id + ")" }),
                        (r.clip = C);
                    }
                    if (!v) {
                      var k = a.getAttribute("clip-path");
                      if (k) {
                        var L = n._g.doc.getElementById(
                          k.replace(/(^url\(#|\)$)/g, c)
                        );
                        L && L.parentNode.removeChild(L),
                          m(a, { "clip-path": c }),
                          delete r.clip;
                      }
                    }
                    break;
                  case "path":
                    r.type == "path" &&
                      (m(a, {
                        d: v ? (l.path = n._pathToAbsolute(v)) : "M0,0"
                      }),
                      (r._.dirty = 1),
                      r._.arrows &&
                        ("startString" in r._.arrows &&
                          b(r, r._.arrows.startString),
                        "endString" in r._.arrows &&
                          b(r, r._.arrows.endString, 1)));
                    break;
                  case "width":
                    a.setAttribute(d, v), (r._.dirty = 1);
                    if (!l.fx) break;
                    (d = "x"), (v = l.x);
                  case "x":
                    l.fx && (v = -l.x - (l.width || 0));
                  case "rx":
                    if (d == "rx" && r.type == "rect") break;
                  case "cx":
                    a.setAttribute(d, v), r.pattern && y(r), (r._.dirty = 1);
                    break;
                  case "height":
                    a.setAttribute(d, v), (r._.dirty = 1);
                    if (!l.fy) break;
                    (d = "y"), (v = l.y);
                  case "y":
                    l.fy && (v = -l.y - (l.height || 0));
                  case "ry":
                    if (d == "ry" && r.type == "rect") break;
                  case "cy":
                    a.setAttribute(d, v), r.pattern && y(r), (r._.dirty = 1);
                    break;
                  case "r":
                    r.type == "rect"
                      ? m(a, { rx: v, ry: v })
                      : a.setAttribute(d, v),
                      (r._.dirty = 1);
                    break;
                  case "src":
                    r.type == "image" && a.setAttributeNS(p, "href", v);
                    break;
                  case "stroke-width":
                    if (r._.sx != 1 || r._.sy != 1)
                      v /= o(u(r._.sx), u(r._.sy)) || 1;
                    r.paper._vbSize && (v *= r.paper._vbSize),
                      a.setAttribute(d, v),
                      l["stroke-dasharray"] && E(r, l["stroke-dasharray"], s),
                      r._.arrows &&
                        ("startString" in r._.arrows &&
                          b(r, r._.arrows.startString),
                        "endString" in r._.arrows &&
                          b(r, r._.arrows.endString, 1));
                    break;
                  case "stroke-dasharray":
                    E(r, v, s);
                    break;
                  case "fill":
                    var A = t(v).match(n._ISURL);
                    if (A) {
                      N = m("pattern");
                      var O = m("image");
                      (N.id = n.createUUID()),
                        m(N, {
                          x: 0,
                          y: 0,
                          patternUnits: "userSpaceOnUse",
                          height: 1,
                          width: 1
                        }),
                        m(O, { x: 0, y: 0, "xlink:href": A[1] }),
                        N.appendChild(O),
                        (function(e) {
                          n._preload(A[1], function() {
                            var t = this.offsetWidth,
                              n = this.offsetHeight;
                            m(e, { width: t, height: n }),
                              m(O, { width: t, height: n }),
                              r.paper.safari();
                          });
                        })(N),
                        r.paper.defs.appendChild(N),
                        m(a, { fill: "url(#" + N.id + ")" }),
                        (r.pattern = N),
                        r.pattern && y(r);
                      break;
                    }
                    var M = n.getRGB(v);
                    if (!M.error)
                      delete s.gradient,
                        delete l.gradient,
                        !n.is(l.opacity, "undefined") &&
                          n.is(s.opacity, "undefined") &&
                          m(a, { opacity: l.opacity }),
                        !n.is(l["fill-opacity"], "undefined") &&
                          n.is(s["fill-opacity"], "undefined") &&
                          m(a, { "fill-opacity": l["fill-opacity"] });
                    else if (
                      (r.type == "circle" ||
                        r.type == "ellipse" ||
                        t(v).charAt() != "r") &&
                      g(r, v)
                    ) {
                      if ("opacity" in l || "fill-opacity" in l) {
                        var _ = n._g.doc.getElementById(
                          a.getAttribute("fill").replace(/^url\(#|\)$/g, c)
                        );
                        if (_) {
                          var D = _.getElementsByTagName("stop");
                          m(D[D.length - 1], {
                            "stop-opacity":
                              ("opacity" in l ? l.opacity : 1) *
                              ("fill-opacity" in l ? l["fill-opacity"] : 1)
                          });
                        }
                      }
                      (l.gradient = v), (l.fill = "none");
                      break;
                    }
                    M[e]("opacity") &&
                      m(a, {
                        "fill-opacity":
                          M.opacity > 1 ? M.opacity / 100 : M.opacity
                      });
                  case "stroke":
                    (M = n.getRGB(v)),
                      a.setAttribute(d, M.hex),
                      d == "stroke" &&
                        M[e]("opacity") &&
                        m(a, {
                          "stroke-opacity":
                            M.opacity > 1 ? M.opacity / 100 : M.opacity
                        }),
                      d == "stroke" &&
                        r._.arrows &&
                        ("startString" in r._.arrows &&
                          b(r, r._.arrows.startString),
                        "endString" in r._.arrows &&
                          b(r, r._.arrows.endString, 1));
                    break;
                  case "gradient":
                    (r.type == "circle" ||
                      r.type == "ellipse" ||
                      t(v).charAt() != "r") &&
                      g(r, v);
                    break;
                  case "opacity":
                    l.gradient &&
                      !l[e]("stroke-opacity") &&
                      m(a, { "stroke-opacity": v > 1 ? v / 100 : v });
                  case "fill-opacity":
                    if (l.gradient) {
                      (_ = n._g.doc.getElementById(
                        a.getAttribute("fill").replace(/^url\(#|\)$/g, c)
                      )),
                        _ &&
                          ((D = _.getElementsByTagName("stop")),
                          m(D[D.length - 1], { "stop-opacity": v }));
                      break;
                    }
                  default:
                    d == "font-size" && (v = i(v, 10) + "px");
                    var P = d.replace(/(\-.)/g, function(e) {
                      return e.substring(1).toUpperCase();
                    });
                    (a.style[P] = v), (r._.dirty = 1), a.setAttribute(d, v);
                }
              }
            T(r, s), (a.style.visibility = h);
          },
          x = 1.2,
          T = function(r, s) {
            if (
              r.type != "text" ||
              !(
                s[e]("text") ||
                s[e]("font") ||
                s[e]("font-size") ||
                s[e]("x") ||
                s[e]("y")
              )
            )
              return;
            var o = r.attrs,
              u = r.node,
              a = u.firstChild
                ? i(
                    n._g.doc.defaultView
                      .getComputedStyle(u.firstChild, c)
                      .getPropertyValue("font-size"),
                    10
                  )
                : 10;
            if (s[e]("text")) {
              o.text = s.text;
              while (u.firstChild) u.removeChild(u.firstChild);
              var f = t(s.text).split("\n"),
                l = [],
                h;
              for (var p = 0, d = f.length; p < d; p++)
                (h = m("tspan")),
                  p && m(h, { dy: a * x, x: o.x }),
                  h.appendChild(n._g.doc.createTextNode(f[p])),
                  u.appendChild(h),
                  (l[p] = h);
            } else {
              l = u.getElementsByTagName("tspan");
              for (p = 0, d = l.length; p < d; p++)
                p ? m(l[p], { dy: a * x, x: o.x }) : m(l[0], { dy: 0 });
            }
            m(u, { x: o.x, y: o.y }), (r._.dirty = 1);
            var v = r._getBBox(),
              g = o.y - (v.y + v.height / 2);
            g && n.is(g, "finite") && m(l[0], { dy: g });
          },
          N = function(e, t) {
            var r = 0,
              i = 0;
            (this[0] = this.node = e),
              (e.raphael = !0),
              (this.id = n._oid++),
              (e.raphaelid = this.id),
              (this.matrix = n.matrix()),
              (this.realPath = null),
              (this.paper = t),
              (this.attrs = this.attrs || {}),
              (this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                deg: 0,
                dx: 0,
                dy: 0,
                dirty: 1
              }),
              !t.bottom && (t.bottom = this),
              (this.prev = t.top),
              t.top && (t.top.next = this),
              (t.top = this),
              (this.next = null);
          },
          C = n.el;
        (N.prototype = C),
          (C.constructor = N),
          (n._engine.path = function(e, t) {
            var n = m("path");
            t.canvas && t.canvas.appendChild(n);
            var r = new N(n, t);
            return (
              (r.type = "path"),
              S(r, { fill: "none", stroke: "#000", path: e }),
              r
            );
          }),
          (C.rotate = function(e, n, i) {
            if (this.removed) return this;
            (e = t(e).split(f)),
              e.length - 1 && ((n = r(e[1])), (i = r(e[2]))),
              (e = r(e[0])),
              i == null && (n = i);
            if (n == null || i == null) {
              var s = this.getBBox(1);
              (n = s.x + s.width / 2), (i = s.y + s.height / 2);
            }
            return (
              this.transform(this._.transform.concat([["r", e, n, i]])), this
            );
          }),
          (C.scale = function(e, n, i, s) {
            if (this.removed) return this;
            (e = t(e).split(f)),
              e.length - 1 && ((n = r(e[1])), (i = r(e[2])), (s = r(e[3]))),
              (e = r(e[0])),
              n == null && (n = e),
              s == null && (i = s);
            if (i == null || s == null) var o = this.getBBox(1);
            return (
              (i = i == null ? o.x + o.width / 2 : i),
              (s = s == null ? o.y + o.height / 2 : s),
              this.transform(this._.transform.concat([["s", e, n, i, s]])),
              this
            );
          }),
          (C.translate = function(e, n) {
            return this.removed
              ? this
              : ((e = t(e).split(f)),
                e.length - 1 && (n = r(e[1])),
                (e = r(e[0]) || 0),
                (n = +n || 0),
                this.transform(this._.transform.concat([["t", e, n]])),
                this);
          }),
          (C.transform = function(t) {
            var r = this._;
            if (t == null) return r.transform;
            n._extractTransform(this, t),
              this.clip && m(this.clip, { transform: this.matrix.invert() }),
              this.pattern && y(this),
              this.node && m(this.node, { transform: this.matrix });
            if (r.sx != 1 || r.sy != 1) {
              var i = this.attrs[e]("stroke-width")
                ? this.attrs["stroke-width"]
                : 1;
              this.attr({ "stroke-width": i });
            }
            return this;
          }),
          (C.hide = function() {
            return (
              !this.removed &&
                this.paper.safari((this.node.style.display = "none")),
              this
            );
          }),
          (C.show = function() {
            return (
              !this.removed &&
                this.paper.safari((this.node.style.display = "")),
              this
            );
          }),
          (C.remove = function() {
            if (this.removed || !this.node.parentNode) return;
            var e = this.paper;
            e.__set__ && e.__set__.exclude(this),
              l.unbind("raphael.*.*." + this.id),
              this.gradient && e.defs.removeChild(this.gradient),
              n._tear(this, e),
              this.node.parentNode.tagName.toLowerCase() == "a"
                ? this.node.parentNode.parentNode.removeChild(
                    this.node.parentNode
                  )
                : this.node.parentNode.removeChild(this.node);
            for (var t in this)
              this[t] =
                typeof this[t] == "function" ? n._removedFactory(t) : null;
            this.removed = !0;
          }),
          (C._getBBox = function() {
            if (this.node.style.display == "none") {
              this.show();
              var e = !0;
            }
            var t = {};
            try {
              t = this.node.getBBox();
            } catch (n) {
            } finally {
              t = t || {};
            }
            return e && this.hide(), t;
          }),
          (C.attr = function(t, r) {
            if (this.removed) return this;
            if (t == null) {
              var i = {};
              for (var s in this.attrs)
                this.attrs[e](s) && (i[s] = this.attrs[s]);
              return (
                i.gradient &&
                  i.fill == "none" &&
                  (i.fill = i.gradient) &&
                  delete i.gradient,
                (i.transform = this._.transform),
                i
              );
            }
            if (r == null && n.is(t, "string")) {
              if (
                t == "fill" &&
                this.attrs.fill == "none" &&
                this.attrs.gradient
              )
                return this.attrs.gradient;
              if (t == "transform") return this._.transform;
              var o = t.split(f),
                u = {};
              for (var a = 0, c = o.length; a < c; a++)
                (t = o[a]),
                  t in this.attrs
                    ? (u[t] = this.attrs[t])
                    : n.is(this.paper.customAttributes[t], "function")
                      ? (u[t] = this.paper.customAttributes[t].def)
                      : (u[t] = n._availableAttrs[t]);
              return c - 1 ? u : u[o[0]];
            }
            if (r == null && n.is(t, "array")) {
              u = {};
              for (a = 0, c = t.length; a < c; a++) u[t[a]] = this.attr(t[a]);
              return u;
            }
            if (r != null) {
              var h = {};
              h[t] = r;
            } else t != null && n.is(t, "object") && (h = t);
            for (var p in h) l("raphael.attr." + p + "." + this.id, this, h[p]);
            for (p in this.paper.customAttributes)
              if (
                this.paper.customAttributes[e](p) &&
                h[e](p) &&
                n.is(this.paper.customAttributes[p], "function")
              ) {
                var d = this.paper.customAttributes[p].apply(
                  this,
                  [].concat(h[p])
                );
                this.attrs[p] = h[p];
                for (var v in d) d[e](v) && (h[v] = d[v]);
              }
            return S(this, h), this;
          }),
          (C.toFront = function() {
            if (this.removed) return this;
            this.node.parentNode.tagName.toLowerCase() == "a"
              ? this.node.parentNode.parentNode.appendChild(
                  this.node.parentNode
                )
              : this.node.parentNode.appendChild(this.node);
            var e = this.paper;
            return e.top != this && n._tofront(this, e), this;
          }),
          (C.toBack = function() {
            if (this.removed) return this;
            var e = this.node.parentNode;
            e.tagName.toLowerCase() == "a"
              ? e.parentNode.insertBefore(
                  this.node.parentNode,
                  this.node.parentNode.parentNode.firstChild
                )
              : e.firstChild != this.node &&
                e.insertBefore(this.node, this.node.parentNode.firstChild),
              n._toback(this, this.paper);
            var t = this.paper;
            return this;
          }),
          (C.insertAfter = function(e) {
            if (this.removed) return this;
            var t = e.node || e[e.length - 1].node;
            return (
              t.nextSibling
                ? t.parentNode.insertBefore(this.node, t.nextSibling)
                : t.parentNode.appendChild(this.node),
              n._insertafter(this, e, this.paper),
              this
            );
          }),
          (C.insertBefore = function(e) {
            if (this.removed) return this;
            var t = e.node || e[0].node;
            return (
              t.parentNode.insertBefore(this.node, t),
              n._insertbefore(this, e, this.paper),
              this
            );
          }),
          (C.blur = function(e) {
            var t = this;
            if (+e !== 0) {
              var r = m("filter"),
                i = m("feGaussianBlur");
              (t.attrs.blur = e),
                (r.id = n.createUUID()),
                m(i, { stdDeviation: +e || 1.5 }),
                r.appendChild(i),
                t.paper.defs.appendChild(r),
                (t._blur = r),
                m(t.node, { filter: "url(#" + r.id + ")" });
            } else
              t._blur &&
                (t._blur.parentNode.removeChild(t._blur),
                delete t._blur,
                delete t.attrs.blur),
                t.node.removeAttribute("filter");
            return t;
          }),
          (n._engine.circle = function(e, t, n, r) {
            var i = m("circle");
            e.canvas && e.canvas.appendChild(i);
            var s = new N(i, e);
            return (
              (s.attrs = { cx: t, cy: n, r: r, fill: "none", stroke: "#000" }),
              (s.type = "circle"),
              m(i, s.attrs),
              s
            );
          }),
          (n._engine.rect = function(e, t, n, r, i, s) {
            var o = m("rect");
            e.canvas && e.canvas.appendChild(o);
            var u = new N(o, e);
            return (
              (u.attrs = {
                x: t,
                y: n,
                width: r,
                height: i,
                r: s || 0,
                rx: s || 0,
                ry: s || 0,
                fill: "none",
                stroke: "#000"
              }),
              (u.type = "rect"),
              m(o, u.attrs),
              u
            );
          }),
          (n._engine.ellipse = function(e, t, n, r, i) {
            var s = m("ellipse");
            e.canvas && e.canvas.appendChild(s);
            var o = new N(s, e);
            return (
              (o.attrs = {
                cx: t,
                cy: n,
                rx: r,
                ry: i,
                fill: "none",
                stroke: "#000"
              }),
              (o.type = "ellipse"),
              m(s, o.attrs),
              o
            );
          }),
          (n._engine.image = function(e, t, n, r, i, s) {
            var o = m("image");
            m(o, {
              x: n,
              y: r,
              width: i,
              height: s,
              preserveAspectRatio: "none"
            }),
              o.setAttributeNS(p, "href", t),
              e.canvas && e.canvas.appendChild(o);
            var u = new N(o, e);
            return (
              (u.attrs = { x: n, y: r, width: i, height: s, src: t }),
              (u.type = "image"),
              u
            );
          }),
          (n._engine.text = function(e, t, r, i) {
            var s = m("text");
            e.canvas && e.canvas.appendChild(s);
            var o = new N(s, e);
            return (
              (o.attrs = {
                x: t,
                y: r,
                "text-anchor": "middle",
                text: i,
                font: n._availableAttrs.font,
                stroke: "none",
                fill: "#000"
              }),
              (o.type = "text"),
              S(o, o.attrs),
              o
            );
          }),
          (n._engine.setSize = function(e, t) {
            return (
              (this.width = e || this.width),
              (this.height = t || this.height),
              this.canvas.setAttribute("width", this.width),
              this.canvas.setAttribute("height", this.height),
              this._viewBox && this.setViewBox.apply(this, this._viewBox),
              this
            );
          }),
          (n._engine.create = function() {
            var e = n._getContainer.apply(0, arguments),
              t = e && e.container,
              r = e.x,
              i = e.y,
              s = e.width,
              o = e.height;
            if (!t) throw new Error("SVG container not found.");
            var u = m("svg"),
              a = "overflow:hidden;",
              f;
            return (
              (r = r || 0),
              (i = i || 0),
              (s = s || 512),
              (o = o || 342),
              m(u, {
                height: o,
                version: 1.1,
                width: s,
                xmlns: "http://www.w3.org/2000/svg"
              }),
              t == 1
                ? ((u.style.cssText =
                    a + "position:absolute;left:" + r + "px;top:" + i + "px"),
                  n._g.doc.body.appendChild(u),
                  (f = 1))
                : ((u.style.cssText = a + "position:relative"),
                  t.firstChild
                    ? t.insertBefore(u, t.firstChild)
                    : t.appendChild(u)),
              (t = new n._Paper()),
              (t.width = s),
              (t.height = o),
              (t.canvas = u),
              t.clear(),
              (t._left = t._top = 0),
              f && (t.renderfix = function() {}),
              t.renderfix(),
              t
            );
          }),
          (n._engine.setViewBox = function(e, t, n, r, i) {
            l("raphael.setViewBox", this, this._viewBox, [e, t, n, r, i]);
            var s = o(n / this.width, r / this.height),
              u = this.top,
              a = i ? "meet" : "xMinYMin",
              f,
              c;
            e == null
              ? (this._vbSize && (s = 1),
                delete this._vbSize,
                (f = "0 0 " + this.width + h + this.height))
              : ((this._vbSize = s), (f = e + h + t + h + n + h + r)),
              m(this.canvas, { viewBox: f, preserveAspectRatio: a });
            while (s && u)
              (c = "stroke-width" in u.attrs ? u.attrs["stroke-width"] : 1),
                u.attr({ "stroke-width": c }),
                (u._.dirty = 1),
                (u._.dirtyT = 1),
                (u = u.prev);
            return (this._viewBox = [e, t, n, r, !!i]), this;
          }),
          (n.prototype.renderfix = function() {
            var e = this.canvas,
              t = e.style,
              n;
            try {
              n = e.getScreenCTM() || e.createSVGMatrix();
            } catch (r) {
              n = e.createSVGMatrix();
            }
            var i = -n.e % 1,
              s = -n.f % 1;
            if (i || s)
              i &&
                ((this._left = (this._left + i) % 1),
                (t.left = this._left + "px")),
                s &&
                  ((this._top = (this._top + s) % 1),
                  (t.top = this._top + "px"));
          }),
          (n.prototype.clear = function() {
            n.eve("raphael.clear", this);
            var e = this.canvas;
            while (e.firstChild) e.removeChild(e.firstChild);
            (this.bottom = this.top = null),
              (this.desc = m("desc")).appendChild(
                n._g.doc.createTextNode("Created with Raphaël " + n.version)
              ),
              e.appendChild(this.desc),
              e.appendChild((this.defs = m("defs")));
          }),
          (n.prototype.remove = function() {
            l("raphael.remove", this),
              this.canvas.parentNode &&
                this.canvas.parentNode.removeChild(this.canvas);
            for (var e in this)
              this[e] =
                typeof this[e] == "function" ? n._removedFactory(e) : null;
          });
        var k = n.st;
        for (var L in C)
          C[e](L) &&
            !k[e](L) &&
            (k[L] = (function(e) {
              return function() {
                var t = arguments;
                return this.forEach(function(n) {
                  n[e].apply(n, t);
                });
              };
            })(L));
      })(),
      (function() {
        if (!n.vml) return;
        var e = "hasOwnProperty",
          t = String,
          r = parseFloat,
          i = Math,
          s = i.round,
          o = i.max,
          u = i.min,
          a = i.abs,
          f = "fill",
          l = /[, ]+/,
          c = n.eve,
          h = " progid:DXImageTransform.Microsoft",
          p = " ",
          d = "",
          v = {
            M: "m",
            L: "l",
            C: "c",
            Z: "x",
            m: "t",
            l: "r",
            c: "v",
            z: "x"
          },
          m = /([clmz]),?([^clmz]*)/gi,
          g = / progid:\S+Blur\([^\)]+\)/g,
          y = /-?[^,\s-]+/g,
          b = "position:absolute;left:0;top:0;width:1px;height:1px",
          w = 21600,
          E = { path: 1, rect: 1, image: 1 },
          S = { circle: 1, ellipse: 1 },
          x = function(e) {
            var r = /[ahqstv]/gi,
              i = n._pathToAbsolute;
            t(e).match(r) && (i = n._path2curve), (r = /[clmz]/g);
            if (i == n._pathToAbsolute && !t(e).match(r)) {
              var o = t(e).replace(m, function(e, t, n) {
                var r = [],
                  i = t.toLowerCase() == "m",
                  o = v[t];
                return (
                  n.replace(y, function(e) {
                    i &&
                      r.length == 2 &&
                      ((o += r + v[t == "m" ? "l" : "L"]), (r = [])),
                      r.push(s(e * w));
                  }),
                  o + r
                );
              });
              return o;
            }
            var u = i(e),
              a,
              f;
            o = [];
            for (var l = 0, c = u.length; l < c; l++) {
              (a = u[l]), (f = u[l][0].toLowerCase()), f == "z" && (f = "x");
              for (var h = 1, g = a.length; h < g; h++)
                f += s(a[h] * w) + (h != g - 1 ? "," : d);
              o.push(f);
            }
            return o.join(p);
          },
          T = function(e, t, r) {
            var i = n.matrix();
            return i.rotate(-e, 0.5, 0.5), { dx: i.x(t, r), dy: i.y(t, r) };
          },
          N = function(e, t, n, r, i, s) {
            var o = e._,
              u = e.matrix,
              l = o.fillpos,
              c = e.node,
              h = c.style,
              d = 1,
              v = "",
              m,
              g = w / t,
              y = w / n;
            h.visibility = "hidden";
            if (!t || !n) return;
            (c.coordsize = a(g) + p + a(y)),
              (h.rotation = s * (t * n < 0 ? -1 : 1));
            if (s) {
              var b = T(s, r, i);
              (r = b.dx), (i = b.dy);
            }
            t < 0 && (v += "x"),
              n < 0 && (v += " y") && (d = -1),
              (h.flip = v),
              (c.coordorigin = r * -g + p + i * -y);
            if (l || o.fillsize) {
              var E = c.getElementsByTagName(f);
              (E = E && E[0]),
                c.removeChild(E),
                l &&
                  ((b = T(s, u.x(l[0], l[1]), u.y(l[0], l[1]))),
                  (E.position = b.dx * d + p + b.dy * d)),
                o.fillsize &&
                  (E.size = o.fillsize[0] * a(t) + p + o.fillsize[1] * a(n)),
                c.appendChild(E);
            }
            h.visibility = "visible";
          };
        n.toString = function() {
          return (
            "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " +
            this.version
          );
        };
        var C = function(e, n, r) {
            var i = t(n)
                .toLowerCase()
                .split("-"),
              s = r ? "end" : "start",
              o = i.length,
              u = "classic",
              a = "medium",
              f = "medium";
            while (o--)
              switch (i[o]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                  u = i[o];
                  break;
                case "wide":
                case "narrow":
                  f = i[o];
                  break;
                case "long":
                case "short":
                  a = i[o];
              }
            var l = e.node.getElementsByTagName("stroke")[0];
            (l[s + "arrow"] = u),
              (l[s + "arrowlength"] = a),
              (l[s + "arrowwidth"] = f);
          },
          k = function(i, a) {
            i.attrs = i.attrs || {};
            var c = i.node,
              h = i.attrs,
              v = c.style,
              m,
              g =
                E[i.type] &&
                (a.x != h.x ||
                  a.y != h.y ||
                  a.width != h.width ||
                  a.height != h.height ||
                  a.cx != h.cx ||
                  a.cy != h.cy ||
                  a.rx != h.rx ||
                  a.ry != h.ry ||
                  a.r != h.r),
              y =
                S[i.type] &&
                (h.cx != a.cx ||
                  h.cy != a.cy ||
                  h.r != a.r ||
                  h.rx != a.rx ||
                  h.ry != a.ry),
              b = i;
            for (var T in a) a[e](T) && (h[T] = a[T]);
            g && ((h.path = n._getPath[i.type](i)), (i._.dirty = 1)),
              a.href && (c.href = a.href),
              a.title && (c.title = a.title),
              a.target && (c.target = a.target),
              a.cursor && (v.cursor = a.cursor),
              "blur" in a && i.blur(a.blur);
            if ((a.path && i.type == "path") || g)
              (c.path = x(
                ~t(h.path)
                  .toLowerCase()
                  .indexOf("r")
                  ? n._pathToAbsolute(h.path)
                  : h.path
              )),
                i.type == "image" &&
                  ((i._.fillpos = [h.x, h.y]),
                  (i._.fillsize = [h.width, h.height]),
                  N(i, 1, 1, 0, 0, 0));
            "transform" in a && i.transform(a.transform);
            if (y) {
              var k = +h.cx,
                A = +h.cy,
                O = +h.rx || +h.r || 0,
                _ = +h.ry || +h.r || 0;
              (c.path = n.format(
                "ar{0},{1},{2},{3},{4},{1},{4},{1}x",
                s((k - O) * w),
                s((A - _) * w),
                s((k + O) * w),
                s((A + _) * w),
                s(k * w)
              )),
                (i._.dirty = 1);
            }
            if ("clip-rect" in a) {
              var D = t(a["clip-rect"]).split(l);
              if (D.length == 4) {
                (D[2] = +D[2] + +D[0]), (D[3] = +D[3] + +D[1]);
                var P = c.clipRect || n._g.doc.createElement("div"),
                  H = P.style;
                (H.clip = n.format("rect({1}px {2}px {3}px {0}px)", D)),
                  c.clipRect ||
                    ((H.position = "absolute"),
                    (H.top = 0),
                    (H.left = 0),
                    (H.width = i.paper.width + "px"),
                    (H.height = i.paper.height + "px"),
                    c.parentNode.insertBefore(P, c),
                    P.appendChild(c),
                    (c.clipRect = P));
              }
              a["clip-rect"] ||
                (c.clipRect && (c.clipRect.style.clip = "auto"));
            }
            if (i.textpath) {
              var B = i.textpath.style;
              a.font && (B.font = a.font),
                a["font-family"] &&
                  (B.fontFamily =
                    '"' +
                    a["font-family"]
                      .split(",")[0]
                      .replace(/^['"]+|['"]+$/g, d) +
                    '"'),
                a["font-size"] && (B.fontSize = a["font-size"]),
                a["font-weight"] && (B.fontWeight = a["font-weight"]),
                a["font-style"] && (B.fontStyle = a["font-style"]);
            }
            "arrow-start" in a && C(b, a["arrow-start"]),
              "arrow-end" in a && C(b, a["arrow-end"], 1);
            if (
              a.opacity != null ||
              a["stroke-width"] != null ||
              a.fill != null ||
              a.src != null ||
              a.stroke != null ||
              a["stroke-width"] != null ||
              a["stroke-opacity"] != null ||
              a["fill-opacity"] != null ||
              a["stroke-dasharray"] != null ||
              a["stroke-miterlimit"] != null ||
              a["stroke-linejoin"] != null ||
              a["stroke-linecap"] != null
            ) {
              var j = c.getElementsByTagName(f),
                F = !1;
              (j = j && j[0]),
                !j && (F = j = M(f)),
                i.type == "image" && a.src && (j.src = a.src),
                a.fill && (j.on = !0);
              if (j.on == null || a.fill == "none" || a.fill === null)
                j.on = !1;
              if (j.on && a.fill) {
                var I = t(a.fill).match(n._ISURL);
                if (I) {
                  j.parentNode == c && c.removeChild(j),
                    (j.rotate = !0),
                    (j.src = I[1]),
                    (j.type = "tile");
                  var q = i.getBBox(1);
                  (j.position = q.x + p + q.y),
                    (i._.fillpos = [q.x, q.y]),
                    n._preload(I[1], function() {
                      i._.fillsize = [this.offsetWidth, this.offsetHeight];
                    });
                } else
                  (j.color = n.getRGB(a.fill).hex),
                    (j.src = d),
                    (j.type = "solid"),
                    n.getRGB(a.fill).error &&
                      (b.type in { circle: 1, ellipse: 1 } ||
                        t(a.fill).charAt() != "r") &&
                      L(b, a.fill, j) &&
                      ((h.fill = "none"),
                      (h.gradient = a.fill),
                      (j.rotate = !1));
              }
              if ("fill-opacity" in a || "opacity" in a) {
                var R =
                  ((+h["fill-opacity"] + 1 || 2) - 1) *
                  ((+h.opacity + 1 || 2) - 1) *
                  ((+n.getRGB(a.fill).o + 1 || 2) - 1);
                (R = u(o(R, 0), 1)),
                  (j.opacity = R),
                  j.src && (j.color = "none");
              }
              c.appendChild(j);
              var U =
                  c.getElementsByTagName("stroke") &&
                  c.getElementsByTagName("stroke")[0],
                z = !1;
              !U && (z = U = M("stroke"));
              if (
                (a.stroke && a.stroke != "none") ||
                a["stroke-width"] ||
                a["stroke-opacity"] != null ||
                a["stroke-dasharray"] ||
                a["stroke-miterlimit"] ||
                a["stroke-linejoin"] ||
                a["stroke-linecap"]
              )
                U.on = !0;
              (a.stroke == "none" ||
                a.stroke === null ||
                U.on == null ||
                a.stroke == 0 ||
                a["stroke-width"] == 0) &&
                (U.on = !1);
              var W = n.getRGB(a.stroke);
              U.on && a.stroke && (U.color = W.hex),
                (R =
                  ((+h["stroke-opacity"] + 1 || 2) - 1) *
                  ((+h.opacity + 1 || 2) - 1) *
                  ((+W.o + 1 || 2) - 1));
              var X = (r(a["stroke-width"]) || 1) * 0.75;
              (R = u(o(R, 0), 1)),
                a["stroke-width"] == null && (X = h["stroke-width"]),
                a["stroke-width"] && (U.weight = X),
                X && X < 1 && (R *= X) && (U.weight = 1),
                (U.opacity = R),
                a["stroke-linejoin"] &&
                  (U.joinstyle = a["stroke-linejoin"] || "miter"),
                (U.miterlimit = a["stroke-miterlimit"] || 8),
                a["stroke-linecap"] &&
                  (U.endcap =
                    a["stroke-linecap"] == "butt"
                      ? "flat"
                      : a["stroke-linecap"] == "square"
                        ? "square"
                        : "round");
              if (a["stroke-dasharray"]) {
                var V = {
                  "-": "shortdash",
                  ".": "shortdot",
                  "-.": "shortdashdot",
                  "-..": "shortdashdotdot",
                  ". ": "dot",
                  "- ": "dash",
                  "--": "longdash",
                  "- .": "dashdot",
                  "--.": "longdashdot",
                  "--..": "longdashdotdot"
                };
                U.dashstyle = V[e](a["stroke-dasharray"])
                  ? V[a["stroke-dasharray"]]
                  : d;
              }
              z && c.appendChild(U);
            }
            if (b.type == "text") {
              b.paper.canvas.style.display = d;
              var $ = b.paper.span,
                J = 100,
                K = h.font && h.font.match(/\d+(?:\.\d*)?(?=px)/);
              (v = $.style),
                h.font && (v.font = h.font),
                h["font-family"] && (v.fontFamily = h["font-family"]),
                h["font-weight"] && (v.fontWeight = h["font-weight"]),
                h["font-style"] && (v.fontStyle = h["font-style"]),
                (K = r(h["font-size"] || (K && K[0])) || 10),
                (v.fontSize = K * J + "px"),
                b.textpath.string &&
                  ($.innerHTML = t(b.textpath.string)
                    .replace(/</g, "<")
                    .replace(/&/g, "&")
                    .replace(/\n/g, "<br>"));
              var Q = $.getBoundingClientRect();
              (b.W = h.w = (Q.right - Q.left) / J),
                (b.H = h.h = (Q.bottom - Q.top) / J),
                (b.X = h.x),
                (b.Y = h.y + b.H / 2),
                ("x" in a || "y" in a) &&
                  (b.path.v = n.format(
                    "m{0},{1}l{2},{1}",
                    s(h.x * w),
                    s(h.y * w),
                    s(h.x * w) + 1
                  ));
              var G = [
                "x",
                "y",
                "text",
                "font",
                "font-family",
                "font-weight",
                "font-style",
                "font-size"
              ];
              for (var Y = 0, Z = G.length; Y < Z; Y++)
                if (G[Y] in a) {
                  b._.dirty = 1;
                  break;
                }
              switch (h["text-anchor"]) {
                case "start":
                  (b.textpath.style["v-text-align"] = "left"),
                    (b.bbx = b.W / 2);
                  break;
                case "end":
                  (b.textpath.style["v-text-align"] = "right"),
                    (b.bbx = -b.W / 2);
                  break;
                default:
                  (b.textpath.style["v-text-align"] = "center"), (b.bbx = 0);
              }
              b.textpath.style["v-text-kern"] = !0;
            }
          },
          L = function(e, s, o) {
            e.attrs = e.attrs || {};
            var u = e.attrs,
              a = Math.pow,
              f,
              l,
              c = "linear",
              h = ".5 .5";
            (e.attrs.gradient = s),
              (s = t(s).replace(n._radial_gradient, function(e, t, n) {
                return (
                  (c = "radial"),
                  t &&
                    n &&
                    ((t = r(t)),
                    (n = r(n)),
                    a(t - 0.5, 2) + a(n - 0.5, 2) > 0.25 &&
                      (n =
                        i.sqrt(0.25 - a(t - 0.5, 2)) * ((n > 0.5) * 2 - 1) +
                        0.5),
                    (h = t + p + n)),
                  d
                );
              })),
              (s = s.split(/\s*\-\s*/));
            if (c == "linear") {
              var v = s.shift();
              v = -r(v);
              if (isNaN(v)) return null;
            }
            var m = n._parseDots(s);
            if (!m) return null;
            e = e.shape || e.node;
            if (m.length) {
              e.removeChild(o),
                (o.on = !0),
                (o.method = "none"),
                (o.color = m[0].color),
                (o.color2 = m[m.length - 1].color);
              var g = [];
              for (var y = 0, b = m.length; y < b; y++)
                m[y].offset && g.push(m[y].offset + p + m[y].color);
              (o.colors = g.length ? g.join() : "0% " + o.color),
                c == "radial"
                  ? ((o.type = "gradientTitle"),
                    (o.focus = "100%"),
                    (o.focussize = "0 0"),
                    (o.focusposition = h),
                    (o.angle = 0))
                  : ((o.type = "gradient"), (o.angle = (270 - v) % 360)),
                e.appendChild(o);
            }
            return 1;
          },
          A = function(e, t) {
            (this[0] = this.node = e),
              (e.raphael = !0),
              (this.id = n._oid++),
              (e.raphaelid = this.id),
              (this.X = 0),
              (this.Y = 0),
              (this.attrs = {}),
              (this.paper = t),
              (this.matrix = n.matrix()),
              (this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                dx: 0,
                dy: 0,
                deg: 0,
                dirty: 1,
                dirtyT: 1
              }),
              !t.bottom && (t.bottom = this),
              (this.prev = t.top),
              t.top && (t.top.next = this),
              (t.top = this),
              (this.next = null);
          },
          O = n.el;
        (A.prototype = O),
          (O.constructor = A),
          (O.transform = function(e) {
            if (e == null) return this._.transform;
            var r = this.paper._viewBoxShift,
              i = r ? "s" + [r.scale, r.scale] + "-1-1t" + [r.dx, r.dy] : d,
              s;
            r && (s = e = t(e).replace(/\.{3}|\u2026/g, this._.transform || d)),
              n._extractTransform(this, i + e);
            var o = this.matrix.clone(),
              u = this.skew,
              a = this.node,
              f,
              l = ~t(this.attrs.fill).indexOf("-"),
              c = !t(this.attrs.fill).indexOf("url(");
            o.translate(-0.5, -0.5);
            if (c || l || this.type == "image") {
              (u.matrix = "1 0 0 1"), (u.offset = "0 0"), (f = o.split());
              if ((l && f.noRotation) || !f.isSimple) {
                a.style.filter = o.toFilter();
                var h = this.getBBox(),
                  v = this.getBBox(1),
                  m = h.x - v.x,
                  g = h.y - v.y;
                (a.coordorigin = m * -w + p + g * -w), N(this, 1, 1, m, g, 0);
              } else
                (a.style.filter = d),
                  N(this, f.scalex, f.scaley, f.dx, f.dy, f.rotate);
            } else
              (a.style.filter = d), (u.matrix = t(o)), (u.offset = o.offset());
            return s && (this._.transform = s), this;
          }),
          (O.rotate = function(e, n, i) {
            if (this.removed) return this;
            if (e == null) return;
            (e = t(e).split(l)),
              e.length - 1 && ((n = r(e[1])), (i = r(e[2]))),
              (e = r(e[0])),
              i == null && (n = i);
            if (n == null || i == null) {
              var s = this.getBBox(1);
              (n = s.x + s.width / 2), (i = s.y + s.height / 2);
            }
            return (
              (this._.dirtyT = 1),
              this.transform(this._.transform.concat([["r", e, n, i]])),
              this
            );
          }),
          (O.translate = function(e, n) {
            return this.removed
              ? this
              : ((e = t(e).split(l)),
                e.length - 1 && (n = r(e[1])),
                (e = r(e[0]) || 0),
                (n = +n || 0),
                this._.bbox && ((this._.bbox.x += e), (this._.bbox.y += n)),
                this.transform(this._.transform.concat([["t", e, n]])),
                this);
          }),
          (O.scale = function(e, n, i, s) {
            if (this.removed) return this;
            (e = t(e).split(l)),
              e.length - 1 &&
                ((n = r(e[1])),
                (i = r(e[2])),
                (s = r(e[3])),
                isNaN(i) && (i = null),
                isNaN(s) && (s = null)),
              (e = r(e[0])),
              n == null && (n = e),
              s == null && (i = s);
            if (i == null || s == null) var o = this.getBBox(1);
            return (
              (i = i == null ? o.x + o.width / 2 : i),
              (s = s == null ? o.y + o.height / 2 : s),
              this.transform(this._.transform.concat([["s", e, n, i, s]])),
              (this._.dirtyT = 1),
              this
            );
          }),
          (O.hide = function() {
            return !this.removed && (this.node.style.display = "none"), this;
          }),
          (O.show = function() {
            return !this.removed && (this.node.style.display = d), this;
          }),
          (O._getBBox = function() {
            return this.removed
              ? {}
              : {
                  x: this.X + (this.bbx || 0) - this.W / 2,
                  y: this.Y - this.H,
                  width: this.W,
                  height: this.H
                };
          }),
          (O.remove = function() {
            if (this.removed || !this.node.parentNode) return;
            this.paper.__set__ && this.paper.__set__.exclude(this),
              n.eve.unbind("raphael.*.*." + this.id),
              n._tear(this, this.paper),
              this.node.parentNode.removeChild(this.node),
              this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var e in this)
              this[e] =
                typeof this[e] == "function" ? n._removedFactory(e) : null;
            this.removed = !0;
          }),
          (O.attr = function(t, r) {
            if (this.removed) return this;
            if (t == null) {
              var i = {};
              for (var s in this.attrs)
                this.attrs[e](s) && (i[s] = this.attrs[s]);
              return (
                i.gradient &&
                  i.fill == "none" &&
                  (i.fill = i.gradient) &&
                  delete i.gradient,
                (i.transform = this._.transform),
                i
              );
            }
            if (r == null && n.is(t, "string")) {
              if (t == f && this.attrs.fill == "none" && this.attrs.gradient)
                return this.attrs.gradient;
              var o = t.split(l),
                u = {};
              for (var a = 0, h = o.length; a < h; a++)
                (t = o[a]),
                  t in this.attrs
                    ? (u[t] = this.attrs[t])
                    : n.is(this.paper.customAttributes[t], "function")
                      ? (u[t] = this.paper.customAttributes[t].def)
                      : (u[t] = n._availableAttrs[t]);
              return h - 1 ? u : u[o[0]];
            }
            if (this.attrs && r == null && n.is(t, "array")) {
              u = {};
              for (a = 0, h = t.length; a < h; a++) u[t[a]] = this.attr(t[a]);
              return u;
            }
            var p;
            r != null && ((p = {}), (p[t] = r)),
              r == null && n.is(t, "object") && (p = t);
            for (var d in p) c("raphael.attr." + d + "." + this.id, this, p[d]);
            if (p) {
              for (d in this.paper.customAttributes)
                if (
                  this.paper.customAttributes[e](d) &&
                  p[e](d) &&
                  n.is(this.paper.customAttributes[d], "function")
                ) {
                  var v = this.paper.customAttributes[d].apply(
                    this,
                    [].concat(p[d])
                  );
                  this.attrs[d] = p[d];
                  for (var m in v) v[e](m) && (p[m] = v[m]);
                }
              p.text && this.type == "text" && (this.textpath.string = p.text),
                k(this, p);
            }
            return this;
          }),
          (O.toFront = function() {
            return (
              !this.removed && this.node.parentNode.appendChild(this.node),
              this.paper &&
                this.paper.top != this &&
                n._tofront(this, this.paper),
              this
            );
          }),
          (O.toBack = function() {
            return this.removed
              ? this
              : (this.node.parentNode.firstChild != this.node &&
                  (this.node.parentNode.insertBefore(
                    this.node,
                    this.node.parentNode.firstChild
                  ),
                  n._toback(this, this.paper)),
                this);
          }),
          (O.insertAfter = function(e) {
            return this.removed
              ? this
              : (e.constructor == n.st.constructor && (e = e[e.length - 1]),
                e.node.nextSibling
                  ? e.node.parentNode.insertBefore(
                      this.node,
                      e.node.nextSibling
                    )
                  : e.node.parentNode.appendChild(this.node),
                n._insertafter(this, e, this.paper),
                this);
          }),
          (O.insertBefore = function(e) {
            return this.removed
              ? this
              : (e.constructor == n.st.constructor && (e = e[0]),
                e.node.parentNode.insertBefore(this.node, e.node),
                n._insertbefore(this, e, this.paper),
                this);
          }),
          (O.blur = function(e) {
            var t = this.node.runtimeStyle,
              r = t.filter;
            return (
              (r = r.replace(g, d)),
              +e !== 0
                ? ((this.attrs.blur = e),
                  (t.filter =
                    r + p + h + ".Blur(pixelradius=" + (+e || 1.5) + ")"),
                  (t.margin = n.format("-{0}px 0 0 -{0}px", s(+e || 1.5))))
                : ((t.filter = r), (t.margin = 0), delete this.attrs.blur),
              this
            );
          }),
          (n._engine.path = function(e, t) {
            var n = M("shape");
            (n.style.cssText = b),
              (n.coordsize = w + p + w),
              (n.coordorigin = t.coordorigin);
            var r = new A(n, t),
              i = { fill: "none", stroke: "#000" };
            e && (i.path = e),
              (r.type = "path"),
              (r.path = []),
              (r.Path = d),
              k(r, i),
              t.canvas.appendChild(n);
            var s = M("skew");
            return (
              (s.on = !0), n.appendChild(s), (r.skew = s), r.transform(d), r
            );
          }),
          (n._engine.rect = function(e, t, r, i, s, o) {
            var u = n._rectPath(t, r, i, s, o),
              a = e.path(u),
              f = a.attrs;
            return (
              (a.X = f.x = t),
              (a.Y = f.y = r),
              (a.W = f.width = i),
              (a.H = f.height = s),
              (f.r = o),
              (f.path = u),
              (a.type = "rect"),
              a
            );
          }),
          (n._engine.ellipse = function(e, t, n, r, i) {
            var s = e.path(),
              o = s.attrs;
            return (
              (s.X = t - r),
              (s.Y = n - i),
              (s.W = r * 2),
              (s.H = i * 2),
              (s.type = "ellipse"),
              k(s, { cx: t, cy: n, rx: r, ry: i }),
              s
            );
          }),
          (n._engine.circle = function(e, t, n, r) {
            var i = e.path(),
              s = i.attrs;
            return (
              (i.X = t - r),
              (i.Y = n - r),
              (i.W = i.H = r * 2),
              (i.type = "circle"),
              k(i, { cx: t, cy: n, r: r }),
              i
            );
          }),
          (n._engine.image = function(e, t, r, i, s, o) {
            var u = n._rectPath(r, i, s, o),
              a = e.path(u).attr({ stroke: "none" }),
              l = a.attrs,
              c = a.node,
              h = c.getElementsByTagName(f)[0];
            return (
              (l.src = t),
              (a.X = l.x = r),
              (a.Y = l.y = i),
              (a.W = l.width = s),
              (a.H = l.height = o),
              (l.path = u),
              (a.type = "image"),
              h.parentNode == c && c.removeChild(h),
              (h.rotate = !0),
              (h.src = t),
              (h.type = "tile"),
              (a._.fillpos = [r, i]),
              (a._.fillsize = [s, o]),
              c.appendChild(h),
              N(a, 1, 1, 0, 0, 0),
              a
            );
          }),
          (n._engine.text = function(e, r, i, o) {
            var u = M("shape"),
              a = M("path"),
              f = M("textpath");
            (r = r || 0),
              (i = i || 0),
              (o = o || ""),
              (a.v = n.format(
                "m{0},{1}l{2},{1}",
                s(r * w),
                s(i * w),
                s(r * w) + 1
              )),
              (a.textpathok = !0),
              (f.string = t(o)),
              (f.on = !0),
              (u.style.cssText = b),
              (u.coordsize = w + p + w),
              (u.coordorigin = "0 0");
            var l = new A(u, e),
              c = {
                fill: "#000",
                stroke: "none",
                font: n._availableAttrs.font,
                text: o
              };
            (l.shape = u),
              (l.path = a),
              (l.textpath = f),
              (l.type = "text"),
              (l.attrs.text = t(o)),
              (l.attrs.x = r),
              (l.attrs.y = i),
              (l.attrs.w = 1),
              (l.attrs.h = 1),
              k(l, c),
              u.appendChild(f),
              u.appendChild(a),
              e.canvas.appendChild(u);
            var h = M("skew");
            return (
              (h.on = !0), u.appendChild(h), (l.skew = h), l.transform(d), l
            );
          }),
          (n._engine.setSize = function(e, t) {
            var r = this.canvas.style;
            return (
              (this.width = e),
              (this.height = t),
              e == +e && (e += "px"),
              t == +t && (t += "px"),
              (r.width = e),
              (r.height = t),
              (r.clip = "rect(0 " + e + " " + t + " 0)"),
              this._viewBox && n._engine.setViewBox.apply(this, this._viewBox),
              this
            );
          }),
          (n._engine.setViewBox = function(e, t, r, i, s) {
            n.eve("raphael.setViewBox", this, this._viewBox, [e, t, r, i, s]);
            var u = this.width,
              a = this.height,
              f = 1 / o(r / u, i / a),
              l,
              c;
            return (
              s &&
                ((l = a / i),
                (c = u / r),
                r * l < u && (e -= (u - r * l) / 2 / l),
                i * c < a && (t -= (a - i * c) / 2 / c)),
              (this._viewBox = [e, t, r, i, !!s]),
              (this._viewBoxShift = { dx: -e, dy: -t, scale: f }),
              this.forEach(function(e) {
                e.transform("...");
              }),
              this
            );
          });
        var M;
        (n._engine.initWin = function(e) {
          var t = e.document;
          t.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
          try {
            !t.namespaces.rvml &&
              t.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
              (M = function(e) {
                return t.createElement("<rvml:" + e + ' class="rvml">');
              });
          } catch (n) {
            M = function(e) {
              return t.createElement(
                "<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'
              );
            };
          }
        }),
          n._engine.initWin(n._g.win),
          (n._engine.create = function() {
            var e = n._getContainer.apply(0, arguments),
              t = e.container,
              r = e.height,
              i,
              s = e.width,
              o = e.x,
              u = e.y;
            if (!t) throw new Error("VML container not found.");
            var a = new n._Paper(),
              f = (a.canvas = n._g.doc.createElement("div")),
              l = f.style;
            return (
              (o = o || 0),
              (u = u || 0),
              (s = s || 512),
              (r = r || 342),
              (a.width = s),
              (a.height = r),
              s == +s && (s += "px"),
              r == +r && (r += "px"),
              (a.coordsize = w * 1e3 + p + w * 1e3),
              (a.coordorigin = "0 0"),
              (a.span = n._g.doc.createElement("span")),
              (a.span.style.cssText =
                "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;"),
              f.appendChild(a.span),
              (l.cssText = n.format(
                "top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",
                s,
                r
              )),
              t == 1
                ? (n._g.doc.body.appendChild(f),
                  (l.left = o + "px"),
                  (l.top = u + "px"),
                  (l.position = "absolute"))
                : t.firstChild
                  ? t.insertBefore(f, t.firstChild)
                  : t.appendChild(f),
              (a.renderfix = function() {}),
              a
            );
          }),
          (n.prototype.clear = function() {
            n.eve("raphael.clear", this),
              (this.canvas.innerHTML = d),
              (this.span = n._g.doc.createElement("span")),
              (this.span.style.cssText =
                "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;"),
              this.canvas.appendChild(this.span),
              (this.bottom = this.top = null);
          }),
          (n.prototype.remove = function() {
            n.eve("raphael.remove", this),
              this.canvas.parentNode.removeChild(this.canvas);
            for (var e in this)
              this[e] =
                typeof this[e] == "function" ? n._removedFactory(e) : null;
            return !0;
          });
        var _ = n.st;
        for (var D in O)
          O[e](D) &&
            !_[e](D) &&
            (_[D] = (function(e) {
              return function() {
                var t = arguments;
                return this.forEach(function(n) {
                  n[e].apply(n, t);
                });
              };
            })(D));
      })(),
      l.was ? (f.win.Raphael = n) : (Raphael = n),
      n
    );
  });
