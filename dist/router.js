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
exports.Router = void 0;
var immutable_1 = require("immutable");
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
            requestHandler = __spread(filter, requestHandler);
        }
        if (Array.isArray(config)) {
            config.forEach(function (item) {
                item.name = propertyKey;
                item.path = item.path;
                target.__DecoratedRouters = target.__DecoratedRouters && target.__DecoratedRouters.set(item, requestHandler);
            });
        }
        else {
            var item = config;
            item.name = propertyKey;
            item.path = item.path;
            target.__DecoratedRouters = target.__DecoratedRouters.set(item, requestHandler);
        }
    };
}
exports.Router = Router;
