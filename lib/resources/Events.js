const GameballException=require('../../exceptions/GameballExceptions').GameballException
const configuration=require('../utils/configure')
const httpHandler=require('../utils/httpHandler')

module.exports = {

/** 
 * 
 * SendEvent: sends events collection introduced in the given events object.
 * 
 * @param {
  *events: {},
  *playerUniqueId: string
  * } EventRequest
 * @param {NodeCallback} callback
 */
sendEvent: function(EventRequest, callback){
  if(configuration.default_options.apiKey==undefined){
    throw new GameballException('API Key is required', configuration.DEFAULT_ERROR_CODE)
  }
  
  if(EventRequest.events==undefined){
    throw new GameballException('Events field is required')
  }
  if(EventRequest.playerUniqueId==undefined){
    throw new GameballException('Player unique id is required')
    }
  httpHandler._createRequest({
    path: "/Event",
    method: 'POST',
    data: EventRequest,
  }, configuration.default_options.apiKey, callback=callback)
}

}