var btcbox = require('btcbox');
var api = btcbox.PublicApi;

var rates = exports.rates = function(){
    return api.depth('btc_jpy').then(function(res){
        var bids = res.bids;
        var asks = res.asks.reverse();
        return {
            "BTC_JPY" : (bids[0][0] + asks[0][0]) / 2
        }
    })
}

var ticker = exports.ticker = function(){
    return api.depth('btc_jpy').then(function(res){
        var bids = res.bids;
        var asks = res.asks.reverse();
        return {
            "BTC_JPY" : [bids[0][0], asks[0][0]]
        }
    })
}


