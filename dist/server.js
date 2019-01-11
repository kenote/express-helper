"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var compress = require("compression");
var ExpressServer = (function () {
    function ExpressServer(Express) {
        if (Express === void 0) { Express = express; }
        this.appliction = Express();
        this.appliction.use(bodyParser.json({ limit: '1mb' }));
        this.appliction.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
        this.appliction.use(methodOverride());
        this.appliction.use(compress());
    }
    ExpressServer.prototype.start = function () {
        var server = http.createServer(this.appliction);
        var _a = this.settings, Host = _a.Host, Port = _a.Port;
        server.listen(Port || 3000, Host || 'loclhost', function (err) {
            if (err)
                throw err;
            console.log("Service running in %s environment, PORT: %d ...", process.env.NODE_ENV || 'development', Port || 3000);
        });
    };
    return ExpressServer;
}());
exports.ExpressServer = ExpressServer;
function ServerSettings(value) {
    return function (target) {
        target.prototype.settings = value;
    };
}
exports.ServerSettings = ServerSettings;
