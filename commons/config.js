const fs = require('fs');

var serverConfig = null;

function initConfig() {
    var config = fs.readFileSync('./conf/server.conf').toString();
    serverConfig = JSON.parse(config);
}

function get(key) {
    if (serverConfig == null) {
        initConfig();
    }
    return serverConfig.server[key];
}


exports.get = get;