var gameball = require('../../lib/gameball')
var Gameball = new gameball()
Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});

Gameball.initializePlayer({
     'playerUniqueId': 'player_unique_id',
     "playerAttributes":{
       "displayName":"Jon Snow",
       "email":"jon.snow@example.com",
       "dateOfBirth":"1980-09-19T00:00:00.000Z",
       "joinDate":"2019-09-19T21:06:29.158Z",
       "custom":{
           'isGraduated': true
       }
          }
     }, function (err, res){if(err){
            console.log(err)
    }})


