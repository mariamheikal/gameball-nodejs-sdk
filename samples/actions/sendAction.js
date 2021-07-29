var gameball = require('../../lib/gameball')
var Gameball = new gameball()
Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});

Gameball.sendAction({
    "playerUniqueId":"player_unique_id",
    "events":{
            "place_order":{
                    "total_price":2000
             }
     },
    "pointsTransaction":{
    "rewardAmount":"30",
    "transactionId":"0199888"
    }
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
})