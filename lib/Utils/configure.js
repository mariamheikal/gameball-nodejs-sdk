"use strict";

//Version of the Gameball SDK
var sdkVersion = exports.sdkVersion = require('../../package').version;
var userAgent = exports.userAgent = 'GameballSDK/gameball-node-SDK' + sdkVersion + ' (node ' + process.version + '-' + process.arch + '-' + process.platform  + '; OpenSSL ' + process.versions.openssl + ')';

//default options gathering the default parameters for Gameball APIs.
var default_options = exports.default_options = {
    'schema': 'https',
    'host': 'api.gameball.co',
    'path':"/api/v2.0/Integrations",
    'port': process.env.PORT
};

var DEFAULT_ERROR_CODE=exports.DEFAULT_ERROR_CODE=0
var DEFAULT_TIMEOUT_MS=exports.DEFAULT_TIMEOUT_MS=5000
