var API = "https://bitpay.com/api/rates";
var LimitRequestPromise = require('limit-request-promise');
var lp = new LimitRequestPromise(1,1);
var rates = exports.rates = function(){
    return lp.req(API).then(JSON.parse).then(function(res){
        return res.reduce(function(r,v){
            r['BTC_' + v.code] = v.rate;
            return r;
        }, {})
    })
}
