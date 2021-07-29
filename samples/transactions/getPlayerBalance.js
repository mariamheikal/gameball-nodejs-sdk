var gameball = require('../../lib/gameball')
var Gameball = new gameball()
Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});

Gameball.getPlayerBalance({
    'playerUniqueId': 'player_unique_id'
}, function (err, res){if(err){
    console.log(err)
}
else{
    console.log(res)
}})