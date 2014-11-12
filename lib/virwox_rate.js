var virwox = require('virwox')
var util = virwox.BasicApiUtil;

var rates = exports.rates = function(){
    return util.getBitcoinRate().then(function(res){
        return Object.keys(res).reduce(function(r,v){
            r[v.replace('/', '_')] = (res[v][0] + res[v][1]) / 2;
            return r;
        },{});
    })
}

var ticker = exports.ticker = function(){
    return util.getBitcoinRate().then(function(res){
        return Object.keys(res).reduce(function(r,v){
            r[v.replace('/', '_')] = res[v];
            return r;
        },{});
    })
}


