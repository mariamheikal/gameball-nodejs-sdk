var gameball = require('../../lib/gameball')
var Gameball = new gameball('your_api_key')
Gameball.setUp({
    'transactionKey':'your_transaction_key'
});


Gameball.getPlayerInfo({
    "playerUniqueId":'palyer_unique_id'
}, Gameball.language.English,function (err, res){
    if(err) console.log(err)
    else console.log(res)
})