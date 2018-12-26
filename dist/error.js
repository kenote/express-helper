"use strict";
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var ExpressError = (function () {
    function ExpressError() {
        var _this = this;
        this.ErrorInfo = function (code, opts, json) {
            var info = { code: code };
            for (var e in _this.__ErrorCode) {
                if (_this.__ErrorCode[e] === code) {
                    info.message = _this.__ErrorMessage[e];
                    break;
                }
            }
            if (Array.isArray(opts)) {
                opts.splice(0, 0, info.message);
                info.message = util.format.apply(util, __spread([opts[0]], opts.slice(1)));
            }
            if (json)
                return info;
            var error = new Error(info.message);
            error.code = info.code;
            return error;
        };
        this.CustomError = function (e) { return e.code && e.code >= 1000; };
    }
    return ExpressError;
}());
exports.ExpressError = ExpressError;
function ErrorSetting(setting) {
    return function (target) {
        target.prototype.__ErrorCode = setting.code;
        target.prototype.__ErrorMessage = setting.message;
    };
}
exports.ErrorSetting = ErrorSetting;
