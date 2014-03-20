
/*
 * Generated with Grunt on 20.03.2014 at 14:46:10
 */

!function(a) {
    a(document).ready(function() {
        var b = a("html");
        window.application = new Tc.Application(b), application.config = {
            themeDir: "<?= get_template_directory_uri() ?>"
        }, application.registerModules(b), application.start();
    });
}(Tc.$);

var Tc = Tc || {};

Tc.$ = $, function() {
    var a = !1, b = /xyz/.test(function() {}) ? /\b_super\b/ : /.*/;
    this.Class = function() {}, Class.extend = function(c) {
        function d() {
            !a && this.init && this.init.apply(this, arguments);
        }
        var e = this.prototype;
        a = !0;
        var f = new this();
        a = !1;
        for (var g in c) f[g] = "function" == typeof c[g] && "function" == typeof e[g] && b.test(c[g]) ? function(a, b) {
            return function() {
                var c = this._super;
                this._super = e[a];
                var d = b.apply(this, arguments);
                return this._super = c, d;
            };
        }(g, c[g]) : c[g];
        return d.prototype = f, d.constructor = d, d.extend = arguments.callee, d;
    };
}(), Tc.Config = {
    dependencies: {
        css: "/css/dependencies",
        js: "/js/dependencies"
    }
}, function(a) {
    "use strict";
    Tc.Application = Class.extend({
        init: function(b, c) {
            this.config = a.extend(Tc.Config, c), this.$ctx = b || a("body"), this.modules = [], 
            this.connectors = {}, this.sandbox = new Tc.Sandbox(this, this.config);
        },
        registerModules: function(b) {
            var c = this, d = [], e = Tc.Utils.String;
            return b = b || this.$ctx, b.find('.mod:not([data-ignore="true"])').each(function() {
                var b = a(this), f = b.attr("class").split(" ");
                if (f.length > 1) {
                    for (var g, h, i = [], j = [], k = 0, l = f.length; l > k; k++) {
                        var m = a.trim(f[k]);
                        m && (m.indexOf("-") > -1 && (m = e.toCamel(m)), 0 === m.indexOf("mod") && m.length > 3 ? g = m.substr(3) : 0 === m.indexOf("skin") && i.push(m.substr(4).replace(g, "")));
                    }
                    if (h = b.attr("data-connectors")) {
                        j = h.split(",");
                        for (var k = 0, l = j.length; l > k; k++) {
                            var n = a.trim(j[k]);
                            n && (j[k] = n);
                        }
                    }
                    g && Tc.Module[g] && d.push(c.registerModule(b, g, i, j));
                }
            }), d;
        },
        unregisterModules: function(b) {
            var c = this.connectors;
            if (b = b || this.modules, b === this.modules) this.connectors = [], this.modules = []; else for (var d = 0, e = b.length; e > d; d++) {
                var f, g = b[d];
                for (var h in c) c.hasOwnProperty(h) && c[h].unregisterComponent(g);
                f = a.inArray(g, this.modules), f > -1 && delete this.modules[f];
            }
        },
        start: function(a) {
            a = a || this.modules;
            for (var b = 0, c = a.length; c > b; b++) a[b].start();
        },
        stop: function(a) {
            a = a || this.modules;
            for (var b = 0, c = a.length; c > b; b++) a[b].stop();
        },
        registerModule: function(a, b, c, d) {
            var e = this.modules;
            if (b = b || void 0, c = c || [], d = d || [], b && Tc.Module[b]) {
                var f = e.length;
                a.data("id", f), e[f] = new Tc.Module[b](a, this.sandbox, f);
                for (var g = 0, h = c.length; h > g; g++) {
                    var i = c[g];
                    Tc.Module[b][i] && (e[f] = e[f].getDecoratedModule(b, i));
                }
                for (var g = 0, h = d.length; h > g; g++) this.registerConnection(d[g], e[f]);
                return e[f];
            }
            return null;
        },
        registerConnection: function(b, c) {
            b = a.trim(b);
            var d, e, f, g = b.split("-");
            if (1 === g.length ? f = e = g[0] : 2 === g.length && (d = g[0], e = g[1], f = d + e), 
            f) {
                var h = this.connectors;
                h[f] || (d ? Tc.Connector[d] && (h[f] = new Tc.Connector[d](e)) : h[f] = new Tc.Connector(e)), 
                h[f] && (c.attachConnector(h[f]), h[f].registerComponent(c));
            }
        },
        unregisterConnection: function(a, b) {
            var c = this.connectors[a];
            c && (c.unregisterComponent(b), b.detachConnector(c));
        }
    });
}(Tc.$), function() {
    "use strict";
    Tc.Sandbox = Class.extend({
        init: function(a, b) {
            this.application = a, this.config = b, this.afterCallbacks = [];
        },
        addModules: function(a) {
            var b = [], c = this.application;
            return a && (b = c.registerModules(a), c.start(b)), b;
        },
        removeModules: function(a) {
            var b = this.application;
            a && (b.stop(a), b.unregisterModules(a));
        },
        subscribe: function(a, b) {
            var c = this.application;
            b instanceof Tc.Module && a && (a += "", c.registerConnection(a, b));
        },
        unsubscribe: function(a, b) {
            var c = this.application;
            b instanceof Tc.Module && a && (a += "", c.unregisterConnection(a, b));
        },
        getModuleById: function(a) {
            var b = this.application;
            if (void 0 !== b.modules[a]) return b.modules[a];
            throw new Error("the module with the id " + a + " does not exist");
        },
        getConfig: function() {
            return this.config;
        },
        getConfigParam: function(a) {
            var b = this.config;
            if (void 0 !== b[a]) return b[a];
            throw new Error("the config param " + a + " does not exist");
        },
        ready: function(a) {
            var b = this.afterCallbacks;
            if (b.push(a), this.application.modules.length === b.length) for (var c = 0; c < b.length; c++) {
                var d = b[c];
                "function" == typeof d && (delete b[c], d());
            }
        }
    });
}(Tc.$), function(a) {
    "use strict";
    Tc.Module = Class.extend({
        init: function(a, b, c) {
            this.$ctx = a, this.id = c, this.connectors = {}, this.sandbox = b;
        },
        start: function() {
            var a = this;
            this.on && this.on(function() {
                a.initAfter();
            });
        },
        stop: function() {
            var b = this.$ctx;
            a("*", b).unbind().removeData(), b.unbind().removeData();
        },
        initAfter: function() {
            var a = this;
            this.sandbox.ready(function() {
                a.after && a.after();
            });
        },
        fire: function(b, c, d, e) {
            var f = this, g = this.connectors, h = !0;
            null == d && null == e ? "function" == typeof c ? (e = c, c = void 0) : a.isArray(c) && (d = c, 
            c = void 0) : null == e && ("function" == typeof d && (e = d, d = void 0), a.isArray(c) && (d = c, 
            c = void 0)), b = Tc.Utils.String.capitalize(b), c = c || {}, d = d || Object.keys(g);
            for (var i = 0, j = d.length; j > i; i++) {
                var k = d[i];
                if (!g.hasOwnProperty(k)) throw new Error("the module #" + f.id + " is not connected to connector " + k);
                var l = g[k], m = l.notify(f, "on" + b, c) || !1;
                m || (h = !1);
            }
            h && "function" == typeof e && e();
        },
        attachConnector: function(a) {
            this.connectors[a.connectorId] = a;
        },
        detachConnector: function(a) {
            delete this.connectors[a.connectorId];
        },
        getDecoratedModule: function(a, b) {
            if (Tc.Module[a][b]) {
                var c = Tc.Module[a][b];
                return c.prototype = this, c.prototype.constructor = Tc.Module[a][b], new c(this);
            }
            return null;
        }
    });
}(Tc.$), function() {
    "use strict";
    Tc.Connector = Class.extend({
        init: function(a) {
            this.connectorId = a, this.components = {};
        },
        registerComponent: function(a) {
            this.components[a.id] = {
                component: a
            };
        },
        unregisterComponent: function(a) {
            var b = this.components;
            b[a.id] && delete b[a.id];
        },
        notify: function(a, b, c) {
            var d = !0, e = this.components;
            for (var f in e) if (e.hasOwnProperty(f)) {
                var g = e[f].component;
                g !== a && g[b] && g[b](c) === !1 && (d = !1);
            }
            return d;
        }
    });
}(Tc.$), Tc.Utils = {}, Object.keys || (Object.keys = function(a) {
    var b, c = [];
    for (b in a) Object.prototype.hasOwnProperty.call(a, b) && c.push(b);
    return c;
}), function() {
    "use strict";
    Tc.Utils.String = {
        capitalize: function(a) {
            return a.substr(0, 1).toUpperCase().concat(a.substr(1));
        },
        toCamel: function(a) {
            return a.replace(/(\-[A-Za-z])/g, function(a) {
                return a.toUpperCase().replace("-", "");
            });
        }
    };
}(Tc.$), function() {
    "use strict";
    Tc.Module.Example = Tc.Module.extend({
        init: function(a, b, c) {
            this._super(a, b, c);
        },
        on: function(a) {
            a();
        },
        after: function() {}
    });
}(Tc.$), function() {
    "use strict";
    Tc.Module.Example.Woot = function(a) {
        this.on = function(b) {
            a.on(b);
        }, this.after = function() {
            a.after();
        };
    };
}(Tc.$);
//# sourceMappingURL=scripts.map