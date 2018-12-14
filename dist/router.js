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
var express = require("express");
var immutable_1 = require("immutable");
var RouterMethods = (function () {
    function RouterMethods() {
    }
    return RouterMethods;
}());
exports.RouterMethods = RouterMethods;
function Router() {
    var config = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        config[_i] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        if (!target.__DecoratedRouters) {
            target.__DecoratedRouters = immutable_1.Map();
        }
        var requestHandler = [target[propertyKey]];
        if (target.__DecoratedFilters && target.__DecoratedFilters.get(propertyKey)) {
            var filter = target.__DecoratedFilters.get(propertyKey);
            requestHandler = filter.concat(requestHandler);
        }
        if (Array.isArray(config)) {
            config.forEach(function (item) {
                item.name = propertyKey;
                target.__DecoratedRouters = target.__DecoratedRouters.set(item, requestHandler);
            });
        }
        else {
            config.name = propertyKey;
            target.__DecoratedRouters = target.__DecoratedRouters.set(config, requestHandler);
        }
    };
}
exports.Router = Router;
function Filter() {
    var filter = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        filter[_i] = arguments[_i];
    }
    return function (target, propertyKey, descriptor) {
        if (!target.__DecoratedFilters) {
            target.__DecoratedFilters = immutable_1.Map();
        }
        target.__DecoratedFilters = target.__DecoratedFilters.set(propertyKey, filter);
    };
}
exports.Filter = Filter;
var RouterController = (function () {
    function RouterController() {
    }
    RouterController.prototype.addend = function (controller) {
        if (!this.__DecoratedRouters) {
            this.__DecoratedRouters = immutable_1.Map();
        }
        this.__DecoratedRouters = this.__DecoratedRouters.merge(controller.__DecoratedRouters);
    };
    RouterController.prototype.handler = function () {
        var e_1, _a;
        var router = express.Router();
        if (!this.__DecoratedRouters) {
            this.__DecoratedRouters = immutable_1.Map();
        }
        try {
            for (var _b = __values(this.__DecoratedRouters), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), config = _d[0], controller = _d[1];
                router[config.method](config.path, controller);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return router;
    };
    return RouterController;
}());
exports.RouterController = RouterController;
function ControllerMount() {
    var controller = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        controller[_i] = arguments[_i];
    }
    return function (target) {
        if (!target.__DecoratedRouters) {
            target.prototype.__DecoratedRouters = immutable_1.Map();
        }
        controller.forEach(function (item) {
            target.prototype.__DecoratedRouters = target.prototype.__DecoratedRouters.merge(new item().__DecoratedRouters);
        });
    };
}
exports.ControllerMount = ControllerMount;
