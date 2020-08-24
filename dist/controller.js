"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MountController = exports.Path = exports.Controller = void 0;
var express_1 = require("express");
var immutable_1 = require("immutable");
var pipeline_1 = require("./pipeline");
var Controller = (function () {
    function Controller() {
    }
    return Controller;
}());
exports.Controller = Controller;
function Path(root) {
    return function (target) {
        target.__DecoratedRoot = root;
    };
}
exports.Path = Path;
function MountController() {
    var e_1, _a;
    var controllers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        controllers[_i] = arguments[_i];
    }
    var router = express_1.Router();
    try {
        for (var controllers_1 = __values(controllers), controllers_1_1 = controllers_1.next(); !controllers_1_1.done; controllers_1_1 = controllers_1.next()) {
            var item = controllers_1_1.value;
            var __DecoratedRouters = new item().__DecoratedRouters || immutable_1.Map();
            pipeline_1.addendRouter(__DecoratedRouters, router, item.__DecoratedRoot);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (controllers_1_1 && !controllers_1_1.done && (_a = controllers_1.return)) _a.call(controllers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return router;
}
exports.MountController = MountController;
