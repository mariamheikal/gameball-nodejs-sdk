var gameball = require('../../lib/gameball')
var Gameball = new gameball()
Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});

Gameball.rewardPoints({
    "playerUniqueId":"player_unique_id",
    "transactionId": "transaction_unique_id",
    "amount":5000

    },function (err, res){
    if(err) console.log(err)
    else console.log(res)
})

Gameball.rewardPoints({

        "playerUniqueId":"player_unique_id",
        "transactionId":"transaction_unique_id",
        "amount":2500,
        "playerAttributes":{
           "displayName":"John",
           "firstName":"John",
           "lastName":"Snow",
           "email":"jsnow@gmail.com",
           "gender":"Male",
           "dateOfBirth":"1998-08-11T00:00:00.000Z",
           "custom":{
              "location":"Cairo, Egypt",
              "graduationDate":"2022-07-04T21:06:29.158Z",
              "isMarried":false
           }
        }
     },function (err, res){
    if(err) console.log(err)
    else console.log(res)
})