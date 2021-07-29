const GameballException=require('../../exceptions/GameballExceptions').GameballException
const configuration=require('../utils/configure')
const helpers=require('../utils/helpers')
const httpHandler=require('../utils/httpHandler')

module.exports = {

/**
 * 
 * CreateCoupon: creates a discount code.
 * 
 * Transaction key is required for creating a coupon.
 * 
 * @param {
  *  code: string
  *  playerUniqueId: string,
  * } CreateCouponRequest
 * @param {NodeCallback} callback
 */
createCoupon: function(CreateCouponRequest, callback){
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }
  
  if(configuration.default_options.transactionKey==undefined){
        throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
    }
  
  if(CreateCouponRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null);
  }
  CreateCouponRequest['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  CreateCouponRequest['hash']=helpers.hash(CreateCouponRequest.playerUniqueId, "", "", configuration.default_options.transactionKey)
  httpHandler._createRequest({
    path: "/Coupon",
    method: 'POST',
    data: CreateCouponRequest
  }, configuration.default_options.apiKey, callback=callback)
 }, 


 /**
  * 
  * ValidateCoupon: returns discount code details if exists and attached to player.
  * 
  * Transaction key is required for validating a coupon.
  * 
  * @param {
    *  playerUniqueId: string
    * } ValidateCouponRequest
  * @param {NodeCallback} callback
*/
validateCoupon: function (ValidateCouponRequest, callback) {
  if(configuration.default_options.transactionKey==undefined){
        throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
    }

  if(ValidateCouponRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null);
  }
  if(ValidateCouponRequest.code==undefined){
    return callback(new GameballException('Coupon code is required'),
    null);
  }
  ValidateCouponRequest["hash"]=helpers.hash(ValidateCouponRequest.playerUniqueId, "", "", configuration.default_options.transactionKey)
   httpHandler._createRequest({
   method: 'POST',
   path: "/Coupon/Validate",
   data: ValidateCouponRequest
 }, configuration.default_options.apiKey, callback=callback)
},


 /**
  * 
  * RedeemCoupon: retrieves a discount code.
  * 
  * Transaction key is required for redeeming a coupon.
  * 
  * @param {
    *  promocode: number,
    *  value: number,
    *  playerUniqueId: string,
    * } RedeemCouponRequest
  * @param {NodeCallback} callback
 */
 redeemCoupon: function(RedeemCouponRequest, callback){
  if(configuration.default_options.transactionKey==undefined){
        throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
    }

  if(RedeemCouponRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null);
  }
  if(RedeemCouponRequest.code==undefined){
    return callback(new GameballException('Coupon code is required'),
    null);
  }
  RedeemCouponRequest['transactionTime']=new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
  RedeemCouponRequest['hash']=helpers.hash(RedeemCouponRequest.playerUniqueId, "", "", configuration.default_options.transactionKey)
  httpHandler._createRequest({
    path: "/Coupon/Redeem",
    method: 'POST',
    data: RedeemCouponRequest
  }, configuration.default_options.apiKey, callback=callback)
 }

 
}