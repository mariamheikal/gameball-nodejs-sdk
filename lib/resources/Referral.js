const GameballException=require('../../exceptions/GameballExceptions').GameballException
const configuration=require('../utils/configure')
const httpHandler=require('../utils/httpHandler')

module.exports = {

/**
 * 
 * CreateReferral: refers a new user through player with the given player code.
 * 
 * @param {
  *  playerCode: string,
  *  playerAttributes: {}
  * } ReferralRequest
 *  @param {NodeCallback} callback
 */
createReferral: function(ReferralRequest, callback){
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }
  if(ReferralRequest.playerCode==undefined){
    return callback(new GameballException('Player referral code is required'),
    null
  );
  }
  else{
  httpHandler._createRequest({
    path: "/Referral",
    method: 'POST',
    data: ReferralRequest
  }, configuration.default_options.apiKey, callback=callback)
 }
}
}