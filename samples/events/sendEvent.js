var gameball = require('../../lib/gameball')
var Gameball = new gameball()

Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});


 Gameball.sendEvent(
    {
    'playerUniqueId': 'player_unique_id',
    'events':{
            "place_order":{
                    "total_price":2000
             },
             "view_product_page":{},
     }
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
})

Gameball.sendEvent(
    {
       "events":{
          "place_order":{
             "total_amount":"100",
             "category":[
                "electronics",
                "cosmetics"
             ]
          },
          "review":{}
       },
       "playerUniqueId":'player_unique_id'
    },
    function (err, res){
        if(err) console.log(err)
        else console.log(res)
    })

Gameball.sendEvent(
    {
       "events":{
          "reserve":{
             "rooms":2
          }
       },
       "playerUniqueId":'player_unique_id',
       "playerAttributes":{
          "displayName":"Jon Snow",
          "email":"jon.snow@example.com",
          "dateOfBirth":"1980-09-19T00:00:00.000Z",
          "custom":{
              'isGraduated': true
          }
       }
    },
    function (err, res){
        if(err) console.log(err)
        else console.log(res)
    })


Gameball.sendEvent(
    {"events":{
            "view_product_page":{}
            },
    "playerUniqueId": 'player_unique_id',
    "isMessageTrigger": true
  
     
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
}) 