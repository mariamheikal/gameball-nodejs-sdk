const GameballException=require('../../exceptions/GameballExceptions').GameballException
const configuration=require('../utils/configure')
const helpers=require('../utils/helpers')
const httpHandler=require('../utils/httpHandler')

module.exports = {

/** 
 * 
 * SendAction: redeems\rewards, and sends event all at once.
 * 
 * Transaction key is required for sending an action.
 * 
 * @param {
  *
  *playerUniqueId: string
  * } ActionRequest
 * @param {NodeCallback} callback
 */
sendAction: function(ActionRequest, callback){

  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }
  
  if(configuration.default_options.transactionKey==undefined){
    throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
  }

  if(ActionRequest.playerUniqueId==undefined){
    throw new GameballException('Player unique id is required')
  }

  if(ActionRequest.pointsTransaction.transactionId==undefined){
      return callback(new GameballException('Transaction id is required'),
      null);
    }
  ActionRequest.pointsTransaction['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  ActionRequest.pointsTransaction["hash"]=helpers.hash(ActionRequest.playerUniqueId, ActionRequest.pointsTransaction.transactionTime, ActionRequest.pointsTransaction.rewardAmount, configuration.default_options.transactionKey)

  httpHandler._createRequest({
    path: "/Action",
    method: 'POST',
    data: ActionRequest,
  }, configuration.default_options.apiKey, callback=callback)
}

}