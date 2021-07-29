const GameballException=require('../../exceptions/GameballExceptions').GameballException
const configuration=require('../utils/configure')
const helpers=require('../utils/helpers')
const httpHandler=require('../utils/httpHandler')

module.exports = {

/**
 * 
 * GetPlayerBalance: obtains the points balance of the player with the given unique id.
 * 
 * Transaction key is required for getting the player's balance infromation.
 * 
 * @param {
  *  playerUniqueId: string,
  * } PlayerBalanceRequest
 * @param {NodeCallback} callback
 */
getPlayerBalance: function(PlayerBalanceRequest, callback){
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }
  
  if(configuration.default_options.transactionKey==undefined){
    throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
  }

  if(PlayerBalanceRequest.playerUniqueId==undefined){
    throw new GameballException('Player unique id is required')
    }

  PlayerBalanceRequest['hash']=helpers.hash(playerUniqueId=PlayerBalanceRequest.playerUniqueId, transactionTime="", amount="", configuration.default_options.transactionKey)
  httpHandler._createRequest({  
    path: "/Transaction/Balance",
    method: 'POST',
    data: PlayerBalanceRequest,
  }, configuration.default_options.apiKey, callback=callback)
},


/**
 * 
 * HoldPoints: holds a specific amount of points from the player’s points balance. 
 * This is used to guarantee availability of redemption points until the checkout process 
 * is completed.
 * 
 * Transaction key is required for performing the hold points transaction.
 * 
 * @param {
  *  playerUniqueId: string,
  *  amount: string,
  * } HoldPointsRequest
 * @param {NodeCallback} callback
 */
holdPoints: function(HoldPointsRequest, callback){
  if(configuration.default_options.transactionKey==undefined){
    throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
  }

  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }

  if(HoldPointsRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null
  );
  }
  
  HoldPointsRequest['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  HoldPointsRequest['hash']=helpers.hash(HoldPointsRequest.playerUniqueId, HoldPointsRequest.transactionTime, HoldPointsRequest.amount, configuration.default_options.transactionKey)
  httpHandler._createRequest({
    path: "/Transaction/Hold",
    method: 'POST',
    data: HoldPointsRequest,
  }, configuration.default_options.apiKey, callback=callback)
},


/**
 * 
 * ReverseHold: cancels previously held points identified by the given hold reference. 
 * 
 * Transaction key is required for performing the reverse hold transaction.
 * 
 * @param {
  *  playerUniqueId: string,
  *  holdReference: string,
  * } ReverseHoldRequest
 * @param {NodeCallback} callback
 */
reverseHold: function(ReverseHoldRequest, callback){
    if(configuration.default_options.transactionKey==undefined){
        throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
    }

    if(configuration.default_options.apiKey==undefined){
      throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
    }

   if(ReverseHoldRequest.playerUniqueId==undefined){
     return callback(new GameballException('Player unique id is required'),
     null
   );
   }
  ReverseHoldRequest['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  ReverseHoldRequest['hash']=helpers.hash(ReverseHoldRequest.playerUniqueId, ReverseHoldRequest.transactionTime, ReverseHoldRequest.amount, configuration.default_options.transactionKey)
  httpHandler._createRequest({
    path: "/Transaction/Hold",
    method: 'POST',
    data: ReverseHoldRequest,
  }, configuration.default_options.apiKey, callback=callback)
},


/**
 * ReverseTransaction: cancels a purchase reward or refund a points redemption transactions 
 * in Gameball.
 * 
 * Transaction key is required for reversing a transaction.
 * 
 * @param {
  *  playerUniqueId: string,
  *  transactionId: string,
  *  reversedTransactionId: string
  * } tranactionParams
 * @param {NodeCallback} callback
 */
reverseTransaction: function(ReverseTransactionRequest, callback){
  if(configuration.default_options.transactionKey==undefined){
    throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
  }
  
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }

  if(ReverseTransactionRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null);
   }
  
  if(ReverseTransactionRequest.transactionId==undefined){
    return callback(new GameballException('Transaction id is required'),
    null);
  }

  if(ReverseTransactionRequest.reversedTransactionId==undefined){
    return callback(new GameballException('Reversed transaction id is required'),
    null);
  }
  ReverseTransactionRequest['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  ReverseTransactionRequest['hash']=helpers.hash(ReverseTransactionRequest.playerUniqueId, ReverseTransactionRequest.transactionTime, ReverseTransactionRequest.amount, configuration.default_options.transactionKey)
  httpHandler._createRequest({
    path: "/Transaction/Cancel",
    method: 'POST',
    data: ReverseTransactionRequest
  }, configuration.default_options.apiKey, callback=callback)
 },


/**
 * 
 * RewardPoints: rewards a player with points equivalent to the given amount.
 * 
 * Transaction key is required for performing reward points transaction.
 * 
 * @param {
  *  playerAttributes: {},
  *  playerUniqueId: string,
  *  amount: string,
  *  transactionOnClientSystemId: string,
  * } RewardPointsRequest
 * @param {NodeCallback} callback
 */
rewardPoints: function(RewardPointsRequest, callback){
  if(configuration.default_options.transactionKey==undefined){
        throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
    }
  
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }

  if(RewardPointsRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null);
  }

  if(RewardPointsRequest.transactionId==undefined){
    return callback(new GameballException('Transaction id is required'),
    null);
  }

  RewardPointsRequest['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  RewardPointsRequest['hash']=helpers.hash(RewardPointsRequest.playerUniqueId, RewardPointsRequest.transactionTime, RewardPointsRequest.amount, configuration.default_options.transactionKey)
  httpHandler._createRequest({
    path: "/Transaction/Reward",
    method: 'POST',
    data: RewardPointsRequest
  }, configuration.default_options.apiKey, callback=callback)
 },


/**
 * 
 * RedeemPoints: enables the player to use Gameball points as a payment 
 *               method since it can be substituted for monetary values.
 * 
 * Transaction key is required for performing redeem points transaction.
 * 
 * @param {
  *  holdReference: string,
  *  playerUniqueId: string,
  *  amount: string,
  *  transactionId: string,
  * } RedeemPointsRequest
 * @param {NodeCallback} callback
 */
redeemPoints: function(RedeemPointsRequest, callback){
  if(configuration.default_options.transactionKey==undefined){
        throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
  }
  
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }

  if(RedeemPointsRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null);
  }

  if(RedeemPointsRequest.holdReference==undefined){
    return callback(new GameballException('Hold reference field is required'),
    null);
  }

  if(RedeemPointsRequest.transactionId==undefined){
    return callback(new GameballException('Transaction id is required'),
    null);
  }

  RedeemPointsRequest['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  RedeemPointsRequest['hash']=helpers.hash(RedeemPointsRequest.playerUniqueId, RedeemPointsRequest.transactionTime, "", configuration.default_options.transactionKey)
  httpHandler._createRequest({
    path: "/Transaction/Redeem",
    method: 'POST',
    data: RedeemPointsRequest
  }, configuration.default_options.apiKey, callback=callback)
 }

}