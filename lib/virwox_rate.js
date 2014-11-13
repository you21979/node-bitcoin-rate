var virwox = require('virwox')
var util = virwox.BasicApiUtil;

var fee = 0.091 + 1;

var rates = exports.rates = function(){
    return util.getBitcoinRate().then(function(res){
        return Object.keys(res).reduce(function(r,v){
            r[v.replace('/', '_')] = (res[v][0] + res[v][1]) / 2 * fee;
            return r;
        },{});
    })
}

var ticker = exports.ticker = function(){
    return util.getBitcoinRate().then(function(res){
        return Object.keys(res).reduce(function(r,v){
            r[v.replace('/', '_')] = res[v].map(function(v){return v * fee});
            return r;
        },{});
    })
}


