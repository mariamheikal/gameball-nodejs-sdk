
# **Gameball NodeJS SDK**
---
This repository contains the open source SDK for integrating Gameball's API into your NodeJs app. The Gameball NodeJS SDK provides convenient access to the Gameball API from applications written in the JavaScript langauage. 
## Documentation
---
Please refer to the  [Gameball API docs](https://docs.gameball.co).
## Installation
---
You don't need this source code unless you want to modify the SDK. If you just
want to use the SDK, just run:
```js
npm install gameball
```
### Dependencies 
Download sha1 package using the following command.
```js
npm install sha1
```
## Usage
---
The SDK needs to be configured with your account's API & Transaction keys available in your [Gameball Dashboard](https://help.gameball.co/en/articles/3467114-get-your-account-integration-details-api-key-and-transaction-key)

Require 'gameball-nodejs-sdk' in your file
```js
var gameball = require('gameball')
```
Create a handler using the api key and transaction key (optional field), then call commands on it.
```js
var Gameball = new gameball()

Gameball.setUp({
    'apiKey':'your_api_key',
    'transactionKey':'your_transaction_key'
});
```
You can also directly pass the apiKey and transactionKey through the Gameball constructor.
```js
var Gameball = new gameball(apiKey, transactionKey)
```
### Commands:
```js
Gameball.initializePlayer(PlayerRequest, callback) //creates a new player with the given player attributes.

Gameball.sendEvent(EventRequest, callback) //performs action based on event triggered by users.

Gameball.createReferral(ReferralRequest, callback) //refers a new user through player with the given player code.

Gameball.getPlayerBalance(PlayerBalanceRequest, callback) //obtains player's balance value.

Gameball.holdPoints(HoldPointsRequest, callback) //holds a specific amount of points from the player’s points balance. 

Gameball.reverseHold(ReverseHoldRequest, callback) //cancels previously held points identified by the given hold reference. 

Gameball.reverseTransaction(ReverseTransaction, callback) //cancels a purchase reward or refund a points redemption transactions in Gameball.

Gameball.redeemPoints(RedeemPointsRequest, callback) //enables the player to use Gameball points as a payment method since it can be substituted for monetary values.

Gameball.rewardPoints(RewardPointsRequest, callback) //rewards a player with points equivalent to the given amount.
```
### Examples
#### Creating a Player 
```js
Gameball.initializePlayer({
   "playerUniqueId": "player123",
   "playerAttributes":{
      "displayName":" Jon Snow",
      "email":"jon.snow@example.com",
      "dateOfBirth":"1980-09-19T00:00:00.000Z",
      "custom": {
        "isGraduated": false,
        "location": "Egypt, Cairo"
             }
}, 
        function (err, res){
         if(err) console.log(err)
         else console.log(res)
})
```
#### Getting a Player's Information
```js
Gameball.getPlayerInfo({
        "playerUniqueId":"1597247015986"
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})

Gameball.getPlayerInfo({
        "playerUniqueId":"1597247015986"
},      Gameball.language.German,
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Sending an Event 
```js
Gameball.sendEvent({
        "events":{
                "reserve":{
                        "rooms":2
                  }
        },
        "playerUniqueId":"player123",
        "playerAttributes":{
                "displayName":"Jon Snow",
                "email":"jon.snow@example.com",
                "dateOfBirth":"1980-09-19T00:00:00.000Z",
                "joinDate":"2019-09-19T21:06:29.158Z"
        }
}, 
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})

