'use strict';
(() => {
  var e = {};
  (e.id = 820),
    (e.ids = [820, 660]),
    (e.modules = {
      6021: (e, t) => {
        Object.defineProperty(t, 'l', {
          enumerable: !0,
          get: function () {
            return function e(t, r) {
              return r in t
                ? t[r]
                : 'then' in t && 'function' == typeof t.then
                  ? t.then(t => e(t, r))
                  : 'function' == typeof t && 'default' === r
                    ? t
                    : void 0;
            };
          },
        });
      },
      8445: (e, t, r) => {
        r.r(t),
          r.d(t, {
            config: () => h,
            default: () => p,
            getServerSideProps: () => g,
            getStaticPaths: () => f,
            getStaticProps: () => c,
            reportWebVitals: () => y,
            routeModule: () => v,
            unstable_getServerProps: () => P,
            unstable_getServerSideProps: () => x,
            unstable_getStaticParams: () => _,
            unstable_getStaticPaths: () => m,
            unstable_getStaticProps: () => b,
          });
        var n = r(8877),
          o = r(4591),
          l = r(6021),
          a = r(3135),
          i = r.n(a),
          u = r(9293),
          d = r.n(u),
          s = r(6220);
        let p = (0, l.l)(s, 'default'),
          c = (0, l.l)(s, 'getStaticProps'),
          f = (0, l.l)(s, 'getStaticPaths'),
          g = (0, l.l)(s, 'getServerSideProps'),
          h = (0, l.l)(s, 'config'),
          y = (0, l.l)(s, 'reportWebVitals'),
          b = (0, l.l)(s, 'unstable_getStaticProps'),
          m = (0, l.l)(s, 'unstable_getStaticPaths'),
          _ = (0, l.l)(s, 'unstable_getStaticParams'),
          P = (0, l.l)(s, 'unstable_getServerProps'),
          x = (0, l.l)(s, 'unstable_getServerSideProps'),
          v = new n.PagesRouteModule({
            definition: {
              kind: o.x.PAGES,
              page: '/_error',
              pathname: '/_error',
              bundlePath: '',
              filename: '',
            },
            components: { App: d(), Document: i() },
            userland: s,
          });
      },
      9293: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'default', {
            enumerable: !0,
            get: function () {
              return u;
            },
          });
        let n = r(7083),
          o = r(997),
          l = n._(r(6689)),
          a = r(4022);
        async function i(e) {
          let { Component: t, ctx: r } = e;
          return { pageProps: await (0, a.loadGetInitialProps)(t, r) };
        }
        class u extends l.default.Component {
          render() {
            let { Component: e, pageProps: t } = this.props;
            return (0, o.jsx)(e, { ...t });
          }
        }
        (u.origGetInitialProps = i),
          (u.getInitialProps = i),
          ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      6220: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'default', {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let n = r(7083),
          o = r(997),
          l = n._(r(6689)),
          a = n._(r(6114)),
          i = {
            400: 'Bad Request',
            404: 'This page could not be found',
            405: 'Method Not Allowed',
            500: 'Internal Server Error',
          };
        function u(e) {
          let { res: t, err: r } = e;
          return {
            statusCode:
              t && t.statusCode ? t.statusCode : r ? r.statusCode : 404,
          };
        }
        let d = {
          error: {
            fontFamily:
              'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
            height: '100vh',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
          desc: { lineHeight: '48px' },
          h1: {
            display: 'inline-block',
            margin: '0 20px 0 0',
            paddingRight: 23,
            fontSize: 24,
            fontWeight: 500,
            verticalAlign: 'top',
          },
          h2: { fontSize: 14, fontWeight: 400, lineHeight: '28px' },
          wrap: { display: 'inline-block' },
        };
        class s extends l.default.Component {
          render() {
            let { statusCode: e, withDarkMode: t = !0 } = this.props,
              r =
                this.props.title || i[e] || 'An unexpected error has occurred';
            return (0, o.jsxs)('div', {
              style: d.error,
              children: [
                (0, o.jsx)(a.default, {
                  children: (0, o.jsx)('title', {
                    children: e
                      ? e + ': ' + r
                      : 'Application error: a client-side exception has occurred',
                  }),
                }),
                (0, o.jsxs)('div', {
                  style: d.desc,
                  children: [
                    (0, o.jsx)('style', {
                      dangerouslySetInnerHTML: {
                        __html:
                          'body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}' +
                          (t
                            ? '@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}'
                            : ''),
                      },
                    }),
                    e
                      ? (0, o.jsx)('h1', {
                          className: 'next-error-h1',
                          style: d.h1,
                          children: e,
                        })
                      : null,
                    (0, o.jsx)('div', {
                      style: d.wrap,
                      children: (0, o.jsxs)('h2', {
                        style: d.h2,
                        children: [
                          this.props.title || e
                            ? r
                            : (0, o.jsx)(o.Fragment, {
                                children:
                                  'Application error: a client-side exception has occurred (see the browser console for more information)',
                              }),
                          '.',
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            });
          }
        }
        (s.displayName = 'ErrorPage'),
          (s.getInitialProps = u),
          (s.origGetInitialProps = u),
          ('function' == typeof t.default ||
            ('object' == typeof t.default && null !== t.default)) &&
            void 0 === t.default.__esModule &&
            (Object.defineProperty(t.default, '__esModule', { value: !0 }),
            Object.assign(t.default, t),
            (e.exports = t.default));
      },
      1969: (e, t) => {
        function r(e) {
          let {
            ampFirst: t = !1,
            hybrid: r = !1,
            hasQuery: n = !1,
          } = void 0 === e ? {} : e;
          return t || (r && n);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'isInAmpMode', {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
      },
      6114: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (function (e, t) {
            for (var r in t)
              Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
          })(t, {
            default: function () {
              return h;
            },
            defaultHead: function () {
              return p;
            },
          });
        let n = r(7083),
          o = r(5570),
          l = r(997),
          a = o._(r(6689)),
          i = n._(r(7184)),
          u = r(3826),
          d = r(6566),
          s = r(1969);
        function p(e) {
          void 0 === e && (e = !1);
          let t = [(0, l.jsx)('meta', { charSet: 'utf-8' })];
          return (
            e ||
              t.push(
                (0, l.jsx)('meta', {
                  name: 'viewport',
                  content: 'width=device-width',
                })
              ),
            t
          );
        }
        function c(e, t) {
          return 'string' == typeof t || 'number' == typeof t
            ? e
            : t.type === a.default.Fragment
              ? e.concat(
                  a.default.Children.toArray(t.props.children).reduce(
                    (e, t) =>
                      'string' == typeof t || 'number' == typeof t
                        ? e
                        : e.concat(t),
                    []
                  )
                )
              : e.concat(t);
        }
        r(2406);
        let f = ['name', 'httpEquiv', 'charSet', 'itemProp'];
        function g(e, t) {
          let { inAmpMode: r } = t;
          return e
            .reduce(c, [])
            .reverse()
            .concat(p(r).reverse())
            .filter(
              (function () {
                let e = new Set(),
                  t = new Set(),
                  r = new Set(),
                  n = {};
                return o => {
                  let l = !0,
                    a = !1;
                  if (
                    o.key &&
                    'number' != typeof o.key &&
                    o.key.indexOf('$') > 0
                  ) {
                    a = !0;
                    let t = o.key.slice(o.key.indexOf('$') + 1);
                    e.has(t) ? (l = !1) : e.add(t);
                  }
                  switch (o.type) {
                    case 'title':
                    case 'base':
                      t.has(o.type) ? (l = !1) : t.add(o.type);
                      break;
                    case 'meta':
                      for (let e = 0, t = f.length; e < t; e++) {
                        let t = f[e];
                        if (o.props.hasOwnProperty(t)) {
                          if ('charSet' === t) r.has(t) ? (l = !1) : r.add(t);
                          else {
                            let e = o.props[t],
                              r = n[t] || new Set();
                            ('name' !== t || !a) && r.has(e)
                              ? (l = !1)
                              : (r.add(e), (n[t] = r));
                          }
                        }
                      }
                  }
                  return l;
                };
              })()
            )
            .reverse()
            .map((e, t) => {
              let n = e.key || t;
              if (
                !r &&
                'link' === e.type &&
                e.props.href &&
                [
                  'https://fonts.googleapis.com/css',
                  'https://use.typekit.net/',
                ].some(t => e.props.href.startsWith(t))
              ) {
                let t = { ...(e.props || {}) };
                return (
                  (t['data-href'] = t.href),
                  (t.href = void 0),
                  (t['data-optimized-fonts'] = !0),
                  a.default.cloneElement(e, t)
                );
              }
              return a.default.cloneElement(e, { key: n });
            });
        }
        let h = function (e) {
          let { children: t } = e,
            r = (0, a.useContext)(u.AmpStateContext),
            n = (0, a.useContext)(d.HeadManagerContext);
          return (0, l.jsx)(i.default, {
            reduceComponentsToState: g,
            headManager: n,
            inAmpMode: (0, s.isInAmpMode)(r),
            children: t,
          });
        };
        ('function' == typeof t.default ||
          ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      7184: (e, t, r) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'default', {
            enumerable: !0,
            get: function () {
              return a;
            },
          });
        let n = r(6689),
          o = () => {},
          l = () => {};
        function a(e) {
          var t;
          let { headManager: r, reduceComponentsToState: a } = e;
          function i() {
            if (r && r.mountedInstances) {
              let t = n.Children.toArray(
                Array.from(r.mountedInstances).filter(Boolean)
              );
              r.updateHead(a(t, e));
            }
          }
          return (
            null == r || null == (t = r.mountedInstances) || t.add(e.children),
            i(),
            o(() => {
              var t;
              return (
                null == r ||
                  null == (t = r.mountedInstances) ||
                  t.add(e.children),
                () => {
                  var t;
                  null == r ||
                    null == (t = r.mountedInstances) ||
                    t.delete(e.children);
                }
              );
            }),
            o(
              () => (
                r && (r._pendingUpdate = i),
                () => {
                  r && (r._pendingUpdate = i);
                }
              )
            ),
            l(
              () => (
                r &&
                  r._pendingUpdate &&
                  (r._pendingUpdate(), (r._pendingUpdate = null)),
                () => {
                  r &&
                    r._pendingUpdate &&
                    (r._pendingUpdate(), (r._pendingUpdate = null));
                }
              )
            ),
            null
          );
        }
      },
      2406: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'warnOnce', {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
        let r = e => {};
      },
      4591: (e, t) => {
        var r;
        Object.defineProperty(t, 'x', {
          enumerable: !0,
          get: function () {
            return r;
          },
        }),
          (function (e) {
            (e.PAGES = 'PAGES'),
              (e.PAGES_API = 'PAGES_API'),
              (e.APP_PAGE = 'APP_PAGE'),
              (e.APP_ROUTE = 'APP_ROUTE');
          })(r || (r = {}));
      },
      3826: (e, t, r) => {
        e.exports = r(8877).vendored.contexts.AmpContext;
      },
      6566: (e, t, r) => {
        e.exports = r(8877).vendored.contexts.HeadManagerContext;
      },
      2785: e => {
        e.exports = require('next/dist/compiled/next-server/pages.runtime.prod.js');
      },
      6689: e => {
        e.exports = require('react');
      },
      997: e => {
        e.exports = require('react/jsx-runtime');
      },
      1017: e => {
        e.exports = require('path');
      },
      5570: (e, t) => {
        function r(e) {
          if ('function' != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (r = function (e) {
            return e ? n : t;
          })(e);
        }
        t._ = t._interop_require_wildcard = function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ('object' != typeof e && 'function' != typeof e))
            return { default: e };
          var n = r(t);
          if (n && n.has(e)) return n.get(e);
          var o = { __proto__: null },
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var a in e)
            if ('default' !== a && Object.prototype.hasOwnProperty.call(e, a)) {
              var i = l ? Object.getOwnPropertyDescriptor(e, a) : null;
              i && (i.get || i.set)
                ? Object.defineProperty(o, a, i)
                : (o[a] = e[a]);
            }
          return (o.default = e), n && n.set(e, o), o;
        };
      },
    });
  var t = require('../webpack-runtime.js');
  t.C(e);
  var r = e => t((t.s = e)),
    n = t.X(0, [135], () => r(8445));
  module.exports = n;
})();
