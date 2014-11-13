var bitpay = require('./bitpay_rate.js');
var btcbox = require('./btcbox_rate.js');
var etwings = require('./etwings_rate.js');
var virwox = require('./virwox_rate.js');
var fx = require('yahoo-currency');

var promise = require('bluebird');
var baseRate = function(){
    return promise.all([
        bitpay.rates().then(function(res){
            return {
                name:'bitpay',
                rates:{
                    USD_JPY:res['BTC_JPY'] / res['BTC_USD'],
                    BTC_USD:res['BTC_USD'],
                    BTC_JPY:res['BTC_JPY'],
                }
            }
        }),
        fx.fullRate().then(function(res){
            return {
                name:'yahoo',
                rates:{
                    USD_JPY:res['USDJPY'],
                    BTC_USD:res['BTCUSD'],
                    BTC_JPY:res['BTCJPY'],
                }
            }
        })
    ])
}
var exchangeRate = function(jpy){
    return promise.all([
        btcbox.rates().then(function(res){
            return {
                name:'btxbox',
                rates:{
                    USD_JPY:jpy,
                    BTC_USD:res['BTC_JPY'] / jpy,
                    BTC_JPY:res['BTC_JPY'],
                }
            }
        }),
        etwings.rates().then(function(res){
            return {
                name:'etwings',
                rates:{
                    USD_JPY:jpy,
                    BTC_USD:res['BTC_JPY'] / jpy,
                    BTC_JPY:res['BTC_JPY'],
                }
            }
        }),
        virwox.rates().then(function(res){
            return {
                name:'virwox',
                rates:{
                    USD_JPY:jpy,
                    BTC_USD:res['BTC_USD'],
                    BTC_JPY:res['BTC_USD'] * jpy,
                }
            }
        })
    ])
}
var exchangeTicker = function(jpy){
    return promise.all([
        btcbox.ticker().then(function(res){
            return {
                name:'btxbox',
                USD_JPY:jpy,
                rates:{
                    BTC_USD:res['BTC_JPY'].map(function(v){return v/jpy}),
                    BTC_JPY:res['BTC_JPY'],
                }
            }
        }),
        etwings.ticker().then(function(res){
            return {
                name:'etwings',
                USD_JPY:jpy,
                rates:{
                    BTC_USD:res['BTC_JPY'].map(function(v){return v/jpy}),
                    BTC_JPY:res['BTC_JPY'],
                }
            }
        }),
        virwox.ticker().then(function(res){
            return {
                name:'virwox',
                USD_JPY:jpy,
                rates:{
                    BTC_USD:res['BTC_USD'],
                    BTC_JPY:res['BTC_USD'].map(function(v){return v*jpy}),
                }
            }
        })
    ])
}

var rates = exports.rates = function(jpy){
    return baseRate().then(function(baseres){
        var base = baseres.reduce(function(r,v){ r[v.name] = v.rates; return r; },{})
        return exchangeRate(jpy? jpy : base.yahoo['USD_JPY']).then(function(res){
            return baseres.concat(res)
        })
    })
}
var ticker = exports.ticker = function(jpy){
    return baseRate().then(function(baseres){
        var base = baseres.reduce(function(r,v){ r[v.name] = v.rates; return r; },{})
        return exchangeTicker(jpy? jpy : base.yahoo['USD_JPY']).then(function(res){
            return res
        })
    })
}
