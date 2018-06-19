$(function () {

    //SMD
    var F = F || {};
    F.define = function (str, fn) {
        var parts = str.split('.');
        var old = parent = this;
        var i = len = 0;
        if (parts[0] === "F") {
            parts = parts.slice(1);
        }
        if (parts[0] === "define" || parts[0] === "module") {
            return;
        }
        for (len = parts.length; i < len; i++) {
            if (typeof parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }
            old = parent;
            parent = parent[parts[i]];
        }
        if (fn) {
            old[parts[--i]] = fn();
        }
        return this;
    }
    F.define('string', function () {
        return {
            trim: function (str) {
                return str.replace(/^\s+|\s+$/g, '11');
            }
        }
    });
    console.log(F.string.trim("test console     "));
    F.define('dom', function () {
        var $$ = function (id) {
            $$.dom = document.getElementById(id);
            return $$;
        }
        $$.html = function (html) {
            if (html) {
                this.dom.innerHTML = html;
                return this;
            } else {
                return this.dom.innerHTML;
            }
        }
        return $$;
    })
    F.define("dom.addClass");
    F.dom.addClass = function () {
        return function (classsName) {
            if (!~this.dom.className.indexOf(classsName)) {
                this.dom.className += ' ' + classsName;
            }
        }
    }();
    F.dom('divTest').addClass('test');
    F.module = function () {
        var args = [].slice.call(arguments),
            fn = args.pop(),
            parts = args[0] && args[0] instanceof Array ? args[0] : args,
            modules = [],
            modeIds = '',
            i = 0, ilen = parts.length,
            parent, j, jlen;
        while (i < ilen) {
            if (typeof  parts[i] === 'string') {
                parent = this;
                modeIds = parts[i].replace(/^F\./, '').split('.');
                for (j = 0, jlen = modeIds.length; j < jlen; j++) {
                    parent = parent[modeIds[j]] || false;
                }
                modules.push(parent);
            } else {
                modules.push(parts[i]);
            }
            i++;
        }
        fn.apply(null, modules);
    }
    F.module(["dom", document], function (dom, doc) {
        dom('divTest').html("new add!");
        // .style.background='red';
    });
    F.module('dom', 'string.trim', function (dom, trim) {
        var html = dom('divTest').html();
        var str = trim(html);
        console.log("*" + html + "*", "*" + str + "*");
    });
    F.module(['dom', 'string.trim'], function (dom, trim) {
        var html = dom('divTest').html();
        var str = trim(html);
        console.log("*" + html + "*", "*" + str + "*");
    });

    //AMD

    (function (F) {
        var moduleCache = {}
    })((function () {
        return window.AF = {};
    })());

    AF.module = function (url, modDeps, modCallback) {
        var args = [].slice.call(arguments),
            callback = args.pop(),
            deps = (args.length && args[args.length - 1] instanceof Array) ? args.pop() : [],
            url = args.length ? args.pop() : null,
            params = [],
            depsCount = 0,
            i = 0, len;
        if (len = deps.length) {
            while (i < len) {
                (function (i) {
                    depsCount++;
                    loadModule(deps[i], function (mod) {
                        params[i] = mod;
                        depsCount--;
                        if (depsCount === 0) {
                            setModule(url, params, callback);
                        }
                    });
                })(i);
                i++;
            }
        } else
            setModule(url, [], callback);
    }
    var moduleCache = {};
    var setModule = function (moduleName, params, callback) {
        var _module, fn;
        if (moduleCache[moduleName]) {
            _module = moduleCache[moduleName];
            _module.status = 'loaded';
            _module.exports = callback ? callback.apply(_module, params) : null;
            while (fn = _module.onload.shift()) {
                fn(_module.exports);
            }
        } else {
            callback && callback.apply(null, params);
        }
    }
    var loadModule = function (moduleName, callback) {
        var _module;
        if (moduleCache[moduleName]) {
            _module = moduleCache[moduleName];
            if (_module.status === "loaded") {
                setTimeout(callback(_module.exports), 0);
            } else {
                _module.onload.push(callback);
            }
        } else {
            moduleCache[moduleName] = {
                moduleName: moduleName,
                status: 'loading',
                exports: null,
                onload: [callback]
            }
            loadScript(getUrl(moduleName));
        }
    }
    var getUrl = function (moduleName) {
        return String(moduleName).replace(/\.js$/g, '') + '.js';
    };
    var loadScript = function (src) {
        var _script = document.createElement('script');
        _script.type = 'text/JavaScript';
        _script.charset = 'UTF-8';
        _script.async = true;
        _script.src = src;
        document.getElementsByTagName('head')[0].appendChild(_script);
    }
    AF.module(['Js/event', 'Js/dom'], function (evnets, dom) {
        evnets.on('demo', 'click', function () {
            dom.html('demo', 'success');
        })
    })
});