var gameball = require('../../lib/gameball')
var Gameball = new gameball()
Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});

Gameball.redeemPoints({
    "playerUniqueId":"",
    "holdReference":'hold_reference_obtained_from_hold_points_transaction',
    "transactionId": "unique_transaction_id"
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
})