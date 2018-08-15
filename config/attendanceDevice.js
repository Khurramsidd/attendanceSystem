const ZKLib = require('zklib'),
winston = require('winston'),
ZK = new ZKLib({
    ip: '192.168.1.17',
    port: 4370,
    inport: 5200,
    timeout: 5000,
});

// connect to access control device
ZK.connect(function (err) {
    if ( err ) {
        winston.error("Error while connecting device");
        throw err;
    }
    {
        winston.info("***********************/ Device Connected./***********************");

    }
});
module.exports = ZK;