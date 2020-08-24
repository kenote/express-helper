"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
exports.addendRouter = exports.mountPipeline = void 0;
var path = require("path");
var glob = require("glob");
var express_1 = require("express");
function mountPipeline(name, pipeline, app, options) {
    var _this = this;
    var _a = options || { root: '.', handlers: [] }, root = _a.root, handlers = _a.handlers;
    var router = express_1.Router();
    var files = [];
    glob.sync("/" + pipeline + "/**/*.ts", { root: root }).forEach(function (file) { return __awaiter(_this, void 0, void 0, function () {
        var filename, controller, Control, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files.push(file);
                    filename = path.basename(file).replace(/\.ts$/, '');
                    if (/^(index)/.test(filename))
                        return [2];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, Promise.resolve().then(function () { return require(file.replace(/\.[^.]*$/, '')); })];
                case 2:
                    controller = _a.sent();
                    Control = new controller.default();
                    Control.__DecoratedRouters && addendRouter(Control.__DecoratedRouters, router, controller.default.__DecoratedRoot);
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
    handlers = __spread(handlers || [], [router]);
    app.use.apply(app, __spread([name], handlers));
}
exports.mountPipeline = mountPipeline;
function addendRouter(maps, router, root) {
    var e_1, _a;
    var _root = root || '';
    try {
        for (var maps_1 = __values(maps), maps_1_1 = maps_1.next(); !maps_1_1.done; maps_1_1 = maps_1.next()) {
            var _b = __read(maps_1_1.value, 2), config = _b[0], controller = _b[1];
            router[config.method].apply(router, __spread([_root + config.path], controller));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (maps_1_1 && !maps_1_1.done && (_a = maps_1.return)) _a.call(maps_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.addendRouter = addendRouter;
