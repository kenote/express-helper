"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
var immutable_1 = require("immutable");
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
