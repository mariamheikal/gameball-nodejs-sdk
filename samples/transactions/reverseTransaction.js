var gameball = require('../../lib/gameball')
var Gameball = new gameball()
Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});

Gameball.reverseTransaction({
    "playerUniqueId":"player_unique_id",
    "reversedTransactionId":"reversed_transaction_unique_id",
    "transactionId": "transaction_unique_id"
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
})