Gameball.sendEvent({
        "events":{
                "place_order":  {
                      "total_amount":"100",
                      "category":[
                         "electronics",
                         "cosmetics"
                                 ]
                },
                "review":{}
        },
        "playerUniqueId":"1596487841748"
}, 
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Sending an Action 
```js
//Action being Sent: an Event.
Gameball.sendAction({
    "playerUniqueId": "your_player_unique_id",
    "events": {
        "review": {},
        "reserve": {
            "rooms": 2
        }
    }
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})

//Action being Sent: an Event and a Reward Transaction.
Gameball.sendAction({
    "playerUniqueId": "your_player_unique_id",
    "events": {
        "review": {},
        "reserve": {
            "rooms": 2
        }
    },
    "pointsTransaction": {
        "rewardAmount": 2
    }
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})

//Action being Sent: an Event and a Redeem Transaction.
Gameball.sendAction({
    "playerUniqueId": "your_player_unique_id",
    "events": {
        "review": {},
        "reserve": {
            "rooms": 2
        }
    },
    "pointsTransaction": {
        "rewardAmount": 2,
        "holdReference": "2342452352435234"
    }
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Create a Referral 
```js
Gameball.createReferral({
        "playerCode":"CODE11",
        "playerUniqueId":"player456"
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})

Gameball.createReferral({
        "playerCode":"CODE11",
        "playerAttributes":{
                "displayName":"Tyrion Lannister",
                "firstName":"Tyrion",
                "lastName":"Lannister",
                "email":"tyrion@example.com",
                "gender":"M",
                "dateOfBirth":"1978-01-11T00:00:00.000Z",
                "joinDate":"2019-09-19T21:06:29.158Z",
                "custom":{
                        "location":"Miami",
                        "graduationDate":"2018-07-04T21:06:29.158Z",
                        "isMarried":false
                }
        }
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Reward Transaction
```js
Gameball.rewardPoints({
        "playerUniqueId":"player123",
        "transactionId":"transaction456",
        "amount":99.98
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})

Gameball.rewardPoints({
        "playerUniqueId":"player456",
        "transactionId":"transaction123".
        "amount":2500,
        "playerAttributes":{
                "displayName":" Tyrion Lannister",
                "firstName":"Tyrion",
                "lastName":"Lannister",
                "email":"tyrion@example.com",
                "gender":"M",
                "dateOfBirth":"1978-01-11T00:00:00.000Z",
                "joinDate":"2019-09-19T21:06:29.158Z",
                "custom":{
                        "location":"Miami",
                        "graduationDate":"2018-07-04T21:06:29.158Z",
                        "isMarried":false
                }
        }
})}, 
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Getting a Player's Balance
```js
Gameball.getPlayerBalance({
        "playerUniqueId":"player456"
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Hold Points Transaction
```js
Gameball.holdPoints({
        "playerUniqueId":"player456",
        "amount":98.89
},
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Redeem Transaction
```js
Gameball.redeemPoints({
        "playerUniqueId":"player456",
        "holdReference":"2342452352435234",
        "transactionId":"transaction123"
}, 
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Reverse Transaction 
```js
Gameball.reverseTransaction({
        "playerUniqueId":"player456",
        "transactionId":"1234567890",
        "reversedTransactionId":"234567891"
}, 
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Reverse Hold 
```js
Gameball.reverseHold({
        "playerUniqueId":"player456",
        "holdReference":"9245fe4a-d402-451c-b9ed-9c1a04247482"
}, 
        function (err, res){
                if(err) console.log(err)
                else console.log(res)
})
```
#### Creating a Coupon
```js
Gameball.createCoupon({
    "playerUniqueId":"1597100928071",
    "code": "1",
    "value":1000.0
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
})
```
#### Validating a Coupon
```js
Gameball.validateCoupon({
    "playerUniqueId":"1597100928071",
    "code":"1"
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
})
```
#### Redeeming a Coupon
```js
Gameball.redeemCoupon({
    "playerUniqueId":"1597100928071",
    "code":1
},function (err, res){
    if(err) console.log(err)
    else console.log(res)
})
```
### Handling exceptions
Unsuccessful requests raise exceptions. The raised exception will reflect the sort of error that occurred with appropriate message and error code . Please refer to the  [Gameball API docs](https://docs.gameball.co).
## Contribution
---
The master branch of this repository contains the latest stable release of the SDK.
## Contact
---
For usage questions\suggestions drop us an email at support[ at ]gameball.co. Please report any bugs as issues.