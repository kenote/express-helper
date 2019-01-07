"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
function MiddlewareSetting(setting) {
    return function (target) {
        target.prototype.__ResponseHeaders = setting.header || [];
        target.prototype.__RequestParameters = setting.parameter;
    };
}
exports.MiddlewareSetting = MiddlewareSetting;
var Middleware = (function () {
    function Middleware() {
    }
    Middleware.prototype.hendler = function () {
        var _this = this;
        return function (request, response, next) {
            var e_1, _a, e_2, _b;
            try {
                for (var _c = __values(_this.__ResponseHeaders), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), name_1 = _e[0], value = _e[1];
                    response.setHeader(name_1, value);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (_this.__RequestParameters) {
                for (var parameter in _this.__RequestParameters) {
                    request[parameter] = _this.__RequestParameters[parameter];
                }
            }
            try {
                for (var _f = __values(_this.__ResponseMethods), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var _h = _g.value, name_2 = _h.name, func = _h.func;
                    response[name_2] = func(response);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return next();
        };
    };
    return Middleware;
}());
exports.Middleware = Middleware;
function RegisterMiddlewareMethod() {
    return function (target, propertyKey, descriptor) {
        if (!target.__ResponseMethods) {
            target.__ResponseMethods = [];
        }
        target.__ResponseMethods.push({ name: propertyKey, func: target[propertyKey] });
    };
}
exports.RegisterMiddlewareMethod = RegisterMiddlewareMethod;
