var API = "https://bitflyer.jp/api/Market";
var LimitRequestPromise = require('limit-request-promise');
var lp = new LimitRequestPromise(1,1);
var rates = exports.rates = function(){
    return lp.req(API).then(JSON.parse).then(function(res){
        return {
            'BTC_JPY' : res.mid,
        }
    })
}
var ticker = exports.ticker = function(){
    return lp.req(API).then(JSON.parse).then(function(res){
        return {
            'BTC_JPY' : [res.bid,res.ask]
        }
    })
}
