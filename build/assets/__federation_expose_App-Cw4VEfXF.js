import { importShared } from './__federation_fn_import-BMvXcRIw.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

const remotesMap = {
'host':{url:'http://localhost:3000/build/assets/remoteEntry.js',format:'esm',from:'vite'}
};
                const currentImports = {};

                function get(name, remoteFrom) {
                    return __federation_import(name).then(module => () => {
                        return module
                    })
                }
                
                function merge(obj1, obj2) {
                  const mergedObj = Object.assign(obj1, obj2);
                  for (const key of Object.keys(mergedObj)) {
                    if (typeof mergedObj[key] === 'object' && typeof obj2[key] === 'object') {
                      mergedObj[key] = merge(mergedObj[key], obj2[key]);
                    }
                  }
                  return mergedObj;
                }

                const wrapShareModule = remoteFrom => {
                  return merge({
                    'react':{'undefined':{get:()=>get(new URL('__federation_shared_react-BjdAhW7f.js', import.meta.url).href), loaded:1}},'react-dom':{'undefined':{get:()=>get(new URL('__federation_shared_react-dom-BEaDVk2S.js', import.meta.url).href), loaded:1}},'react-router-dom':{'undefined':{get:()=>get(new URL('__federation_shared_react-router-dom-B16cL-NQ.js', import.meta.url).href), loaded:1}}
                  }, (globalThis.__federation_shared__ || {})['default'] || {});
                };

                async function __federation_import(name) {
                    currentImports[name] ??= import(name);
                    return currentImports[name]
                }

                async function __federation_method_ensure(remoteId) {
                    const remote = remotesMap[remoteId];
                    if (!remote.inited) {
                        if (['esm', 'systemjs'].includes(remote.format)) {
                            // loading js with import(...)
                            return new Promise((resolve, reject) => {
                                const getUrl = () => Promise.resolve(remote.url);
                                getUrl().then(url => {
                                    import(/* @vite-ignore */ url).then(lib => {
                                        if (!remote.inited) {
                                            const shareScope = wrapShareModule();
                                            lib.init(shareScope);
                                            remote.lib = lib;
                                            remote.lib.init(shareScope);
                                            remote.inited = true;
                                        }
                                        resolve(remote.lib);
                                    }).catch(reject);
                                });
                            })
                        }
                    } else {
                        return remote.lib;
                    }
                }

                function __federation_method_getRemote(remoteName, componentName) {
                    return __federation_method_ensure(remoteName).then((remote) => remote.get(componentName).then(factory => factory()));
                }

const links = [
  { label: "Project A", to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "ProjectA Home" }) },
  { label: "Test 1", to: "/test1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "ProjectA Test 1" }) },
  { label: "Test 2", to: "/test2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "ProjectA Test 2" }) },
  { label: "Test 3", to: "/test3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "ProjectA Test 3" }) }
];

const {Suspense} = await importShared('react');

const {Routes,Route} = await importShared('react-router-dom');

const Router = ({ basename }) => {
  const pathFor = (to) => basename ? `${basename}${to === "/" ? "" : to}` : to;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Routes, { children: links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: pathFor(link.to), element: link.children }, link.to)) }) });
};

const {BrowserRouter,useInRouterContext} = await importShared('react-router-dom');

const RouterWrapper = ({ children, basename = "" }) => {
  const inRouterContext = useInRouterContext();
  if (inRouterContext) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { basename, children });
};

const __federation_var_hostHeader = await __federation_method_getRemote("host" , "./Header");
 let {Header} = __federation_var_hostHeader;
const __federation_var_hostconfig = await __federation_method_getRemote("host" , "./config");
 let {appConfig} = __federation_var_hostconfig;
const defaultBasename = "/about";
const App = () => {
  const basename = defaultBasename;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(RouterWrapper, { basename, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { links, basename }),
    appConfig.features.analytics && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
      "Analytics enabled (",
      appConfig.appName,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Router, { basename })
  ] });
};

export { App as default, jsxRuntimeExports as j };
//# sourceMappingURL=__federation_expose_App-Cw4VEfXF.js.map
