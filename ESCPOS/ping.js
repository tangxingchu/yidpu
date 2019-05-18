var ping = require('ping');
var host = '192.168.0.112';

ping.sys.probe(host, function(isAlive){
    var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
    console.log(msg);
});