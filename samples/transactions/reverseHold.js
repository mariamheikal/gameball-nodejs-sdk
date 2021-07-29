var gameball = require('../../lib/gameball')
var Gameball = new gameball()
Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});

Gameball.reverseHold({
    "playerUniqueId": "player_unique_id",
    "holdReference":"hold_reference_obtained_from_hold_points_transaction"
}, function (err, res){
    if(err) console.log(err)
    else console.log(res)
})