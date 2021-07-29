const GameballException=require('../../exceptions/GameballExceptions').GameballException
const configuration=require('../utils/configure')
const helpers=require('../utils/helpers')
const httpHandler=require('../utils/httpHandler')

module.exports = {
    
/**
 * 
 * InitializePlayer: creates a new player with the given player attributes.
 * ask about update
 * 
 * @param {
  * playerAttributes: {
    *  displayName: string,
    *  firstName: string,
    *  lastName: string,
    *  email: string,
    *  gender: string,
    *  mobileNumber: string,
    *  dateOfBirth: string 
    * }} PlayerRequest
  * @param {NodeCallback} callback
  */
  initializePlayer: function (PlayerRequest, callback) {
    if(configuration.default_options.apiKey==undefined || configuration.default_options.apiKey==''){
       throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
     }
    PlayerRequest.playerAttributes['joinDate']=''+new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()
    httpHandler._createRequest({
     method: 'POST',
     path: "/Player",
     data: PlayerRequest
   }, configuration.default_options.apiKey, callback=callback)
  },

/**
 * 
 * GetPlayerInfo: gets Player's information such as name, level, rank and score balance. 
 * 
 * @param {
  *  playerUniqueId: string
  *  lang: string
  * } PlayerInfoRequest
  * @param {NodeCallback} callback
*/
 getPlayerInfo: function (PlayerInfoRequest, language, callback) {
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }
  
  if(configuration.default_options.transactionKey==undefined){
    throw new GameballException('Transaction key is required, check how to obtain your Transaction Key here <https://help.gameball.co/en/articles/3467114-how-can-you-get-your-account-integration-details-api-key-transaction-key>')
   }

  if(PlayerInfoRequest.playerUniqueId==undefined){
    return callback(new GameballException('Player unique id is required'),
    null);
  }

  var optionalHeaders=null
  if(typeof optionalHeaders == Object){
    if(optionalHeaders.lang!=null){
      optionalHeaders={'lang': language}
    }
  }
  PlayerInfoRequest["hash"]=helpers.hash(PlayerInfoRequest.playerUniqueId, "", "", configuration.default_options.transactionKey)
   httpHandler._createRequest({
   method: 'POST',
   path: "/player/info",
   data: PlayerInfoRequest
 }, configuration.default_options.apiKey, optionalHeaders, callback)
}

};